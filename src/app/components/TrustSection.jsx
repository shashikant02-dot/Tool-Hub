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
    <section className="relative overflow-hidden bg-[#030303] py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(50,20,90,0.3),transparent_65%)]" />

      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-700/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-700/10 blur-[140px]" />


      <div className="relative mx-auto max-w-7xl px-6">


        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            Simple Process
          </p>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">

            How It{" "}

            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>

          </h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-400">
            A simple three-step process designed to make your work faster,
            easier and more efficient.
          </p>

        </div>


        {/* Steps */}
        <div className="relative mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">


          {/* Connecting Line */}
          <div className="absolute left-[18%] right-[18%] top-[80px] hidden h-px bg-gradient-to-r from-indigo-500/20 via-purple-500/70 to-pink-500/20 md:block" />


          {STEPS.map((step, i) => {

            const Icon = step.icon;

            return (

              <div
                key={i}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-purple-500/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-purple-900/20"
              >

                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-600/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />


                <div className="relative z-10">


                  {/* Icon */}
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-xl shadow-purple-900/30 transition duration-300 group-hover:scale-110">

                    <Icon
                      className="text-white"
                      size={32}
                      strokeWidth={1.8}
                    />

                  </div>


                  {/* Step Number */}
                  <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
                    Step {i + 1}
                  </div>


                  {/* Title */}
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {step.title}
                  </h3>


                  {/* Description */}
                  <p className="mt-4 leading-relaxed text-gray-400">
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