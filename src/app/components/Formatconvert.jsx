import React from 'react';

const formats = [
  { name: 'PNG', label: 'PNG to Code' },
  { name: 'JPG', label: 'JPG to Code' },
  { name: 'JPEG', label: 'JPEG to Code' },
  { name: 'WebP', label: 'WebP to Code' },
  { name: 'SVG', label: 'SVG to Code' },
  { name: 'Screenshot', label: 'Screenshot to Code' },
];

export default function Formatconvert() {
  return (
    <section className="bg-white py-16 px-4 font-sans selection:bg-orange-100">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Convert Any <span className="text-indigo-500">Image Format</span> to Code
        </h2>
        
        <p className="mt-7 max-w-4xl mx-auto text-base md:text-lg text-slate-500 leading-relaxed">
          Our AI image to code converter supports all major image formats including PNG, JPG, JPEG, WebP, and SVG. 
          Simply upload your design screenshot, UI mockup, or photo and get clean HTML, CSS, React, Tailwind, or 
          Vue code instantly. No format conversion needed.
        </p>

        {/* Format Cards Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-center">
          {formats.map((format, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-[#fcfcfc] border border-slate-200 rounded-2xl hover:border-slate-200 hover:bg-slate-50 transition-all duration-200 cursor-pointer group"
            >
              <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform duration-200 hover:text-indigo-500">
                {format.name}
              </span>
              <span className="mt-2 text-xs md:text-sm text-slate-400 font-medium">
                {format.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}