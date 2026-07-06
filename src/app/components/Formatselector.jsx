"use client";

import {
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiVuedotjs,
  SiNextdotjs,
} from "react-icons/si";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function FormatSelector({ active, setActive }) {
  const options = [
    "HTML + CSS",
    "React + CSS",
    "React + Tailwind",
    "Vue + CSS",
    "Next.js + Tailwind",
    "HTML + Tailwind",
    "HTML + Bootstrap",
  ];

  const getIcons = (item) => {
    switch (item) {
      case "HTML + CSS":
        return [SiHtml5, SiCss];
      case "React + CSS":
        return [SiReact, SiCss];
      case "React + Tailwind":
        return [SiReact, SiTailwindcss];
      case "Vue + CSS":
        return [SiVuedotjs, SiCss];
      case "Next.js + Tailwind":
        return [SiNextdotjs, SiTailwindcss];
      case "HTML + Tailwind":
        return [SiHtml5, SiTailwindcss];
      case "HTML + Bootstrap":
        return [SiHtml5, SiBootstrap];
      default:
        return [SiReact, SiReact];
    }
  };

  const getIconClass = (Icon) => {
    switch (Icon) {
      case SiHtml5:
        return "text-orange-500";
      case SiCss:
        return "text-blue-500";
      case SiReact:
        return "text-cyan-400";
      case SiTailwindcss:
        return "text-sky-400";
      case SiBootstrap:
        return "text-purple-600";
      case SiVuedotjs:
        return "text-green-500";
      case SiNextdotjs:
        return "text-black dark:text-white";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex justify-center p-5">
      <div className="border p-4 rounded-3xl border-gray-300 flex items-center gap-8 max-w-[75vw]">
        <p className="text-gray-500 font-semibold whitespace-nowrap mt-[-24]">
          FORMAT:
        </p>

        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide max-w-[70vw] pb-2">
          {options.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item)}
              /* ✨ FIX 1: Active card par relative block set kiya taaki icon sahi target ho */
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition flex-shrink-0 relative my-2
                ${
                  active === item
                    ? "border-indigo-500 border-2 shadow-md font-bold text-black"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
            >
              {/* Technology Icons */}
              <div className="relative w-8 h-6 flex items-center">
                {getIcons(item).map((Icon, i) => (
                  <Icon
                    key={i}
                    className={`absolute text-xl ${
                      i === 0 ? "left-0 z-10" : "left-4 z-0 opacity-90"
                    } ${getIconClass(Icon)}`}
                  />
                ))}
              </div>

              {/* Text */}
              <span className="ml-2 pr-2">{item}</span>

              {/* ✨ FIX 2: Checkmark Wrapper - Isse border peeche chhup jayega */}
              {active === item && (
                <span className="absolute -top-2.5 -right-2.5 bg-white rounded-full text-indigo-600 text-2xl z-20 shadow-sm flex items-center justify-center">
                  <IoCheckmarkCircleSharp />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}