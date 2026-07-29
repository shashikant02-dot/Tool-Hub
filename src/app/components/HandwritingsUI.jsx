"use client";

import { useState } from "react";
import { UploadCloud, FileText, Copy, Check } from "lucide-react";
import { useFreeUsage } from "../context/FreeUsageContext";

const TOOL_NAME = "handwriting-to-text";

export default function HandwritingsUI() {
  const { checkLimit, increaseUsage, setShowPopup, freeUses } = useFreeUsage();
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const usedCount = freeUses?.[TOOL_NAME] || 0;
  const isBlocked = checkLimit(TOOL_NAME);

  // Just stages the file — does NOT upload yet
  const selectFile = (selected) => {
    if (!selected || !selected.type.startsWith("image/")) {
      setExtractedText("Please upload a valid image file.");
      return;
    }
    setFile(selected);
    setExtractedText("");
    setCopied(false);
  };

  // Actual upload/extraction — only runs when Apply is clicked
  const submitFile = async () => {
    if (!file) return;

    // 🚨 LIMIT CHECK
    if (checkLimit(TOOL_NAME)) {
      setShowPopup(true);
      return;
    }

    setLoading(true);
    setCopied(false);
    setExtractedText("Extracting text...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/handwriting", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setExtractedText(data.error || "Something went wrong");
        return;
      }

      setExtractedText(data.text || "No text found.");
      // ✅ Increase usage only on a successful extraction
      increaseUsage(TOOL_NAME);
    } catch (error) {
      console.error("Frontend Error:", error);
      setExtractedText("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) selectFile(selected);
    // reset the input so re-selecting the same file still fires onChange
    e.target.value = "";
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected) selectFile(selected);
  };

  const handleCopy = async () => {
    if (!extractedText || loading) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section className="relative overflow-hidden mt-6 px-6 py-10">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,rgba(99,102,241,.15),transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[170px]" />

      <div className="relative z-10 flex justify-center mb-6">
        <span className="bg-white/[0.05] border border-white/10 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md">
          🎁 {usedCount}/3 free uses
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* LEFT: Upload Panel */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl p-10 h-[420px] flex flex-col justify-center transition-all duration-300 ${
            dragActive
              ? "border-indigo-400/40 bg-indigo-500/10"
              : "border-white/10 bg-white/[0.04] hover:border-indigo-500/30"
          }`}
        >
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/10 blur-[120px]" />

          <div className="relative flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/[0.05]">
              <UploadCloud size={24} className="text-indigo-400" strokeWidth={1.75} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              Drag & drop, paste or
            </h3>
            <p className="mt-2 text-sm font-medium text-gray-400 max-w-[320px] leading-relaxed">
              PNG, JPEG, JPG, WEBP, BMP, GIF, HEIC, HEIF, PDF up to 10 MB
            </p>

            <label className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-3 font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105">
              Upload File
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <p className="mt-3 text-sm text-gray-500">
              or drag & drop your file here
            </p>

            {file && (
              <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400 max-w-[280px] truncate">
                {file.name}
              </div>
            )}

            {file && (
              <button
                onClick={submitFile}
                disabled={loading || isBlocked}
                className="mt-4 rounded-xl bg-white px-8 py-2.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : isBlocked
                  ? "Limit Reached"
                  : "Apply"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Result Panel */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 h-[420px] flex flex-col">
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-700/10 blur-[120px]" />

          {extractedText ? (
            <div className="relative flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-xl font-semibold text-white">Extracted Text</h4>
                <button
                  onClick={handleCopy}
                  disabled={loading}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                    copied
                      ? "border-green-500/20 bg-green-500/10 text-green-400"
                      : "border-white/10 bg-white/[0.05] text-gray-300 hover:bg-white/[0.08] hover:border-indigo-500/30"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={15} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="flex-grow overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b13] p-5 whitespace-pre-wrap font-mono text-[15px] leading-7 text-gray-200">
                {extractedText}
              </div>
            </div>
          ) : (
            <div className="relative flex flex-grow flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                <FileText size={32} className="text-indigo-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-white">Ready to convert</h2>
              <p className="mt-3 max-w-xs text-base text-gray-400">
                Upload your handwriting to see the extracted text
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}