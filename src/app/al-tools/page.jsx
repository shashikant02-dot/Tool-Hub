import React from "react";
import ToolsGrid from "../components/Converter";
import SearchFilter from "../components/Searchfilter";

export default function AIToolpage() {
  return (
    <div className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-100 blur-[140px] opacity-70" />
      <div className="absolute right-0 top-40 h-[350px] w-[350px] rounded-full bg-purple-100 blur-[120px] opacity-60" />
      <div className="absolute left-0 top-80 h-[300px] w-[300px] rounded-full bg-pink-100 blur-[120px] opacity-50" />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
            ✨ AI Powered Tools
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            AI
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}Tools
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-xl leading-8 text-slate-500">
            Smart tools powered by artificial intelligence.
            Convert, extract, analyze and create content in seconds.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-10">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                10+
              </h3>
              <p className="text-slate-500">
                AI Tools
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                100K+
              </h3>
              <p className="text-slate-500">
                Files Processed
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                99.9%
              </h3>
              <p className="text-slate-500">
                Accuracy
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Search Filter */}
      <div className="relative z-10">
        <SearchFilter />
      </div>

      {/* Tools Grid */}
      <div className="relative z-10">
        <ToolsGrid />
      </div>

    </div>
  );
}