"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#030303] px-6 py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(75,35,130,0.25),transparent_65%)]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-700/15 blur-[140px]" />


      <div className="relative mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.04] px-6 py-20 text-center backdrop-blur-xl md:px-10">


          {/* Gradient Background Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.25),transparent_55%)]" />

          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />

          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />


          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">


            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">

              <Sparkles size={16} />

              Start creating today

            </div>


            {/* Heading */}
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">

              Get more done

              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                directly in your browser
              </span>

            </h2>


            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">

              No downloads. No signups. No complexity. Access powerful file
              tools instantly and boost your productivity in seconds.

            </p>


            {/* Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">


              {/* Explore Tools */}
              <button
                onClick={() => router.push("/tools")}
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/50"
              >

                Explore Tools

                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>


              {/* Pricing */}
              <button
                onClick={() => router.push("/pricing")}
                className="rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-4 text-lg font-semibold text-gray-200 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >

                View Pricing

              </button>

            </div>


            {/* Trust */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">

              <span>✓ No signup required</span>

              <span>✓ Free tools available</span>

              <span>✓ Secure & private</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}