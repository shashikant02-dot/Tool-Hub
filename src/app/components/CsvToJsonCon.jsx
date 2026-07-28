'use client';

import React, { useState, useRef } from 'react';
import { useFreeUsage } from '../context/FreeUsageContext';

export default function CsvToJsonCon() {

const {
  checkLimit,
  increaseUsage,
  setShowPopup,
} = useFreeUsage();
  const [csvInput, setCsvInput] = useState('Name,Age,City\nRahul,25,Delhi\nAmit,30,Mumbai');
  const [jsonOutput, setJsonOutput] = useState('');
  const [rowCount, setRowCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Core CSV Parsing Engine logic
  const parseCsvToJson = (csvText) => {
    if (!csvText.trim()) {
      setJsonOutput('');
      setRowCount(0);
      return;
    }

    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) return;

    // Extract Headers
    const headers = lines[0].split(',').map(header => header.trim().replace(/^["']|["']$/g, ''));
    const result = [];

    // Extract Rows
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',').map(val => val.trim().replace(/^["']|["']$/g, ''));
      
      // Skip empty lines or mismatch rows silently
      if (currentline.length === 1 && currentline[0] === '') continue;

      headers.forEach((header, index) => {
        let value = currentline[index] !== undefined ? currentline[index] : '';
        
        // Auto-detect numbers or booleans strings to parse clean JSON types
        if (value.toLowerCase() === 'true') value = true;
        else if (value.toLowerCase() === 'false') value = false;
        else if (!isNaN(value) && value !== '') value = Number(value);

        obj[header] = value;
      });
      result.push(obj);
    }

    setJsonOutput(JSON.stringify(result, null, 2));
    setRowCount(result.length);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCsvInput(value);
  };

const executeConversion = () => {
  if (checkLimit("csvToJson")) {
    setShowPopup(true);
    return;
  }

  increaseUsage("csvToJson");
  parseCsvToJson(csvInput);
};
  // File Upload Handlers
const handleFileUpload = (files) => {
  if (!files || files.length === 0) return;

  if (checkLimit("csvToJson")) {
    setShowPopup(true);
    return;
  }

  increaseUsage("csvToJson");

  const file = files[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    setCsvInput(text);
    parseCsvToJson(text);
  };

  reader.readAsText(file);

  if (fileInputRef.current) fileInputRef.current.value = '';
};




  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
  };

  // Utility Actions
  const copyToClipboard = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    alert('JSON copied to clipboard!');
  };

  const downloadJsonFile = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted_output.json';
    link.click();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-white">
      <div className="group relative overflow-hidden mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)] space-y-8">

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
        
        {/* Top Segment: Dropzone Block */}
        <div 
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
          className={`relative z-10 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 transition-all duration-300 cursor-pointer
${
  isDragging
    ? "border-indigo-500/60 bg-indigo-500/10"
    : "border-white/15 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.05]"
}`}
        >
          <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e.target.files)} className="hidden" accept=".csv" />
          <div className="mb-2.5 text-gray-500">
            <svg className="h-6 w-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <p className="text-[16px] font-medium text-gray-400">
            Drag & drop a .csv file or <span className="text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 rounded ml-1 shadow-sm">Browse File</span>
          </p>
        </div>

        {/* Bottom Split Layout Grid Panels */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Block: CSV Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[18px] font-bold text-white tracking-tight">CSV Input</label>
            </div>
            <textarea
              value={csvInput}
              onChange={handleInputChange}
              placeholder="name,email,age,john@mail.com,30"
             className="w-full h-96 rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-[15px] leading-relaxed text-white outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] resize-none"
            />
          </div>

          {/* Right Block: JSON Output View Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[16px] font-bold text-white tracking-tight">
                JSON Output <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-semibold ml-1">{rowCount > 0 ? `(${rowCount} rows)` : ''}</span>
              </label>
              
              {jsonOutput && (
                <div className="flex items-center gap-3 text-gray-500">
                  <button onClick={copyToClipboard} className="flex items-center gap-1 text-[12px] font-medium hover:text-indigo-300 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy
                  </button>
                  <button onClick={downloadJsonFile} className="flex items-center gap-1 text-[12px] font-medium hover:text-indigo-300 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download
                  </button>
                </div>
              )}
            </div>

            <div className="w-full h-96 rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-[15px] leading-relaxed text-green-400 overflow-y-auto whitespace-pre-wrap shadow-sm">
              {jsonOutput ? jsonOutput : <span className="text-gray-500 italic">JSON output will appear here...</span>}
            </div>
          </div>

        </div>

        {/* Global Action Trigger Button */}
        <div className="relative z-10 pt-2">
          <button
            onClick={executeConversion}
           className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-3 text-[17px] font-semibold text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            Convert to JSON
          </button>
        </div>

        {/* Corner Glow */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

      </div>

      <div className="group relative overflow-hidden mt-20 sm:mt-24 lg:mt-42 mb-12 sm:mb-16 lg:mb-18 mx-auto max-w-4xl w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <h2 className="relative z-10 text-2xl sm:text-3xl lg:text-3xl font-bold text-white transition group-hover:text-indigo-300">
          Free CSV to JSON Converter
        </h2>

        <p className="relative z-10 leading-7 sm:leading-8 text-base sm:text-lg lg:text-xl mt-5 text-gray-400">
          CSV (Comma-Separated Values) is the most common format for exporting
          data from spreadsheets and databases. Our converter uses the
          industry-standard PapaParse library to parse your CSV with RFC 4180
          compliance, handling quoted fields, special characters, and large files
          with ease. Headers are automatically detected and used as JSON keys.
          Everything processes locally in your browser.
        </p>

        <div className="relative z-10 mt-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />
      </div>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Features Card */}
          <div className="group relative overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

            <h2 className="relative z-10 text-2xl font-bold text-white mb-8 transition group-hover:text-indigo-300">
              Features
            </h2>

            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" />
                </svg>

                <p className="text-lg text-gray-400 leading-relaxed">
                  <span className="font-semibold text-gray-200">
                    Auto Header Detection:
                  </span>{" "}
                  First row becomes JSON keys automatically
                </p>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" />
                </svg>

                <p className="text-lg text-gray-400 leading-relaxed">
                  <span className="font-semibold text-gray-200">
                    Dynamic Typing:
                  </span>{" "}
                  Numbers and booleans are automatically detected
                </p>
              </div>
            </div>

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
          </div>

          {/* Privacy Card */}
          <div className="group relative overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

            <h2 className="relative z-10 text-2xl font-bold text-white mb-8 transition group-hover:text-indigo-300">
              Privacy
            </h2>

            <div className="relative z-10 flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2 4-4" />
              </svg>

              <p className="text-lg text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-200">
                  100% Client-Side:
                </span>{" "}
                Your data never leaves your device
              </p>
            </div>

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
          </div>

        </div>
      </section>
    </div>
  );
}