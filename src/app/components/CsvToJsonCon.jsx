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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-neutral-900">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 p-8 shadow-xl shadow-indigo-100/30 space-y-8">
        
        {/* Top Segment: Dropzone Block */}
        <div 
          onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
          className={`flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 transition-all duration-300 cursor-pointer bg-white
${
  isDragging
    ? "border-indigo-500 bg-indigo-50"
    : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/40"
}`}
        >
          <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e.target.files)} className="hidden" accept=".csv" />
          <div className="mb-2.5 text-neutral-400">
            <svg className="h-6 w-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <p className="text-[16px] font-medium text-neutral-500">
            Drag & drop a .csv file or <span className="text-black font-semibold bg-neutral-100 px-2 py-1 rounded ml-1 border border-neutral-200 shadow-sm">Browse File</span>
          </p>
        </div>

        {/* Bottom Split Layout Grid Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Block: CSV Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[18px] font-bold text-neutral-700 tracking-tight">CSV Input</label>
            </div>
            <textarea
              value={csvInput}
              onChange={handleInputChange}
              placeholder="name,email,age,john@mail.com,30"
             className="w-full h-96 rounded-2xl border border-slate-200 bg-white p-5 font-mono text-[15px] leading-relaxed outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-none"
            />
          </div>

          {/* Right Block: JSON Output View Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[16px] font-bold text-neutral-700 tracking-tight">
                JSON Output <span className="text-blue-600 font-semibold ml-1">{rowCount > 0 ? `(${rowCount} rows)` : ''}</span>
              </label>
              
              {jsonOutput && (
                <div className="flex items-center gap-3 text-neutral-400">
                  <button onClick={copyToClipboard} className="flex items-center gap-1 text-[12px] font-medium hover:text-neutral-600 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy
                  </button>
                  <button onClick={downloadJsonFile} className="flex items-center gap-1 text-[12px] font-medium hover:text-neutral-600 transition-colors">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download
                  </button>
                </div>
              )}
            </div>

            <div className="w-full h-96 rounded-2xl border border-slate-200 bg-white p-5 font-mono text-[15px] leading-relaxed overflow-y-auto whitespace-pre-wrap shadow-sm">
              {jsonOutput ? jsonOutput : <span className="text-neutral-400 italic">JSON output will appear here...</span>}
            </div>
          </div>

        </div>

        {/* Global Action Trigger Button */}
        <div className="pt-2">
          <button
            onClick={executeConversion}
           className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-3 text-[17px] font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            Convert to JSON
          </button>
        </div>

      </div>
      <div className="mt-20 sm:mt-24 lg:mt-42 mb-12 sm:mb-16 lg:mb-18 px-4 sm:px-8 lg:ml-72">
  <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold">
    Free CSV to JSON Converter
  </h2>

  <p className="w-full sm:w-[85vw] md:w-[70vw] lg:w-[53vw] leading-7 sm:leading-8 text-base sm:text-lg lg:text-xl mt-5 text-[#52525c]">
    CSV (Comma-Separated Values) is the most common format for exporting
    data from spreadsheets and databases. Our converter uses the
    industry-standard PapaParse library to parse your CSV with RFC 4180
    compliance, handling quoted fields, special characters, and large files
    with ease. Headers are automatically detected and used as JSON keys.
    Everything processes locally in your browser.
  </p>
</div>
<section className="max-w-5xl mx-auto px-4 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    
    {/* Features Card */}
    <div className="border border-gray-200 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Features
      </h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
          </svg>

          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-700">
              Auto Header Detection:
            </span>{" "}
            First row becomes JSON keys automatically
          </p>
        </div>

        <div className="flex items-start gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
          </svg>

          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-700">
              Dynamic Typing:
            </span>{" "}
            Numbers and booleans are automatically detected
          </p>
        </div>
      </div>
    </div>

    {/* Privacy Card */}
    <div className="border border-gray-200 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Privacy
      </h2>

      <div className="flex items-start gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        <p className="text-lg text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-700">
            100% Client-Side:
          </span>{" "}
          Your data never leaves your device
        </p>
      </div>
    </div>

  </div>
</section>
    </div>
  );
}