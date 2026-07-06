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
        <div className="bg-white rounded-[28px] border border-gray-200 shadow-xl p-8">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

            {/* LEFT */}
            <div className="border-2 border-dashed border-gray-300 rounded-[24px] flex flex-col items-center justify-center py-11 px-8">

              {!preview ? (
                <>
                  <ImageIcon size={60} className="text-gray-300 mb-5" />
                  <h2 className="text-4xl font-bold text-gray-900">
                    Upload your image
                  </h2>
                  <p className="text-gray-500 mt-3 text-lg">
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
                  <h3 className="font-bold text-2xl text-center">
                    {file?.name}
                  </h3>
                  <p className="text-gray-500 text-lg mt-1">
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
                className="mt-8 bg-[#15151d] hover:bg-black text-white px-10 py-4 rounded-2xl text-xl font-semibold"
              >
                Browse Files
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">

              <div className="border border-gray-200 rounded-[24px] p-6">
                <h3 className="text-2xl font-bold text-gray-800">
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

                <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                  Lower quality = smaller file. {quality}% is a great balance.
                </p>
              </div>

              {/* ✔ FIXED BUTTON */}
              <button
disabled={!file || loading}
                onClick={compressImage}
                className={`rounded-[20px] py-6 text-xl font-bold transition ${
                  file && !blocked
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
               {loading ? "Compressing..." : "Compress Image"}
              </button>
            </div>
          </div>
        </div>

        {/* RESULT */}
        {downloadUrl && (
          <>
            <div className="mt-10 bg-white rounded-[24px] border border-gray-200 p-5">
              <div className="grid md:grid-cols-3 text-center gap-6">

                <div>
                  <p className="uppercase text-gray-400 font-bold">
                    Original
                  </p>
                  <h3 className="text-3xl font-bold mt-2">
                    {(originalSize / 1024).toFixed(1)} KB
                  </h3>
                </div>

                <div>
                  <p className="uppercase text-gray-400 font-bold">
                    Compressed
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-pink-600">
                    {(compressedSize / 1024).toFixed(1)} KB
                  </h3>
                </div>

                <div>
                  <p className="uppercase text-gray-400 font-bold">
                    Reduced
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-pink-600">
                    {reducedPercent}%
                  </h3>
                </div>

              </div>
            </div>

            <div className="mt-6 bg-black rounded-[28px] p-5 flex justify-between items-center">
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
                className="bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-2xl text-xl font-bold flex items-center gap-3"
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