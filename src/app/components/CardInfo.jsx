import React from "react";

const CardInfo = ({ heading, subheading, steps }) => {
  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-24 px-6 sm:px-12 lg:px-24 overflow-hidden">

      {/* background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 bg-indigo-200 blur-3xl opacity-30 rounded-full" />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">

        <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 mb-5 shadow-sm">
          Process Guide
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          {heading}
        </h2>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto leading-8">
          {subheading}
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">

        {safeSteps.map((step, index) => (
          <div
            key={index}
            className="
              group relative
              rounded-2xl
              bg-white/80 backdrop-blur-xl
              border border-slate-200
              p-7
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              hover:border-indigo-200
            "
          >
            {/* hover gradient glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100 via-transparent to-purple-100 opacity-0 group-hover:opacity-100 transition" />

            {/* Number */}
            <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg">
              {index + 1}
            </div>

            {/* Step Label */}
            <span className="relative z-10 block text-xs font-semibold tracking-[0.16em] uppercase text-indigo-600 mb-3">
              {step.stepNumber}
            </span>

            {/* Title */}
            <h3 className="relative z-10 text-lg font-semibold text-slate-900 mb-3 group-hover:text-indigo-600 transition">
              {step.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 text-md leading-7 text-slate-600">
              {step.description}
            </p>

            {/* Bottom line */}
            <div className="relative z-10 mt-6 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}

      </div>
    </section>
  );
};

export default CardInfo;