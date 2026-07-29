import LabelPrintingUI from "@/app/components/LabelPrintingUI";
import React from "react";

export const metadata = {
  title: "Label Printing - Bulk Barcode Labels | Toolghar",
  description:
    "Create and print bulk product labels with barcode, name, price, and description. Free, fast, and runs entirely in your browser.",
  keywords: [
    "label printing",
    "barcode label maker",
    "bulk label printing",
    "product label generator",
    "code128 barcode",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/label-printing",
  },
};

export default function page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-center">

      {/* ================= BACKGROUND (same as Image-to-Code) ================= */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 mt-28 px-6 pb-16">
        <div className="mx-auto max-w-5xl">

          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">
            <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200">
              🏷️ Free Label Tool
            </span>
            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              Bulk print instantly
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Label{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Printing
            </span>
          </h1>

          <p className="mx-auto my-12 max-w-4xl text-center text-xl leading-8 text-gray-400 md:text-2xl">
            Create <b className="text-gray-200">barcode labels</b> with{" "}
            <b className="text-gray-200">name, price, and description</b>, arrange
            them on a printable sheet, and{" "}
            <b className="text-gray-200">print in bulk</b> — all in your browser.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ CODE128 barcode</span>
            <span>✓ Bulk sheet layout</span>
            <span>✓ Runs in your browser</span>
          </div>

        </div>
      </section>

      {/* ================= TOOL ================= */}
      <section className="relative z-10 px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <LabelPrintingUI />
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />
    </main>
  );
}