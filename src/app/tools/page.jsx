import React from "react";
import SearchFilter from "../components/Searchfilter";
import Converter from "../components/Converter";


export const metadata = {
  title: "Split PDF",

  description:
    "Convert PDF to Word online for free. Fast, secure, and works on all devices.",

  keywords: [
    "PDF to Word",
    "Convert PDF",
    "Free PDF Converter",
  ],

  alternates: {
    canonical:
      "https://yourdomain.com/tools/pdf-to-word",
  },
};


export default function Toolpage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-100 blur-[140px] opacity-70" />
      <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-purple-100 blur-[120px] opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center">
          
          {/* <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
            🚀 100+ Free Online Tools
          </span> */}

          <h1 className="mt-6 text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Tool
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Kit
            </span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Essential digital utilities for PDFs, Images,
            Developers and Productivity.
            Fast, secure and completely free.
          </p>

          {/* Quick Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                100+
              </h3>
              <p className="text-slate-500">
                Tools
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                1M+
              </h3>
              <p className="text-slate-500">
                Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                100%
              </h3>
              <p className="text-slate-500">
                Free
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-16">
          <SearchFilter />
        </div>

        {/* Tools Grid */}
        <div className="mt-16">
          <Converter />
        </div>

      </div>
    </section>
  );
}