"use client";

import React, { useState, useRef } from "react";
import PdfBio from "./PdfBio";
import FeaturesGrid from "./FeatureGrid";
import { useFreeUsage } from "../context/FreeUsageContext";

export default function NextPdfSplitter() {
 const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();
 const TOOL_NAME = "pdfSplit";
  const [file, setFile] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [activeTab, setActiveTab] = useState("Custom ranges");
  const [pageRanges, setPageRanges] = useState("");
  const [filename, setFilename] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loadingPages, setLoadingPages] = useState(false);
  const fileInputRef = useRef(null);
  

  const handleFileChange = async (uploadedFile) => {
    if (!uploadedFile || uploadedFile.type !== "application/pdf") return;

    setFile({
      name: uploadedFile.name,
      size: (uploadedFile.size / (1024 * 1024)).toFixed(1),
      raw: uploadedFile,
    });
    setLoadingPages(true);

    try {
     const pdfjsLib = await import("pdfjs-dist");
     // pdfjs-dist v6 is ESM-only, so the worker file is .mjs, not .min.js —
     // bundling it locally (instead of pointing at a CDN URL) avoids the
     // "Setting up fake worker failed" error and any CDN/CORS flakiness.
     pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
       "pdfjs-dist/build/pdf.worker.min.mjs",
       import.meta.url
     ).toString();

      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const totalPages = pdf.numPages;
        const thumbUrls = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport })
            .promise;
          thumbUrls.push(canvas.toDataURL("image/jpeg", 0.9));
        }
        setThumbnails(thumbUrls);
        setLoadingPages(false);
      };
      fileReader.readAsArrayBuffer(uploadedFile);
    } catch (error) {
      console.error("Error rendering PDF pages:", error);
      setLoadingPages(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const clearAll = () => {
    setFile(null);
    setThumbnails([]);
    setPageRanges("");
    setFilename("");
  };

const processPdfSplit = async () => {
  if (!file || !pageRanges) return;

  // 🚨 LIMIT CHECK (3 attempts)
  if (checkLimit(TOOL_NAME)) {
    setShowPopup(true);
    return;
  }

  // ✅ increase usage
  increaseUsage(TOOL_NAME);

  try {
    const { PDFDocument } = await import("pdf-lib");
    const arrayBuffer = await file.raw.arrayBuffer();
    const srcPdf = await PDFDocument.load(arrayBuffer);
    const ranges = pageRanges.split(",").map((r) => r.trim());

    for (const range of ranges) {
      const newPdf = await PDFDocument.create();

      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);

        for (let i = start; i <= end; i++) {
          if (i <= srcPdf.getPageCount()) {
            const [copiedPage] = await newPdf.copyPages(srcPdf, [i - 1]);
            newPdf.addPage(copiedPage);
          }
        }
      } else {
        const pageNum = Number(range);

        if (pageNum <= srcPdf.getPageCount()) {
          const [copiedPage] = await newPdf.copyPages(srcPdf, [pageNum - 1]);
          newPdf.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename || "split_file"}_${range}.pdf`;
      link.click();
    }
  } catch (err) {
    console.error("Error splitting PDF:", err);
  }
};

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* State A: Dropzone View */}
        {!file && (
          <div className="space-y-2.5">
            <h2 className="text-[24px] font-semibold text-white tracking-tight pl-0.5">
              Upload your PDF
            </h2>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current.click()}
              className={`group relative overflow-hidden flex flex-col items-center justify-center rounded-xl border border-dashed p-14 transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-sm
                ${isDragging ? "border-indigo-500/60 bg-indigo-500/10 scale-[0.995]" : "border-white/15 bg-white/[0.04] hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)] hover:-translate-y-1"}`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files?.[0])}
                className="hidden"
                accept=".pdf"
              />
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <p className="relative z-10 text-[18px] font-medium text-white transition group-hover:text-indigo-300">
                Drag and drop a file or click to browse
              </p>
              <p className="relative z-10 mt-1 text-[14px] text-gray-400 font-medium">
                PDF · Up to 100 MB per file · Max 1 files
              </p>

              {/* Corner Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
            </div>
          </div>
        )}

        {/* State B: Operational Workspace */}
        {file && (
          <>
            {/* Minimal Sub-header Meta */}
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[15px] font-medium text-gray-400 tracking-tight">
                1 file
              </span>
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-[15px] font-medium text-gray-500 hover:text-indigo-300 transition-colors"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear all
              </button>
            </div>

            {/* Selected File Profile Strip */}
            <div className="group relative overflow-hidden flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3.5 shadow-sm transition-all duration-500 hover:border-indigo-500/40">
              <div className="relative z-10 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-white tracking-tight truncate max-w-md">
                    {file.name}
                  </h4>
                  <p className="text-[14px] text-gray-400 font-medium mt-0.5">
                    {file.size} MB ·{" "}
                    {loadingPages
                      ? "Processing contents..."
                      : `${thumbnails.length} pages`}
                  </p>
                </div>
              </div>
              <button
                onClick={clearAll}
                className="relative z-10 text-gray-500 hover:text-indigo-300 transition-colors p-1"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Split Strategy Control Hub */}
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 space-y-5 shadow-sm transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Tab Selector pills */}
              <div className="relative z-10 flex flex-wrap gap-1.5 border-b border-white/10 pb-4 ">
                {[
                  "Custom ranges",
                  
                  "Each page",
                  
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-3.5 py-1.5 text-[16px] font-medium tracking-tight transition-all duration-300
                      ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
                          : "text-gray-300 bg-white/[0.03] hover:bg-white/[0.08] hover:border-indigo-500/30"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Range Parser Inputs */}
              <div className="relative z-10 space-y-1.5">
                <label className="text-[15px] font-bold text-white tracking-tight">
                  Page ranges
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1-3, 5, 8-10"
                  value={pageRanges}
                  onChange={(e) => setPageRanges(e.target.value)}
                  className="w-full rounded-lg border border-white/10 px-3 py-2 text-[15px] text-white outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 bg-white/[0.03] focus:bg-white/[0.06] placeholder:text-gray-500"
                />
                <p className="text-[13px] text-gray-500 font-medium">
                  Each range becomes a separate PDF. Total: {thumbnails.length}{" "}
                  pages.
                </p>
              </div>

              {/* Dynamic Name Assignment */}
              <div className="relative z-10 space-y-1.5">
                <label className="text-[14px] font-bold text-white tracking-tight">
                  Output filename
                </label>
                <input
                  type="text"
                  placeholder="Enter a custom filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full rounded-lg border border-white/10 px-3 py-2 text-[14px] text-white outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 bg-white/[0.03] focus:bg-white/[0.06] placeholder:text-gray-500"
                />
                <p className="text-[13px] text-gray-500 font-medium">
                  Leave blank to use a descriptive default name.
                </p>
              </div>

              {/* Action Trigger */}
              <button
                onClick={processPdfSplit}
                className="relative z-10 mt-8 px-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)] text-[17px] tracking-tight"
              >
                Split PDF
              </button>

              {/* Corner Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
            </div>
          </>
        )}
      </div>
      <PdfBio
        title=" Turn one big PDF into the files you need"
        para1=" A single PDF often carries far more than one document's worth of content: a scanned booklet that should be three chapters, a bank statement that bundles twelve months together, or an export where every invoice is stacked into one long file. Toolghar's Split PDF tool lets you cut that monolith into the pieces you need, choosing exactly where each new document begins and ends.
"
        para2="You are not limited to one way of slicing. Define your own page ranges when the natural breaks are irregular, split automatically every few pages when the structure is uniform, burst the file so each page becomes its own document, or cherry-pick a scattered set of pages and pull them into a single extract. Whichever method fits your document, you can see the resulting files before you commit to anything.

"
        para3="The whole operation runs inside the page you are reading, so the original never travels to a server. That makes splitting safe for the kinds of files people most often need to divide — statements, contracts, tax records, and reports — where sending the document to an unknown service just to separate a few pages would be a privacy risk you would rather avoid.

"
      />
      {/* <FeaturesGrid/> */}
    </div>
  );
}