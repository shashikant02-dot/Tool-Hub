import React from "react";

export default function PdfBio({
  title,
  para1,
  para2,
  para3,
}) {
  return (
    <div className="mt-22 flex justify-center px-4 sm:px-10 md:px-20 lg:px-32">
      <div
        className="
          group
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
          sm:p-10
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-indigo-500/40
          hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]
        "
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <h1 className="relative z-10 text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-white transition group-hover:text-indigo-300">
          {title}
        </h1>

        <p className="relative z-10 text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed font-normal text-gray-400 mt-6">
          {para1}
        </p>

        <p className="relative z-10 text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed font-normal text-gray-400 mt-6">
          {para2}
        </p>

        <p className="relative z-10 text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed font-normal text-gray-400 mt-6">
          {para3}
        </p>

        {/* Bottom Line */}
        <div className="relative z-10 mt-8 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

        {/* Corner Glow */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
      </div>
    </div>
  );
}