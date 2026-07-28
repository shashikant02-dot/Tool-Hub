import CsvToJsonCon from '@/app/components/CsvToJsonCon'
import React from 'react'
export const metadata = {
 title: "CSV to JSON Converter",
  description:
    "Convert CSV files into structured JSON format instantly. Fast, secure and free online tool for developers.",
  alternates: {
    canonical: "https://yourdomain.com/tools/csv-to-json",
  },
};
export default function page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">

      {/* ================= BACKGROUND (same as Image-to-Code) ================= */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      <section className="relative z-10 mt-20">
        <div className="flex flex-col items-center text-center mt-20 px-4">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">
          
            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              Convert instantly
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            CSV to{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              JSON
            </span>
          </h1>

          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-400 md:text-xl lg:text-2xl">
            Convert <b className="text-gray-200">CSV files</b> to{" "}
            <b className="text-gray-200">JSON format</b> instantly. Upload a
            CSV file or paste your CSV data directly to generate clean,
            structured JSON in seconds.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Auto header detection</span>
            <span>✓ Dynamic typing</span>
            <span>✓ 100% client-side</span>
          </div>

        </div>
      </section>

      <CsvToJsonCon/>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

    </main>
  )
}