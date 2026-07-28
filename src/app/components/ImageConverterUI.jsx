"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, RefreshCcw } from "lucide-react";
import { useFreeUsage } from "../context/FreeUsageContext";

export default function ImageConverterUI() {
const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();

const TOOL_NAME = "image-converter";
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [format, setFormat] = useState("png");
  const [loading, setLoading] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState("");

  const openFile = () => {
    fileRef.current?.click();
  };

  const handleFile = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setConvertedUrl("");
  };

 const convertImage = async () => {
  if (!file) return;

  // 🚨 LIMIT CHECK
  if (checkLimit(TOOL_NAME)) {
    setShowPopup(true);
    return;
  }

  // ✅ Increase usage
  increaseUsage(TOOL_NAME);

  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("format", format);

  try {
    const res = await fetch("/api/image-converter", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Conversion failed");
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    setConvertedUrl(url);
  } catch (err) {
    console.error(err);
    alert("Conversion failed");
  } finally {
    setLoading(false);
  }
};

  const formats = ["png", "jpg", "webp"];

  return (
    <>
      <div className="flex items-center justify-center p-6">
        <div className="group relative overflow-hidden w-full max-w-6xl rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl p-8 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[2fr_320px] gap-8">
            {/* LEFT */}
            <div className="border-2 border-dashed border-white/15 rounded-[24px] flex flex-col items-center justify-center min-h-[420px] px-8">
              {!preview ? (
                <>
                  <ImageIcon
                    size={72}
                    className="text-gray-500 mb-6"
                    strokeWidth={1.5}
                  />

                  <h2 className="text-[38px] font-bold text-white">
                    Upload your image
                  </h2>

                  <p className="text-gray-400 text-lg mt-2">
                    Drag and drop any image
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-[250px] object-contain mb-6 rounded-xl"
                  />

                  <h3 className="text-2xl font-bold text-center text-white">
                    {file?.name}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {(file?.size / 1024).toFixed(1)} KB
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                className="hidden"
                onChange={handleFile}
              />

              <button
                onClick={openFile}
                className="mt-8 mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-xl px-10 py-4 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
              >
                Browse Files
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">
              <div className="border border-white/10 bg-white/[0.02] rounded-[24px] p-5">
                <h3 className="text-center text-[32px] font-bold text-white mb-5">
                  Convert To
                </h3>

                <div className="space-y-3">
                  {formats.map((item) => (
                    <button
                      key={item}
                      onClick={() => setFormat(item)}
                      className={`w-full py-2 rounded-2xl text-xl font-bold transition-all duration-300 border ${
                        format === item
                          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-transparent text-white shadow-lg"
                          : "bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-indigo-500/30"
                      }`}
                    >
                      {item.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={convertImage}
                disabled={!file || loading}
                className={`rounded-[18px] py-5 font-bold text-xl transition-all duration-500 ${
                  file
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
                    : "bg-white/[0.05] text-gray-500"
                }`}
              >
                {loading ? (
                  "Converting..."
                ) : (
                  <span className="flex items-center justify-center gap-2 ">
                    <RefreshCcw size={20} />
                    Convert
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* RESULT */}
          {convertedUrl && (
            <>
              <div className="relative z-10 mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-white text-3xl font-bold">
                    Conversion Complete!
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Your image has been converted successfully.
                  </p>
                </div>

                <a
                  href={convertedUrl}
                  download={`converted.${format}`}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
                >
                  Download
                </a>
              </div>
            </>
          )}

          {/* Corner Glow */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
        </div>

      </div>

      <div className="group relative overflow-hidden mt-24 mb-18 mx-auto max-w-4xl px-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <h2 className="relative z-10 text-3xl font-bold text-white transition group-hover:text-indigo-300">
          Free Image Format Converter
        </h2>
        <p className="relative z-10 leading-8 text-xl mt-5 text-gray-400">
          Convert any image between PNG, JPG, and WEBP formats instantly using
          the browser's native Canvas rendering engine. PNG for lossless quality
          and transparency, JPG for smaller photos, or WEBP for the best of both
          worlds. Your images never leave your device.
        </p>

        <div className="relative z-10 mt-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />
      </div>
    </>
  );
}