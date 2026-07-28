import React from "react";
import PdfBio from "./PdfBio";

export default function FeaturesGrid({ features }) {
  return (
    <>
      <section className="relative overflow-hidden py-20">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 -z-10 h-80 w-80 rounded-full bg-purple-700/10 blur-[130px]"></div>
        <div className="pointer-events-none absolute -bottom-32 -right-32 -z-10 h-80 w-80 rounded-full bg-indigo-700/10 blur-[130px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Powerful Features
            </h2>

            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to process your files quickly, securely, and
              without installing any software.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-xl
                    p-8
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    hover:border-indigo-500/40
                    hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]
                  "
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 mb-3 text-xl font-bold text-white transition group-hover:text-indigo-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 leading-7 text-gray-400">
                    {feature.description}
                  </p>

                  {/* Bottom Line */}
                  <div className="relative z-10 mt-6 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

                  {/* Corner Glow */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <PdfBio
        title="Why merging in the browser is worth it"
        para1="The obvious benefit is privacy: a document that is assembled locally is never exposed to a third-party server, so confidential pages stay on the hardware you control."
        para2="The less obvious benefit is speed and predictability. There is no upload to wait on and no download of the source files back to you."
        para3="Finally, doing the work in one place reduces mistakes by allowing you to preview and reorder pages before downloading."
      /> */}
    </>
  );
}