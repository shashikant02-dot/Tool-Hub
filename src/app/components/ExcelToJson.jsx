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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">

      {/* UPLOAD BOX */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">

        <div
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-black"
        >
          <FileSpreadsheet className="mx-auto w-10 h-10 text-gray-400" />

          <p className="mt-3 text-gray-600">Drag & Drop Excel File</p>

          <button className="mt-4 bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 mx-auto">
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
          <div className="mt-5 flex flex-col gap-3">

            <p className="text-sm text-gray-600">
              📄 {fileName}
            </p>

            <button
              onClick={handleConvert}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg w-fit"
            >
              Convert to JSON
            </button>

            {jsonData.length > 0 && (
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm w-fit"
              >
                Download JSON
              </button>
            )}
          </div>
        )}
      </div>

      {/* JSON OUTPUT VIEW */}
      {jsonData.length > 0 && (
        <div className="mt-8 w-full max-w-4xl bg-black text-green-400 rounded-xl p-6 shadow-lg overflow-auto max-h-[450px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">📦 JSON Output</h2>

            <button
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
              }
              className="text-xs bg-green-600 text-white px-3 py-1 rounded"
            >
              Copy JSON
            </button>
          </div>

          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-42 mb-18 ml-2">
        <h2 className="text-3xl font-bold">Free Excel to JSON Converter</h2>
        <p className="w-[53vw] leading-8 text-xl mt-5 text-[#52525c]">
          Convert Excel spreadsheets (.xlsx, .xls) to JSON using the
          industry-standard SheetJS library. Supports multiple sheets with tab
          switching, automatic header detection, and dynamic data typing.
          Everything processes locally — your spreadsheets never leave your
          device.
        </p>
      </div>
    </div>
  );
}
