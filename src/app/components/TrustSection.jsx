import { Upload, ArrowLeftRight, Download } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload Your File",
    desc: "Securely upload your file from any device in seconds.",
  },
  {
    icon: ArrowLeftRight,
    title: "Smart Conversion",
    desc: "Our system automatically processes and converts formats.",
  },
  {
    icon: Download,
    title: "Instant Download",
    desc: "Download your optimized file instantly, ready to use.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#f8fafc]">

      {/* Background Gradient Orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[140px]" />
      <div className="absolute top-1/2 right-0 h-[450px] w-[450px] rounded-full bg-pink-400/20 blur-[140px]" />
      <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-400/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">

         
          <h2 className="mt-6 text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            A clean 3-step process designed for speed, simplicity and modern UX.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-24 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Animated connecting line */}
          <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-pulse" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={i}
                className="group relative p-10 rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl"
              >

                {/* Hover Glow Layer */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

                <div className="relative z-10 text-center">

                  {/* Icon */}
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-400/30">
                    <Icon className="text-white" size={32} />
                  </div>

                  {/* Step Number */}
                  <div className="mt-4 text-sm font-semibold text-indigo-600">
                    STEP {i + 1}
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-2xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}