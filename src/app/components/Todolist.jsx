"use client";

import { useEffect, useState } from "react";

export default function ToolList() {
  const tools = [
    "Image Generator",
    "Video Generator",
    "Text Generator",
    "Handwriting OCR",
    "Math to Word",
    "Image to Code",
    "Code Beautifier",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tools.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getTool = (offset) =>
    tools[(index + offset + tools.length) % tools.length];

  return (
    <div className="flex justify-center">
      <div className="space-y-5 text-center">
       <h2 className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
  {getTool(-3)}
</h2>

<h2 className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
  {getTool(-2)}
</h2>

<h2 className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
  {getTool(-1)}
</h2>

<div className="flex items-center justify-center gap-3 h-[50px]">
  <span className="text-indigo-600 text-3xl">➤</span>

  <div className="relative h-[50px] overflow-hidden">
    <div
      key={index}
      className="animate-fade-up text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
    >
      {getTool(0)}
    </div>
  </div>
</div>

<h2 className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
  {getTool(1)}
</h2>

<h2 className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
  {getTool(2)}
</h2>

<h2 className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
  {getTool(3)}
</h2>
      </div>
    </div>
  );
}