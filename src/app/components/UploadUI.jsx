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

  const used = freeUses?.[toolName] || 0;

  function openFile() {
    if (used >= 3) {
      setShowPopup(true);
      return;
    }

    fileRef.current?.click();
  }

  async function uploadFile() {
    if (!file) return alert("Select file first");

    if (used >= 3) {
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

      if (res.ok && (data.code || data.downloadUrl)) {
        setFreeUses((prev) => ({
          ...prev,
          [toolName]: (prev[toolName] || 0) + 1,
        }));
      }

      setDownloadUrl(data.downloadUrl || "");
      setCode(data.code || "Error generating result.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden mt-24 px-6 py-10">

      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,rgba(99,102,241,.15),transparent_55%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[170px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">

        {/* LEFT */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10">

          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/10 blur-[120px]" />

          <div className="relative flex flex-col items-center justify-center text-center">

            <div
              onClick={openFile}
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-dashed border-white/20 bg-white/[0.05]"
            >
              <FaFileImage className="text-2xl text-indigo-400" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Drag and drop or
            </h2>

            <p className="mt-2 text-sm font-medium text-gray-400">
              {fileText}
            </p>

            <input
              ref={fileRef}
              type="file"
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
              onClick={openFile}
              className="mt-6 flex w-[28vw] max-w-xs items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
            >
              Upload File
              <IoIosCloudUpload className="text-2xl" />
            </button>

            <p className="mt-3 text-sm text-gray-500">
              or drag and drop your file here
            </p>

            {file && (
              <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-400">
                {file.name}
              </div>
            )}

                        {file && (
                <button
                  onClick={uploadFile}
                  disabled={loading || used >= 3}
                  className="mt-4 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : used >= 3
                    ? "Limit Reached"
                    : "Submit"}
                </button>
              )}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex flex-col h-[450px]">

          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-700/10 blur-[120px]" />

          {!code ? (
            <div className="flex flex-grow flex-col items-center justify-center text-center">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                <FaFileImage className="text-4xl text-indigo-400" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                {title}
              </h2>

              <p className="mt-3 max-w-xs text-base text-gray-400">
                {subtitle}
              </p>

            </div>
          ) : (
            <div className="flex h-full flex-col">

              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-xl font-semibold text-white">
                  Generated Code
                </h2>

                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download
                    className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Download
                  </a>
                )}

              </div>

              <pre className="flex-grow overflow-auto rounded-2xl border border-white/10 bg-[#0b0b13] p-4 font-mono text-xs whitespace-pre-wrap text-green-400">
                {code}
              </pre>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}