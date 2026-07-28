"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Download, CheckCircle } from "lucide-react";
import { useFreeUsage } from "../context/FreeUsageContext";

export default function CompressImageUI() {
  const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();

  const TOOL_NAME = "image-compress";

  // ✔ single source of truth
  const blocked = checkLimit(TOOL_NAME);

  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [quality, setQuality] = useState(60);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [reducedPercent, setReducedPercent] = useState(0);

  const openFile = () => {
    fileRef.current?.click();
  };

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setOriginalSize(selected.size);

    setDownloadUrl("");
    setCompressedSize(0);
    setReducedPercent(0);
  };

  const compressImage = async () => {
  if (!file || loading) return;

  // 🚨 3 attempts ke baad popup
  if (blocked) {
    setShowPopup(true);
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", quality);

    const res = await fetch("/api/compress-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    increaseUsage(TOOL_NAME);

    setDownloadUrl(data.downloadUrl);
    setCompressedSize(data.compressedSize);
    setReducedPercent(data.reducedPercent);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">

        {/* TOP CARD */}
        <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl p-8 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative z-10 grid lg:grid-cols-[2fr_1fr] gap-8">

            {/* LEFT */}
            <div className="border-2 border-dashed border-white/15 rounded-[24px] flex flex-col items-center justify-center py-11 px-8">

              {!preview ? (
                <>
                  <ImageIcon size={60} className="text-gray-500 mb-5" />
                  <h2 className="text-4xl font-bold text-white">
                    Upload your image
                  </h2>
                  <p className="text-gray-400 mt-3 text-lg">
                    Drag and drop an image here
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-[210px] object-contain mb-5 rounded-lg"
                  />
                  <h3 className="font-bold text-2xl text-center text-white">
                    {file?.name}
                  </h3>
                  <p className="text-gray-400 text-lg mt-1">
                    {(file?.size / 1024).toFixed(1)} KB
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleFile}
                className="hidden"
              />

              <button
                onClick={openFile}
                className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl text-xl font-semibold shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
              >
                Browse Files
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">

              <div className="border border-white/10 bg-white/[0.02] rounded-[24px] p-6">
                <h3 className="text-2xl font-bold text-white">
                  Quality: {quality}%
                </h3>

                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full mt-5 accent-pink-500"
                />

                <p className="text-gray-400 mt-5 text-lg leading-relaxed">
                  Lower quality = smaller file. {quality}% is a great balance.
                </p>
              </div>

              {/* ✔ FIXED BUTTON */}
              <button
disabled={!file || loading}
                onClick={compressImage}
                className={`rounded-[20px] py-6 text-xl font-bold transition-all duration-500 ${
                  file && !blocked
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
                    : "bg-white/[0.05] text-gray-500"
                }`}
              >
               {loading ? "Compressing..." : "Compress Image"}
              </button>
            </div>
          </div>

          {/* Corner Glow */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
        </div>

        {/* RESULT */}
        {downloadUrl && (
          <>
            <div className="group relative overflow-hidden mt-10 rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 grid md:grid-cols-3 text-center gap-6">

                <div>
                  <p className="uppercase text-gray-500 font-bold">
                    Original
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-white">
                    {(originalSize / 1024).toFixed(1)} KB
                  </h3>
                </div>

                <div>
                  <p className="uppercase text-gray-500 font-bold">
                    Compressed
                  </p>
                  <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {(compressedSize / 1024).toFixed(1)} KB
                  </h3>
                </div>

                <div>
                  <p className="uppercase text-gray-500 font-bold">
                    Reduced
                  </p>
                  <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {reducedPercent}%
                  </h3>
                </div>

              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl p-5 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-400" />
                  <h2 className="text-white text-3xl font-bold">
                    Compression Complete!
                  </h2>
                </div>
              </div>
<a
              
                href={downloadUrl}
                download="compressed-image.jpg"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl text-xl font-bold flex items-center gap-3 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
              >
                <Download size={22} />
                Download
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}