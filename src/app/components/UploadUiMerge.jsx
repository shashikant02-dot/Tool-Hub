"use client";

import React, { useRef, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useFreeUsage } from "../context/FreeUsageContext";

export default function UploadUiMerge() {
const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();

const TOOL_NAME = "merge-pdf"; 
  const fileRef = useRef(null);


  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openFilePicker = () => {
    fileRef.current?.click();
  };

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length < 2) {
      setError("Please select at least 2 images.");
      setFiles([]);
      setPdfUrl("");
      return;
    }

    setError("");
    setFiles(selectedFiles);
    setPdfUrl("");
  };

  const convertToPdf = async () => {
  setError("");

  if (files.length < 2) {
    setError("Please select at least 2 images.");
    return;
  }

  // 🚨 LIMIT CHECK
  if (checkLimit(TOOL_NAME)) {
    setShowPopup(true);
    return;
  }

  setLoading(true);

  try {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const imageData = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      const img = new Image();

      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = imageData;
      });

      if (i !== 0) pdf.addPage();

      const ratio = Math.min(
        pageWidth / img.width,
        pageHeight / img.height
      );

      const finalWidth = img.width * ratio;
      const finalHeight = img.height * ratio;

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      let imageType = "JPEG";
      if (file.type === "image/png") imageType = "PNG";
      if (file.type === "image/webp") imageType = "WEBP";

      pdf.addImage(imageData, imageType, x, y, finalWidth, finalHeight);
    }

    if (pdfUrl) URL.revokeObjectURL(pdfUrl);

    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);

    setPdfUrl(url);

    // ✅ increase usage AFTER success
    increaseUsage(TOOL_NAME);

  } catch (err) {
    console.error(err);
    setError("Failed to create PDF.");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-[20px] font-semibold mb-4">Add your Images</h2>

      {/* Hidden Input */}
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFiles}
      />

      {/* Upload Box */}
      <div
        onClick={openFilePicker}
        className="border border-dashed border-gray-300 rounded-3xl h-[260px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <h3 className="text-[20px] font-semibold">
          Drag and drop images or click to browse
        </h3>

        <p className="text-gray-500 text-[17px] mt-3">JPG · PNG · WEBP</p>

        {files.length > 0 && (
          <p className="mt-4 text-green-600 font-medium">
            {files.length} files selected
          </p>
        )}

        {error && <p className="mt-3 text-red-500">{error}</p>}
      </div>

      {/* Convert Button */}
      {files.length >= 2 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={convertToPdf}
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Creating PDF..." : "Convert to PDF"}
          </button>
        </div>
      )}

      {/* Preview Box */}
      {/* Preview Box */}
      <div className="border border-dashed border-gray-300 rounded-3xl min-h-[300px] mt-8 overflow-hidden">
        {!pdfUrl ? (
          <div className="h-[300px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6M9 8h6m-7 12h8a2 2 0 002-2V6l-4-4H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h3 className="text-[20px] font-semibold">
              Add at least two images
            </h3>

            <p className="text-center text-gray-500 text-[17px] w-[28vw] mt-4">
              Select 2 or more images and convert them into a single PDF.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <iframe
              src={pdfUrl}
              className="w-full h-[500px]"
              title="PDF Preview"
            />

            <div className="flex justify-center py-5 border-t bg-white">
              <a
                href={pdfUrl}
                download="converted.pdf"
                className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition"
              >
                Download PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
