import React from "react";

export default function JpgHowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Add your images",
      description:
        "Drag your JPG, PNG, or WEBP files onto the upload area or click to browse and select them. You can add more images at any time, and each one appears as a thumbnail in the arrangement grid.",
    },
    {
      number: "2",
      title: "Arrange the order",
      description:
        "Drag the thumbnails into the sequence you want. The order shown in the grid is exactly the order the images will appear as pages in the finished PDF.",
    },
    {
      number: "3",
      title: "Choose orientation and page size",
      description:
        "Select portrait or landscape, then pick a page size such as A4 or US Letter for a uniform document, or fit-to-image so each page matches the picture it contains.",
    },
    {
      number: "4",
      title: "Set margins and fit",
      description:
        "Add margins if you want breathing room around each image, and choose a fit mode that decides whether the picture fills the page, fits inside the margins, or sits centered at its natural size.",
    },
    {
      number: "5",
      title: "Preview, name, and convert",
      description:
        "Check the live preview to confirm the layout looks right, set a custom output filename, then convert. The tool assembles the pages locally and lets you download the finished PDF straight to your device.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-16">
      

        <h2 className="mt-5 text-5xl font-extrabold text-slate-900">
          How It Works
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
          Convert your JPG, PNG, and WEBP images into a single PDF in just a
          few simple steps.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl"
          >
            {/* Number */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              {step.number}
            </div>

            {/* Title */}
            <h3 className="mb-4 text-2xl font-bold text-slate-900">
              {step.title}
            </h3>

            {/* Description */}
            <p className="leading-8 text-[17px] text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}