import CompressImageUI from "@/app/components/compressImageUI";
import React from "react";
export const metadata = {
  title: "Image Compressor",
  description:
    "Compress images online and reduce file size up to 90% without losing quality. Fast, secure and free image compression tool.",
  keywords: [
    "image compressor",
    "compress image",
    "reduce image size",
    "jpg compressor",
    "png compressor",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/image-compressor",
  },
  openGraph: {
    title: "Image Compressor ",
    description:
      "Reduce image size instantly without losing quality. 100% free tool.",
    url: "https://yourdomain.com/tools/image-compressor",
    type: "website",
  },
};
export default function page() {
  return (
    <section className="mt-14 bg-[#fcfeff]">
      <div className="flex flex-col text-center mt-22">
        <h1 className="text-6xl font-bold">
          Image <span className="text-[#f6339a]">Compressor</span>{" "}
        </h1>

        <p className="text-2xl text-gray-600 max-w-4xl mx-auto text-center leading-relaxed mt-6">
          Reduce image file size by up to 90% while keeping great visual
          quality. Private & instant.
        </p>
      </div>
      <CompressImageUI />
    </section>
  );
}
