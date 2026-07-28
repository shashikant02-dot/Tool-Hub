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
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-center">

      {/* ================= BACKGROUND (same as Image-to-Code) ================= */}

      {/* Main Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />

      {/* Blue Glow */}
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />

      {/* Pink Glow */}
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      {/* ================= HERO ================= */}

      <section className="relative z-10 mt-28 px-6 pb-16">
        <div className="mx-auto max-w-5xl">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">
            <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200">
              🖼️ Free Image Tool
            </span>
            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              Compress instantly
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Image{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Compressor
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto my-12 max-w-4xl text-center text-xl leading-8 text-gray-400 md:text-2xl">
            Reduce image file size by up to{" "}
            <b className="text-gray-200">90%</b> while keeping{" "}
            <b className="text-gray-200">great visual quality.</b>{" "}
            <b className="text-gray-200">Private & instant.</b>
          </p>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Up to 90% size reduction</span>
            <span>✓ No quality loss</span>
            <span>✓ 100% private & instant</span>
          </div>

        </div>
      </section>

      {/* ================= TOOL ================= */}

      <section className="relative z-10 px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <CompressImageUI />
        </div>
      </section>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

    </main>
  );
}