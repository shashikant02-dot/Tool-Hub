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
        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
          Easy Process
        </span>

        <h2 className="mt-5 text-5xl font-extrabold text-slate-900">
          How It Works
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
          Split your PDF into multiple files in just a few clicks while keeping
          every page exactly where you want it.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl"
          >
            {/* Number */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              {step.number}
            </div>

            {/* Title */}
            <h3 className="mb-4 text-2xl font-bold text-slate-900">
              {step.title}
            </h3>

            {/* Description */}
            <p className="leading-8 text-[17px] text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}