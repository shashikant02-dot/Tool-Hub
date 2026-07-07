"use client";

import Link from "next/link";
import {
  FileSpreadsheet,
  FileText,
  FileImage,
  ScanText,
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
  // {
  //   title: "Handwriting to Text",
  //   desc: "Convert notes and handwritten documents into editable text.",
  //   slug: "handwriting-to-text",
  //   icon: ScanText,
  //   category: "AI",
  // },
  
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
  },{
    title: "CSV-to-JSON",
    desc: "Convert JPG, PNG and WEBP images into a single PDF file.",
    slug: "csv-to-json",
    icon: Images,
    category: "PDF",
  },{
    title: "Invoice-Generator",
    desc: "Convert JPG, PNG and WEBP images into a single PDF file.",
    slug: "invoice-generator",
    icon: Images,
    category: "PDF",
  },
];

export default function ToolsGrid() {
  return (
    <section className="max-w-7xl mx-auto mt-14 mb-22 px-6 pt-6 ">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        {/* <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
          Most Popular
        </span> */}

        <h2 className="mt-5 text-5xl font-bold text-slate-900">
          Explore Powerful Tools
        </h2>

        <p className="mt-4 text-xl text-slate-500">
          Fast, secure and completely free tools designed for developers,
          creators and professionals.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => {
          const Icon = tool.icon;

          return (
            <Link key={index} href={`/tools/${tool.slug}`} className="group">
              <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-2xl">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Category Badge */}
                <div className="relative z-10 mb-5">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {tool.category}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
                  <Icon size={30} />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-6">
                  <h3 className="text-2xl font-bold text-slate-900 transition group-hover:text-indigo-600">
                    {tool.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">{tool.desc}</p>

                  <div className="mt-6 flex items-center font-semibold text-indigo-600">
                    Open Tool
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-200 blur-3xl opacity-0 transition duration-300 group-hover:opacity-30" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
