"use client";

import {
  Shield,
  Zap,
  Heart,
  Globe,
  Layers3,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your files never leave your device. Everything runs securely in your browser.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Powered by modern browser APIs for instant processing and conversions.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Heart,
    title: "Free Forever",
    desc: "No subscriptions, hidden fees, or signup requirements. Just free tools.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Globe,
    title: "Works Offline",
    desc: "Most tools continue working even without an internet connection.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Layers3,
    title: "Batch Processing",
    desc: "Handle multiple files simultaneously with drag & drop support.",
    gradient: "from-purple-500 to-fuchsia-400",
  },
  {
    icon: Rocket,
    title: "Always Growing",
    desc: "New tools and features are added regularly based on community feedback.",
    gradient: "from-violet-500 to-indigo-400",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-[#030303] py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(45,20,80,0.3),transparent_65%)]" />

      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-700/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-[450px] w-[450px] rounded-full bg-blue-700/10 blur-[140px]" />


      <div className="relative mx-auto max-w-7xl px-6">


        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            Why ToolHub
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">

            Built for the way

            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}you work
            </span>

          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Fast, secure and beautifully simple tools designed to help
            you get work done in seconds.
          </p>

        </div>


        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, i) => {

            const Icon = item.icon;

            return (

              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-purple-900/20"
              >

                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />


                <div className="relative z-10">


                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      className="text-white"
                      size={26}
                      strokeWidth={1.8}
                    />
                  </div>


                  {/* Title */}
                  <h3 className="mt-6 text-2xl font-bold text-white">
                    {item.title}
                  </h3>


                  {/* Description */}
                  <p className="mt-4 leading-7 text-gray-400">
                    {item.desc}
                  </p>


                  {/* Learn More */}
                  <div className="mt-6 flex items-center font-medium text-purple-400 opacity-0 transition-all duration-300 group-hover:opacity-100">

                    Learn more

                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}