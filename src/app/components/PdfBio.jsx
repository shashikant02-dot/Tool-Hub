import React from "react";

export default function PdfBio({
  title,
  para1,
  para2,
  para3,
}) {
  return (
    <div className="mt-22">
      <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] ml-4 sm:ml-10 md:ml-20 lg:ml-72 font-bold">
        {title}
      </h1>

      <p className="ml-4 sm:ml-10 md:ml-20 lg:ml-72 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[52vw] text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed font-normal text-[#737373] mt-6">
        {para1}
      </p>

      <p className="ml-4 sm:ml-10 md:ml-20 lg:ml-72 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[52vw] text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed font-normal text-[#737373] mt-6">
        {para2}
      </p>

      <p className="ml-4 sm:ml-10 md:ml-20 lg:ml-72 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[52vw] text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed font-normal text-[#737373] mt-6">
        {para3}
      </p>
    </div>
  );
}