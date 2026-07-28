"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const tools = [
  { name: "Merge PDF", slug: "merge-pdf" },
  { name: "Image to Code", slug: "image-to-code" },
  { name: "Image Compressor", slug: "image-compresor" },
  { name: "Image Converter", slug: "image-converter" },
  { name: "Excel to JSON", slug: "excel-json" },
  { name: "Image to Excel", slug: "image-excel" },
  { name: "Split PDF", slug: "split-pdf" },
  { name: "JPG to PDF", slug: "jpg-to-pdf" },
  { name: "CSV to JSON", slug: "csv-to-json" },
  { name: "Invoice Generator", slug: "invoice-generator" },
];

export default function SearchTools() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered =
    query.trim() === ""
      ? []
      : tools.filter((tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase())
        );

  const openTool = (slug) => {
    setQuery("");
    router.push(`/tools/${slug}`);
  };

  return (
    <div className="relative mx-auto mt-10 max-w-2xl">
      <div className="flex items-center rounded-full border border-white/15 bg-white/[0.08] p-1.5 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
        <input
          type="text"
          placeholder="Search from 138+ free online tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-gray-500 sm:text-base"
        />

        <button
          onClick={() => {
            if (filtered.length) {
              openTool(filtered[0].slug);
            }
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-xl transition hover:scale-105"
        >
          🔍
        </button>
      </div>

      {filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">
          {filtered.map((tool) => (
            <button
              key={tool.slug}
              onClick={() => openTool(tool.slug)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-white transition hover:bg-white/10"
            >
              <span>{tool.name}</span>
              <span className="text-purple-400">→</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}