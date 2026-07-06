import React from "react";
import PricingCard from "../components/PricingCard";

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* soft background glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 bg-indigo-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 bg-purple-300 rounded-full blur-3xl opacity-30" />

      {/* HERO */}
      <section className="relative pt-28 pb-10 flex justify-center">
        <div className="flex flex-col items-center text-center max-w-3xl px-6">

          <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur border border-indigo-100 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
            Simple Pricing
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 leading-8 mt-6">
            Buy credits once. Use across all tools. Valid for <br />
            30 days.
          </p>
        </div>
      </section>

      {/* PRICING SECTION with gradient feel */}
      <section className="relative pb-28">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
        
        <div className="relative">
          <PricingCard />
        </div>
      </section>

      {/* bottom fade white */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}