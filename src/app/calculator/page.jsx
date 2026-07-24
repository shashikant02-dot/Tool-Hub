import React from "react";
import CalculatorEmi from "../components/CalculatorEmi";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">

      {/* ================= BACKGROUND DESIGN ================= */}

      {/* Main dark radial background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_0%,#24103d_0%,#090713_38%,#030303_78%)]" />

      {/* Purple glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-120px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />

      {/* Blue glow */}
      <div className="pointer-events-none absolute right-[-180px] top-[35%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />

      {/* Pink glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      {/* ================= HERO SECTION ================= */}

      <section className="relative z-10 px-6 pt-32 pb-16 text-center">

        <div className="mx-auto max-w-5xl">

          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-sm font-medium text-gray-300 shadow-lg backdrop-blur-md">
            💰 Finance Calculator
          </span>

          {/* Heading */}
          <h1 className="mt-7 text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">

            EMI{" "}

            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Calculator
            </span>

          </h1>

          {/* Subtitle */}
          <h2 className="mt-6 text-2xl font-semibold text-gray-200 sm:text-3xl">
            Calculate Your Loan EMI in Seconds
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Free online EMI calculator for Home Loans, Car Loans,
            Personal Loans and Business Loans.
            Get instant and accurate monthly EMI calculations.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-14">

            <div className="min-w-[100px]">
              <h3 className="text-3xl font-bold text-white">
                100%
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Accurate
              </p>
            </div>

            <div className="min-w-[100px]">
              <h3 className="text-3xl font-bold text-white">
                Instant
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Results
              </p>
            </div>

            <div className="min-w-[100px]">
              <h3 className="text-3xl font-bold text-white">
                Free
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Forever
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Calculator */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <CalculatorEmi />
        </div>
      </section>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

    </main>
  );
}