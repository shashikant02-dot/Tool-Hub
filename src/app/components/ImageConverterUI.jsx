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
      <div className="  flex items-center justify-center p-6 mt-">
        <div className="w-full max-w-6xl bg-white rounded-[28px] border border-gray-200 shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_320px] gap-8">
            {/* LEFT */}
            <div className="border-2 border-dashed border-gray-300 rounded-[24px] flex flex-col items-center justify-center min-h-[420px] px-8">
              {!preview ? (
                <>
                  <ImageIcon
                    size={72}
                    className="text-gray-300 mb-6"
                    strokeWidth={1.5}
                  />

                  <h2 className="text-[38px] font-bold text-gray-900">
                    Upload your image
                  </h2>

                  <p className="text-gray-500 text-lg mt-2">
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

                  <h3 className="text-2xl font-bold text-center">
                    {file?.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
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
                className="mt-8 bg-[#15151d] hover:bg-black mb-3 text-white font-semibold text-xl px-10 py-4 rounded-2xl transition"
              >
                Browse Files
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5">
              <div className="border border-gray-200 rounded-[24px] p-5">
                <h3 className="text-center text-[32px] font-bold text-gray-800 mb-5">
                  Convert To
                </h3>

                <div className="space-y-3">
                  {formats.map((item) => (
                    <button
                      key={item}
                      onClick={() => setFormat(item)}
                      className={`w-full py-2 rounded-2xl text-xl font-bold transition border ${
                        format === item
                          ? "bg-[#f4e7b4] border-[#f4c430] text-[#a94f00]"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
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
                className={`rounded-[18px] py-5 font-bold text-xl transition ${
                  file
                    ? "bg-[#d9d9df] bg-orange-400 text-[#fff]"
                    : "bg-[#d9d9df] text-[#9a9aa3]"
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
              {/* <div className="mt-8 bg-white border rounded-[24px] p-6">
              <h2 className="text-2xl font-bold mb-4">
                Converted Image
              </h2>

              <img
                src={convertedUrl}
                alt="Converted"
                className="max-h-[400px] mx-auto rounded-xl"
              />
            </div> */}

              <div className="mt-6 bg-black rounded-[28px] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-2xl"
                >
                  Download
                </a>
              </div>
            </>
          )}
          
        </div>
        
      </div>
      <div className="mt-42 mb-18 ml-62">
        <h2 className="text-3xl font-bold">Free Image Format Converter</h2>
        <p className="w-[53vw] leading-8 text-xl mt-5 text-[#52525c]">
          Convert any image between PNG, JPG, and WEBP formats instantly using
          the browser's native Canvas rendering engine. PNG for lossless quality
          and transparency, JPG for smaller photos, or WEBP for the best of both
          worlds. Your images never leave your device.
        </p>
      </div>
    </>
  );
}
