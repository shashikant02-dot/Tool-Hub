import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const cache = new Map();
const MAX_CACHE = 100;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req) {
  try {
    const formData = await req.formData();

    const image = formData.get("file");
    const format = formData.get("format") || "React + Tailwind";

    if (!image) {
      return Response.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
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
      result = await model.generateContent([
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

      // Retry once if Google suggests retrying
      if (err.status === 429) {
        const retry =
          err.errorDetails?.find(
            (e) =>
              e["@type"] ===
              "type.googleapis.com/google.rpc.RetryInfo"
          ) || null;

        if (retry) {
          const sec = parseInt(retry.retryDelay);

          if (!isNaN(sec)) {
            await sleep((sec + 1) * 1000);

            try {
              result = await model.generateContent([
                prompt,
                {
                  inlineData: {
                    mimeType: image.type,
                    data: base64,
                  },
                },
              ]);
            } catch {
              return Response.json(
                {
                  error:
                    "Gemini free quota exhausted. Please try later or enable billing.",
                },
                { status: 429 }
              );
            }
          }
        } else {
          return Response.json(
            {
              error:
                "Gemini free quota exhausted. Please try later.",
            },
            { status: 429 }
          );
        }
      } else {
        return Response.json(
          {
            error: err.message || "Gemini request failed.",
          },
          { status: 500 }
        );
      }
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