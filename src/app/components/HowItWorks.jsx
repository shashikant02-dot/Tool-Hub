import React from "react";
import PdfBio from "./PdfBio";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Add your PDF files",
      description:
        "Drag your PDFs onto the upload area or click to browse and select them. Add at least two files; you can keep adding more at any point without losing the ones already chosen.",
    },
    {
      number: "2",
      title: "Arrange the order",
      description:
        "Drag the file cards into the sequence you want, or use the move controls. The merged document will follow this exact top-to-bottom order.",
    },
    {
      number: "3",
      title: "Choose the pages to keep",
      description:
        "Optionally open a file to select specific pages or a page range. Only the pages you select are carried into the merged output, and the live total updates as you go.",
    },
    {
      number: "4",
      title: "Name the merge",
      description:
        "Enter a custom output filename if you like, then press Merge PDF. The tool copies your chosen pages into a single document right on your device.",
    },
    {
      number: "5",
      title: "Download the result",
      description:
        "Download the finished PDF straight to your device. Start over whenever you need to assemble a different bundle.",
    },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text backdrop-blur-xl">
            Easy Process
          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-white">
            How It Works
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
            Merge your PDF documents in just a few clicks without uploading your
            files to external servers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
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

              {/* Number */}
              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xl font-bold text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="relative z-10 mb-4 text-2xl font-bold text-white transition group-hover:text-indigo-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 leading-8 text-[17px] text-gray-400">
                {step.description}
              </p>

              {/* Bottom Line */}
              <div className="relative z-10 mt-6 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

              {/* Corner Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
            </div>
          ))}
        </div>
      </section>

      <PdfBio
        title="When people reach for a PDF merger"
        para1="Job seekers combine a resume, cover letter, and portfolio into one attachment so a recruiter opens a single, well-ordered file instead of three loose ones. Keeping them together also preserves the order the applicant intended."
        para2="Finance and operations teams staple monthly invoices, receipts, and a summary sheet into one statement for filing or reimbursement. Selecting only the relevant pages from each source keeps the packet lean."
        para3="Students and researchers merge scanned chapters, lecture notes, and reference articles into a single study document, then trim duplicate cover pages so the result reads as one continuous text."
      />
    </>
  );
}