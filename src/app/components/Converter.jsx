"use client";

import Link from "next/link";

import {
  FileSpreadsheet,
  FileText,
  FileImage,
  Code2,
  Minimize2,
  Scissors,
  Images,
  Braces,
} from "lucide-react";

const tools = [
  {
    title: "Image to Code",
    desc: "Convert screenshots and designs to HTML, CSS, React, and Tailwind code.",
    slug: "image-to-code",
    icon: Code2,
    category: "Converter",
  },

  {
    title: "Image to Excel",
    desc: "Extract tables from images and convert them into Excel files.",
    slug: "image-excel",
    icon: FileSpreadsheet,
    category: "Converter",
  },

  {
    title: "Merge PDF",
    desc: "Combine multiple PDF files into a single document instantly.",
    slug: "merge-pdf",
    icon: FileText,
    category: "PDF",
  },

  {
    title: "Image Compressor",
    desc: "Reduce image size while maintaining visual quality.",
    slug: "image-compresor",
    icon: Minimize2,
    category: "Image",
  },

  {
    title: "Image Converter",
    desc: "Convert PNG, JPG, WEBP and more formats online.",
    slug: "image-converter",
    icon: FileImage,
    category: "Image",
  },

  {
    title: "Excel to JSON",
    desc: "Convert Excel spreadsheets into clean JSON data.",
    slug: "excel-json",
    icon: Braces,
    category: "Developer",
  },

  {
    title: "Split PDF",
    desc: "Extract pages or split large PDF documents securely.",
    slug: "split-pdf",
    icon: Scissors,
    category: "PDF",
  },

  {
    title: "JPG to PDF",
    desc: "Convert JPG, PNG and WEBP images into a single PDF file.",
    slug: "jpg-to-pdf",
    icon: Images,
    category: "PDF",
  },

  {
    title: "CSV to JSON",
    desc: "Convert CSV files into clean and structured JSON data.",
    slug: "csv-to-json",
    icon: Braces,
    category: "Developer",
  },

  {
    title: "Invoice Generator",
    desc: "Create professional invoices quickly and easily.",
    slug: "invoice-generator",
    icon: FileText,
    category: "Business",
  },
];

export default function ToolsGrid() {
  return (
    <section className="mx-auto mt-14 mb-22 max-w-7xl px-6 pt-6">

      {/* ================= HEADING ================= */}

      <div className="mx-auto mb-14 max-w-3xl text-center">

        <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-400 backdrop-blur-md">
          ✨ Powerful & Free
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">

          Explore Powerful{" "}

          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Tools
          </span>

        </h2>

        <p className="mt-5 text-base leading-8 text-gray-400 sm:text-lg">
          Fast, secure and completely free tools designed for developers,
          creators and professionals.
        </p>

      </div>


      {/* ================= GRID ================= */}

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

        {tools.map((tool, index) => {

          const Icon = tool.icon;

          return (

            <Link
              key={index}
              href={`/tools/${tool.slug}`}
              className="group"
            >

              <div className="
                relative
                h-full
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.04]
                p-7
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-purple-500/40
                hover:bg-white/[0.07]
                hover:shadow-2xl
                hover:shadow-purple-900/20
              ">


                {/* Hover Gradient */}

                <div className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-purple-500/10
                  via-transparent
                  to-pink-500/10
                  opacity-0
                  transition
                  duration-500
                  group-hover:opacity-100
                " />


                {/* Category */}

                <div className="relative z-10 mb-6">

                  <span className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.06]
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-gray-400
                  ">
                    {tool.category}
                  </span>

                </div>


                {/* Icon */}

                <div className="
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-500
                  via-purple-600
                  to-pink-500
                  text-white
                  shadow-lg
                  shadow-purple-900/30
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:rotate-3
                ">

                  <Icon size={30} />

                </div>


                {/* Content */}

                <div className="relative z-10 mt-6">

                  <h3 className="
                    text-2xl
                    font-bold
                    text-white
                    transition
                    duration-300
                    group-hover:text-purple-300
                  ">
                    {tool.title}
                  </h3>


                  <p className="
                    mt-3
                    leading-7
                    text-gray-500
                  ">
                    {tool.desc}
                  </p>


                  {/* Open Tool */}

                  <div className="
                    mt-6
                    flex
                    items-center
                    font-semibold
                    text-purple-400
                    transition
                    group-hover:text-purple-300
                  ">

                    Open Tool

                    <span className="
                      ml-2
                      transition-transform
                      duration-300
                      group-hover:translate-x-2
                    ">
                      →
                    </span>

                  </div>

                </div>


                {/* Decorative Glow */}

                <div className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-48
                  w-48
                  rounded-full
                  bg-purple-600/20
                  blur-3xl
                  opacity-0
                  transition
                  duration-500
                  group-hover:opacity-100
                " />

              </div>

            </Link>

          );

        })}

      </div>

    </section>
  );
}