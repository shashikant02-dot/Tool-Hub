import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(bytes).toString("base64"),
          mimeType: file.type || "image/png",
        },
      },
      `
Extract every table from this image.

Return ONLY JSON.

Example:

[
  {
    "Name":"John",
    "Age":"21",
    "City":"Delhi"
  }
]

No markdown.
No explanation.
No code block.
`,
    ]);

    let text = result.response.text().trim();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const match = text.match(/\[[\s\S]*\]/);

    if (!match) {
      return Response.json(
        {
          error: "Gemini did not return JSON",
          raw: text,
        },
        { status: 500 }
      );
    }

    return Response.json({
      table: JSON.parse(match[0]),
    });
  } catch (e) {
    console.error(e);

    return Response.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}