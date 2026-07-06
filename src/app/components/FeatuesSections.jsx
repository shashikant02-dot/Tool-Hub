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
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-[140px]" />

      <div className="absolute -bottom-32 -left-20 h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-[120px]" />

      <div className="absolute top-20 -right-20 h-[350px] w-[350px] rounded-full bg-pink-300/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl font-bold tracking-tight text-slate-900">
            Built for the way
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}you work
            </span>
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-slate-600">
            Fast, secure and beautifully simple tools designed to help
            you get work done in seconds.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Hover Background */}
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br from-white via-indigo-50 to-pink-50" />

                <div className="relative z-10">

                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                  >
                    <Icon className="text-white" size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 leading-7 text-slate-600">
                    {item.desc}
                  </p>

                  {/* Learn More */}
                  <div className="mt-6 flex items-center font-medium text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
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