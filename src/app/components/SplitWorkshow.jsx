import React from "react";

export default function SplitHowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Add your PDF files",
      description:
        "Drag a single PDF onto the upload area or click to browse and choose it. The tool reads the page count and shows thumbnails so you know exactly what you are working with.",
    },
    {
      number: "2",
      title: "Pick a split method",
      description:
        "Choose how to divide the file: by custom page ranges, every N pages, into individual single-page files, or by selecting a custom set of pages to extract into one document.",
    },
    {
      number: "3",
      title: "Set your ranges or selection",
      description:
        "Enter the page ranges or the value of N, or click pages in the grid to build your selection. The tool shows how many output files you will get and which pages land in each one.",
    },
    {
      number: "4",
      title: "Preview the results",
      description:
        "Review a preview of every output file before you commit. Adjust the ranges or selection if anything is not landing where you expected.",
    },
    {
      number: "5",
      title: "Download your files",
      description:
        "Save any output on its own, or download every resulting file at once in a single ZIP archive. Then start over whenever you need to split another document.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text backdrop-blur-xl">
          Easy Process
        </span>

        <h2 className="mt-5 text-5xl font-extrabold text-white">
          How It Works
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
          Split your PDF into multiple files in just a few clicks while keeping
          every page exactly where you want it.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
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
              transition-all
              duration-500
              hover:-translate-y-3
              hover:border-indigo-500/40
              hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]
            "
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

            {/* Number */}
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xl font-bold text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
              {step.number}
            </div>

            {/* Title */}
            <h3 className="relative z-10 mb-4 text-2xl font-bold text-white transition group-hover:text-indigo-300">
              {step.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 leading-8 text-[17px] text-gray-400">
              {step.description}
            </p>

            {/* Bottom Line */}
            <div className="relative z-10 mt-6 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

            {/* Corner Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
          </div>
        ))}
      </div>
    </section>
  );
}