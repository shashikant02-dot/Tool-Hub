"use client";

import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { useFreeUsage } from "../context/FreeUsageContext";

export default function ExcelToJson() {
  const fileRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState([]);
const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();

const TOOL_NAME = "excel";

  // 1️⃣ Only store file (NO conversion here)
  const handleFile = (file) => {
    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);

    // reset previous output
    setJsonData([]);
    setHeaders([]);
  };

  // 2️⃣ Convert only on button click
 const handleConvert = () => {
  if (!selectedFile) return;

  // 🚨 Check free limit
  if (checkLimit(TOOL_NAME)) {
    setShowPopup(true);
    return;
  }

  // ✅ Increase usage
  increaseUsage(TOOL_NAME);

  const reader = new FileReader();
  reader.readAsArrayBuffer(selectedFile);

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);

    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
    });

    setJsonData(json);
    setHeaders(json.length ? Object.keys(json[0]) : []);
  };
};

  // 3️⃣ Download JSON
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "data"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">

      {/* UPLOAD BOX */}
      <div className="group relative overflow-hidden w-full max-w-4xl rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl p-8 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <div
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          className="relative z-10 border-2 border-dashed border-white/15 rounded-xl p-12 text-center cursor-pointer transition-colors hover:border-indigo-400/50"
        >
          <FileSpreadsheet className="mx-auto w-10 h-10 text-gray-500" />

          <p className="mt-3 text-gray-400">Drag & Drop Excel File</p>

          <button className="mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-full flex items-center gap-2 mx-auto shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]">
            <UploadCloud size={18} />
            Browse File
          </button>

          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* FILE INFO + CONVERT BUTTON */}
        {selectedFile && (
          <div className="relative z-10 mt-5 flex flex-col gap-3">

            <p className="text-sm text-gray-400">
              📄 {fileName}
            </p>

            <button
              onClick={handleConvert}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg w-fit shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
            >
              Convert to JSON
            </button>

            {jsonData.length > 0 && (
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm w-fit shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                Download JSON
              </button>
            )}
          </div>
        )}

        {/* Corner Glow */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
      </div>

      {/* JSON OUTPUT VIEW */}
      {jsonData.length > 0 && (
        <div className="mt-8 w-full max-w-4xl bg-black/60 border border-white/10 backdrop-blur-xl text-green-400 rounded-xl p-6 shadow-lg overflow-auto max-h-[450px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">📦 JSON Output</h2>

            <button
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
              }
              className="text-xs bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Copy JSON
            </button>
          </div>

          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}

      <div className="group relative overflow-hidden mt-24 mb-18 mx-auto max-w-4xl w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <h2 className="relative z-10 text-3xl font-bold text-white transition group-hover:text-indigo-300">
          Free Excel to JSON Converter
        </h2>
        <p className="relative z-10 leading-8 text-xl mt-5 text-gray-400">
          Convert Excel spreadsheets (.xlsx, .xls) to JSON using the
          industry-standard SheetJS library. Supports multiple sheets with tab
          switching, automatic header detection, and dynamic data typing.
          Everything processes locally — your spreadsheets never leave your
          device.
        </p>

        <div className="relative z-10 mt-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
}