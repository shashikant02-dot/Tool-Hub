import sharp from "sharp";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const format = formData.get("format");

    if (!file) {
      return new Response("No file", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let converted;

    if (format === "png") {
      converted = await sharp(buffer).png().toBuffer();
    } else if (format === "jpg") {
      converted = await sharp(buffer)
        .jpeg({ quality: 90 })
        .toBuffer();
    } else if (format === "webp") {
      converted = await sharp(buffer)
        .webp({ quality: 90 })
        .toBuffer();
    } else {
      return new Response("Invalid format", {
        status: 400,
      });
    }

    return new Response(converted, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Conversion failed", {
      status: 500,
    });
  }
}