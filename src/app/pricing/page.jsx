import React from "react";
import PricingCard from "../components/PricingCard";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] pt-28 pb-20">

      {/* ================= BACKGROUND ================= */}

      {/* Main Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />

      {/* Blue Glow */}
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />

      {/* Pink Glow */}
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />


      {/* ================= HERO ================= */}

      <section className="relative z-10 px-6 pb-16 text-center">

        <div className="mx-auto max-w-4xl">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">

            <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200">
              ✨ Simple & Flexible Pricing
            </span>

            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              No hidden fees
            </span>

          </div>


          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">

            Choose the plan.

            <br />

            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Power your workflow.
            </span>

          </h1>


          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg md:text-xl">

            Buy credits once and use them across all ToolHub tools.

            <br />

            Simple pricing, powerful tools, and no long-term commitment.

          </p>


          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">

            <span>✓ Secure payments</span>

            <span>✓ No subscription required</span>

            <span>✓ Credits valid for 30 days</span>

          </div>

        </div>

      </section>


      {/* ================= PRICING ================= */}

     <section className="relative z-10 px-4 pb-20 sm:px-6">
  <div className="mx-auto max-w-7xl">

    {/* Pricing Card Wrapper */}
    <div className="relative mx-auto max-w-xl">

      {/* Card Glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-600/20 blur-3xl" />

      {/* Border Glow */}
      <div className="relative rounded-[34px] bg-gradient-to-r from-orange-400/40 via-pink-500/40 to-purple-600/40 p-[1px]">

        {/* Pricing Card */}
        <div className="rounded-[33px] bg-[#080808] p-1 shadow-[0_0_80px_rgba(168,85,247,0.15)]">

          <PricingCard />

        </div>

      </div>

    </div>

  </div>
</section>


      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

    </main>
  );
}