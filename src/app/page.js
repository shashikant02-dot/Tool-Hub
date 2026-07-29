"use client";

import { motion } from "motion/react";

import Boost from "./components/Boost";
import CTASection from "./components/CtaSection";
import FeaturesSection from "./components/FeatuesSections";
import TrustSection from "./components/TrustSection";
import Link from "next/link";
import SearchTools from "./components/SearchTools";
export default function Home() {
  return (
    <>
      <main className="relative overflow-hidden bg-[#030303] px-4 pt-20 sm:pt-24 text-center">

        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,#24103d_0%,#090713_35%,#030303_75%)]" />

        {/* Purple Glow */}
        <div className="pointer-events-none absolute left-1/2 top-[20%] -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[150px]" />

        {/* Blue Glow */}
        <div className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[150px]" />


        {/* Top Badge */}
        <div className="mb-6 sm:mb-8 inline-flex flex-wrap items-center justify-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">

          <span className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-200">
            ✨ Introducing ToolHub
          </span>
<a
          
            href="#features"
            className="flex items-center gap-1 border-l border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-400 transition hover:text-white"
          >
            Explore tools
            <span>→</span>
          </a>

        </div>


        {/* HERO SECTION */}
        <section className="relative mx-auto flex min-h-[420px] sm:min-h-[560px] md:min-h-[680px] max-w-7xl items-center justify-center">


          {/* LEFT SIDE TOOLS */}

<FloatingTool
  className="left-[6%] top-[76%]"
  icon="💻"
  title="Image to Code"
  color="green"
  delay={2}
  href="/tools/image-to-code"
/>
<FloatingTool
  className="left-[0%] top-[42%]"
  icon="🖼️"
  title="Compress Image"
  color="blue"
  delay={1}
  href="/tools/image-compresor"
/>



         <FloatingTool
  className="left-[3%] top-[8%]"
  icon="📄"
  title="Merge PDF"
  color="red"
  delay={0}
  href="/tools/merge-pdf"
/>

<FloatingTool
  className="right-[3%] top-[8%]"
  icon="🔄"
  title="Convert Image"
  color="cyan"
  delay={0.5}
  href="/tools/image-converter"
/>

<FloatingTool
  className="right-[0%] top-[42%]"
  icon="📊"
  title="Excel to JSON"
  color="purple"
  delay={1.5}
  href="/tools/excel-json"
/>

<FloatingTool
  className="right-[6%] top-[76%]"
  icon="🧾"
  title="Invoice Generator"
  color="pink"
  delay={2.5}
  href="/tools/invoice-generator"
/>


          {/* CENTER CONTENT */}
          <div className="relative z-10 mx-auto max-w-4xl">

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-[1.1] sm:leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[82px]">

              Powerful tools.

              <br />

              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Simple results.
              </span>

            </h1>


            {/* Description */}
            <p className="mx-auto mt-5 sm:mt-7 max-w-2xl text-sm sm:text-base leading-6 sm:leading-8 text-gray-400 md:text-xl">

              All the free tools you need for your daily tasks in one powerful
              place — simple, fast, secure, and easy to use.

            </p>


            {/* Search Bar */}
            <SearchTools/>


            {/* CTA Links */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-5 text-sm sm:flex-row sm:gap-10">

              <a
                href="#features"
                className="group flex items-center gap-2 text-gray-300 transition hover:text-white"
              >
                Explore All Tools

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>

              </a>


              <a
                href="#features"
                className="group flex items-center gap-2 text-gray-300 transition hover:text-white"
              >
                View All Categories

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>

              </a>

            </div>


            {/* Trust Text */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">

              <span>✓ Free to use</span>

              <span>✓ No signup required</span>

              <span>✓ Fast & secure</span>

            </div>

          </div>

        </section>


        {/* EXISTING COMPONENTS */}
        <Boost />

        <TrustSection />

      </main>


      {/* FEATURES */}
      <div id="features">
        <FeaturesSection />
      </div>


      {/* CTA */}
      <CTASection />

    </>
  );
}


/* ================================================= */
/* FLOATING TOOL COMPONENT */
/* ================================================= */

function FloatingTool({
  icon,
  title,
  className,
  color,
  delay = 0,
  href,
}) {
  const colorStyles = {
    red: "border-red-500/70 shadow-red-500/30",
    blue: "border-blue-500/70 shadow-blue-500/30",
    green: "border-emerald-400/70 shadow-emerald-400/30",
    cyan: "border-cyan-400/70 shadow-cyan-400/30",
    purple: "border-purple-500/70 shadow-purple-500/30",
    pink: "border-pink-500/70 shadow-pink-500/30",
  };

  return (
    <Link
      href={href}
      className={`absolute hidden md:flex w-36 flex-col items-center gap-3 cursor-pointer ${className}`}
    >
      <motion.div
        animate={{
          y: [8, -8, 8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        <motion.div
          animate={{
            scale: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
          whileHover={{
            scale: 1.15,
            rotate: 5,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className={`
            flex h-24 w-24 items-center justify-center
            rounded-full
            border-2
            bg-black/60
            text-4xl
            shadow-2xl
            backdrop-blur-md
            transition-all duration-300
            hover:bg-black/80
            ${colorStyles[color]}
          `}
        >
          {icon}
        </motion.div>

        <span className="max-w-[140px] text-center text-sm font-semibold text-gray-300">
          {title}
        </span>
      </motion.div>
    </Link>
  );
}