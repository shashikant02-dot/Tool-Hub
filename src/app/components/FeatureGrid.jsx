import React from "react";
import PdfBio from "./PdfBio";

export default function FeaturesGrid({ features }) {
  return (
    <>
      <section className="relative overflow-hidden py-20">
        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 h-80 w-80 "></div>
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full "></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className=" text-4xl md:text-5xl font-extrabold ">
              Powerful Features
            </h2>

            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
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
                  className="group rounded-3xl border border-indigo-100 bg-white/80 backdrop-blur-sm p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-2xl"
                >
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-7 text-slate-600">
                    {feature.description}
                  </p>
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
