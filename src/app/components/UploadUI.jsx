"use client";

import { useRef, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";

export default function UploadUI({
  format,
  title = "Ready to code",
  subtitle = "Upload your design to see the magic happen",
  fileText = "PNG, JPEG, JPG, WEBP up to 10 MB",
  apiEndpoint = "/api/upload",
  extraData = {},
  toolName,
  freeUses,
  setFreeUses,
  setShowPopup,
}) {
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  function openFile() {
    if ((freeUses[toolName] || 0) >= 3) {
      setShowPopup(true);
      return;
    }
    fileRef.current.click();
  }

  async function uploadFile() {
    if (!file) return alert("Select file first");

    if ((freeUses[toolName] || 0) >= 3) {
      setShowPopup(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && (data.code || data.downloadUrl)) {
        setFreeUses((prev) => ({
          ...prev,
          [toolName]: (prev[toolName] || 0) + 1,
        }));
      }

      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }

      if (data.code) {
        setCode(data.code);
      } else {
        setCode("Error generating result. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="mt-24 flex justify-center px-6 py-10 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="relative overflow-hidden border border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-white shadow-sm">
          <div className="absolute -top-20 -left-20 h-64 w-64 bg-indigo-100 rounded-full blur-3xl opacity-40" />

          <div
            className="relative w-16 h-16 flex items-center justify-center border border-dashed border-indigo-300 text-indigo-600 rounded-full mb-4 cursor-pointer bg-indigo-50"
            onClick={openFile}
          >
            <FaFileImage className="text-2xl" />
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            Drag and drop or
          </h2>

          <p className="text-sm text-slate-500 mt-2 font-medium text-center">
            {fileText}
          </p>

          <input
            type="file"
            ref={fileRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
                setCode("");
                setDownloadUrl("");
              }
            }}
          />

          <button
            className="mt-6 px-6 py-2 w-[28vw] max-w-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition shadow-md flex items-center justify-center gap-2"
            onClick={openFile}
          >
            Upload File
            <IoIosCloudUpload className="text-2xl" />
          </button>

          <p className="text-slate-400 mt-2 text-sm">
            or drag and drop your file here
          </p>

          {file && (
            <p className="text-green-600 mt-3 font-medium">{file.name}</p>
          )}

          {file && (
            <button
              onClick={uploadFile}
              disabled={loading || (freeUses[toolName] || 0) >= 3}
              className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Processing..."
                : (freeUses[toolName] || 0) >= 3
                ? "Limit Reached"
                : "Submit"}
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative overflow-hidden border border-slate-200 rounded-3xl p-6 bg-white flex flex-col h-[450px] shadow-sm">
          <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-purple-100 rounded-full blur-3xl opacity-40" />

          {!code ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-slate-500">{title}</h2>
              <p className="text-base text-slate-400 mt-2 max-w-[280px]">
                {subtitle}
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Generated Code
                </h2>

                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                  >
                    Download
                  </a>
                )}
              </div>

              <pre className="bg-slate-900 text-green-400 text-xs p-4 rounded-xl overflow-auto flex-grow font-mono whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}