"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-22 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-[380px] flex items-center"
        >

          {/* Glow Circles */}
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-2xl"></div>

          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10"></div>

          <div className="absolute right-28 bottom-10 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">

            <h2 className="text-3xl md:text-4xl font-bold text-white ">
              Get more done
              <span className="block ">
                directly in your browser
              </span>
            </h2>

            <p className="mt-5 text-xl leading-8 text-white/90 max-w-2xl mx-auto">
              No downloads. No signups. No complexity. Access powerful file
              tools instantly and boost your productivity in seconds.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <button
                onClick={() => router.push("/tools")}
                className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 transition-all duration-300 hover:scale-105"
              >
                Explore Tools
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push("/pricing")}
                className="rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                View Pricing
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}