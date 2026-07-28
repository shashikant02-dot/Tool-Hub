import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const cache = new Map();
const MAX_CACHE = 100;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_RETRIES = 3;

// ✅ Single retry helper for both:
// - 429 (rate limit) — Google tells us exactly how long to wait via RetryInfo
// - 503 (model overloaded) — no RetryInfo, so we use exponential backoff
async function generateWithRetry(parts) {
  let lastErr;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await model.generateContent(parts);
    } catch (err) {
      lastErr = err;

      const isRateLimited = err.status === 429;
      const isOverloaded = err.status === 503;

      if (!isRateLimited && !isOverloaded) {
        // Not a transient error — don't waste time retrying (e.g. bad request, auth error)
        throw err;
      }

      if (attempt === MAX_RETRIES) break;

      let waitMs;

      if (isRateLimited) {
        const retryInfo = err.errorDetails?.find(
          (e) => e["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
        );
        const sec = retryInfo ? parseInt(retryInfo.retryDelay) : NaN;
        waitMs = !isNaN(sec) ? (sec + 1) * 1000 : 2000 * (attempt + 1);
      } else {
        // 503: Google gives no retry hint, so back off ourselves — 1s, 2s, 4s
        waitMs = 1000 * Math.pow(2, attempt);
      }

      console.warn(
        `Gemini ${err.status} — retrying in ${waitMs}ms (attempt ${attempt + 1}/${MAX_RETRIES})`
      );

      await sleep(waitMs);
    }
  }

  throw lastErr;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const image = formData.get("file");
    const format = formData.get("format") || "React + Tailwind";

    if (!image) {
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const cacheKey = `${image.name}-${image.size}-${format}`;

    if (cache.has(cacheKey)) {
      return Response.json({
        code: cache.get(cacheKey),
        cached: true,
      });
    }

    const prompt = `
Convert this screenshot into clean, production-ready ${format} code.

Rules:

- Pixel perfect
- Responsive
- No markdown
- No explanation
- Return ONLY raw source code.
`;

    let result;

    try {
      result = await generateWithRetry([
        prompt,
        {
          inlineData: {
            mimeType: image.type,
            data: base64,
          },
        },
      ]);
    } catch (err) {
      console.error("Gemini Error:", err);

      if (err.status === 429) {
        return Response.json(
          {
            error: "We're getting a lot of requests right now. Please try again in a minute.",
          },
          { status: 429 }
        );
      }

      if (err.status === 503) {
        return Response.json(
          {
            error: "The AI model is temporarily overloaded. Please try again in a few seconds.",
          },
          { status: 503 }
        );
      }

      return Response.json(
        {
          error: "Something went wrong while generating your code. Please try again.",
        },
        { status: 500 }
      );
    }

    const text = result.response.text();

    if (cache.size >= MAX_CACHE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(cacheKey, text);

    return Response.json({
      code: text,
      cached: false,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}