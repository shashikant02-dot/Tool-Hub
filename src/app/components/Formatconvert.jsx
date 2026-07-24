import React from "react";

const formats = [
  { name: "PNG", label: "PNG to Code" },
  { name: "JPG", label: "JPG to Code" },
  { name: "JPEG", label: "JPEG to Code" },
  { name: "WEBP", label: "WEBP to Code" },
  { name: "SVG", label: "SVG to Code" },
  { name: "Screenshot", label: "Screenshot to Code" },
];

export default function Formatconvert() {
  return (
    <section className="relative overflow-hidden py-28 px-6 sm:px-8 lg:px-10">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,rgba(99,102,241,.18),transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-20 max-w-5xl text-center">

          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 backdrop-blur-xl">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-sm font-semibold text-transparent">
              SUPPORTED FORMATS
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Convert Any{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Image Format
            </span>{" "}
            to Code
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-400">
            Upload PNG, JPG, JPEG, WEBP, SVG or any UI screenshot and instantly
            convert it into production-ready HTML, React, Tailwind CSS, Vue or
            Next.js code with AI.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-6">

          {formats.map((format, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                p-8
                text-center
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-indigo-500/40
                hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Number */}
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-lg font-bold text-white shadow-xl">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Format */}
              <h3 className="relative z-10 mt-7 text-2xl font-extrabold tracking-tight text-white transition group-hover:text-indigo-300">
                {format.name}
              </h3>

              {/* Label */}
              <p className="relative z-10 mt-3 text-gray-400">
                {format.label}
              </p>

              {/* Bottom Line */}
              <div className="relative z-10 mt-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

              {/* Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}