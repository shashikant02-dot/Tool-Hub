"use client";

import Boost from "./components/Boost";
import CTASection from "./components/CtaSection";
import FeaturesSection from "./components/FeatuesSections";
import TrustSection from "./components/TrustSection";

export default function Home() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-center px-4 text-center mt-19 overflow-hidden">
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50 via-pink-50 to-white" />

        {/* Optional Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-200/30 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-pink-200/30 blur-[100px] rounded-full -z-10" />
        <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-indigo-200/20 blur-[100px] rounded-full -z-10" />

        {/* Top Pill Badge */}
        <div className="mt-15 mb-7 inline-flex items-center rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm p-1 pl-4 text-sm font-medium shadow-sm">
          <span className="text-gray-800 pr-3 border-r border-gray-200">
            Introducing ToolHub
          </span>

          <a
            href="#"
            className="text-gray-500 hover:text-black px-3 flex items-center gap-1 transition-colors duration-200"
          >
            Explore tools <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-[72px] font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6 max-w-4xl">
          ToolHub provides
          <br className="hidden md:block" />
          tools that{" "}
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            just work
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl text-gray-500 font-normal leading-relaxed max-w-3xl mb-12">
          All the free tools you need for your daily tasks in one place -
          simple,
          <br className="hidden md:block" />
          fast, secure, and easy to use.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <a
            href="#"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-1 text-base text-center shadow-lg shadow-indigo-200"
          >
            Explore PDF Tools
          </a>

          <a
            href="#"
            className="inline-block bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-semibold px-8 py-3.5 rounded-xl border border-gray-300 transition-all duration-200 hover:-translate-y-1 text-base text-center shadow-sm"
          >
            Explore Image Tools
          </a>
        </div>

        {/* Sections */}
        <Boost />
        <TrustSection />
      </main>

      <FeaturesSection />
      <CTASection />
    </>
  );
}
