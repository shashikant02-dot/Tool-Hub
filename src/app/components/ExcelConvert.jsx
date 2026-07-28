"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useFreeUsage } from "../context/FreeUsageContext";
import SubscriptionPopup from "./SubscriptionPopup";

export default function ImageToExcel() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { checkLimit, increaseUsage, showPopup, setShowPopup } =
    useFreeUsage();

  // handle file select
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  // call API
  const convertImage = async () => {
    if (!files.length) return;

    // FREE LIMIT
    if (checkLimit("image-excel")) {
      setShowPopup(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    const res = await fetch("/api/image-to-excel", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setLoading(false);

    if (data?.table) {
      setTableData(data.table);

      // SUCCESSFUL CONVERSION
      increaseUsage("image-excel");
    }
  };

  // download excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "converted.xlsx");
  };

  // clear all
  const clearAll = () => {
    setFiles([]);
    setTableData([]);
  };

  return (
    <div className="flex flex-col mt-19 lg:flex-row gap-6 p-6 max-w-6xl mx-auto">
      {/* LEFT PANEL */}
      <div className="lg:w-[48%] w-full rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-lg p-6 h-[560px]">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          Upload Files (up to 5 MB)
        </h2>

        <div className="border-2 border-dashed border-white/15 rounded-3xl h-[330px] flex flex-col justify-center items-center text-center transition hover:border-purple-400/60 hover:bg-white/[0.04]">
          <input type="file" ref={inputRef} hidden onChange={handleFiles} />

          <button
            onClick={() => inputRef.current.click()}
            className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:scale-105 transition text-white font-semibold px-8 py-3 rounded-xl shadow-lg"
          >
            Choose File
          </button>

          <p className="mt-8 text-gray-500 text-sm">
            Supported: PNG, JPG, PDF
          </p>
        </div>

        {/* selected files */}
        {files.length > 0 && (
          <div className="mt-5">
            <h3 className="font-medium text-white">Selected Files</h3>
            <p className="text-sm text-gray-400">{files[0].name}</p>
          </div>
        )}

        {/* actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={convertImage}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            {loading ? "Converting..." : "Convert All"}
          </button>

          <button
            onClick={clearAll}
            className="border border-white/15 bg-white/[0.04] text-gray-200 px-5 py-2 rounded-lg font-semibold hover:bg-white/[0.08] transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:w-[52%] w-full rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-lg p-6 h-[560px] overflow-hidden">
        <h2 className="text-2xl font-bold mb-8 text-white">Results Area</h2>

        {tableData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-center">
            <div className="w-32 h-32 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-5xl">
              📋
            </div>

            <h2 className="mt-8 text-4xl font-bold text-gray-400">
              Results Area
            </h2>

            <p className="text-gray-500 mt-5 text-xl max-w-md">
              Files will be processed one by one. Download them individually
              here.
            </p>
          </div>
        ) : (
          <>
            <table className="w-full overflow-hidden rounded-xl border border-white/10 shadow-sm">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key) => (
                    <th
                      key={key}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 border border-white/10"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td
                        key={j}
                        className="border border-white/10 px-4 py-3 text-gray-300"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={downloadExcel}
              className="mt-8 py-4 p-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition"
            >
              Download Excel
            </button>
            <SubscriptionPopup
              open={showPopup}
              onClose={() => setShowPopup(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}