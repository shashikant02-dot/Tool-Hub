import React from "react";

const CardInfo2 = ({ heading, subheading, steps }) => {
  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <section className="bg-white py-20 px-6 sm:px-12 lg:px-24 font-sans select-none">
      
      <div className="max-w-[1400px] mx-auto text-center mb-16">
        <h2 className="text-[38px] leading-[48px] font-bold text-[#111827] tracking-tight">
          {heading}
        </h2>

        <p className="mt-4 text-[17px] text-[#6b7280] font-normal tracking-normal">
          {subheading}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {safeSteps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-[2rem] p-9 flex flex-col justify-between text-left hover:border-indigo-200"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 1%, rgba(99, 102, 241, 0.15) 0%, rgba(255, 255, 255, 0) 90%)",
            }}
          >
            <div>
              <span className="block text-[12px] font-bold tracking-[0.12em] text-indigo-600 uppercase mb-[18px]">
                {step.stepNumber}
              </span>

              <h3 className="text-[21px] font-bold text-[#111827] mb-4 tracking-tight hover:text-indigo-600">
                {step.title}
              </h3>

              <p className="text-[15px] leading-[1.65] text-[#6b7280] font-normal antialiased">
                {step.description}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default CardInfo2;