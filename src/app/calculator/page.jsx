import React from "react";
import CalculatorEmi from "../components/CalculatorEmi";

export default function Page() {
  return (
    <div className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-100 blur-[140px] opacity-70" />
      <div className="absolute right-0 top-40 h-[350px] w-[350px] rounded-full bg-purple-100 blur-[120px] opacity-60" />
      <div className="absolute left-0 top-80 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[120px] opacity-50" />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
            💰 Finance Calculator
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            EMI
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}Calculator
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="mt-5 text-2xl md:text-3xl font-semibold text-slate-700">
            Calculate Your Loan EMI in Seconds
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-4xl mx-auto text-lg md:text-xl leading-8 text-slate-500">
            Free online EMI calculator for Home Loans, Car Loans,
            Personal Loans and Business Loans.
            Get instant and accurate monthly EMI calculations.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-10">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                100%
              </h3>
              <p className="text-slate-500">
                Accurate
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                Instant
              </h3>
              <p className="text-slate-500">
                Results
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                Free
              </h3>
              <p className="text-slate-500">
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

    </div>
  );
}