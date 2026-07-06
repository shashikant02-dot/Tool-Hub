import sharp from "sharp";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const quality = Number(formData.get("quality")) || 60;

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    const compressedBuffer = await sharp(inputBuffer)
      .jpeg({ quality })
      .toBuffer();

    const originalSize = inputBuffer.length;
    const compressedSize = compressedBuffer.length;

    const reducedPercent = Math.max(
      0,
      Math.round(
        ((originalSize - compressedSize) / originalSize) * 100
      )
    );

    const downloadUrl = `data:image/jpeg;base64,${compressedBuffer.toString(
      "base64"
    )}`;

    return Response.json({
      downloadUrl,
      originalSize,
      compressedSize,
      reducedPercent,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}