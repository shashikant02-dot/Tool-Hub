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
        return "text-purple-500";
      case SiVuedotjs:
        return "text-green-500";
      case SiNextdotjs:
        return "text-white";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex justify-center px-6 pb-10">
      <div className="w-full max-w-7xl rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-2xl">
        <div className="flex items-center gap-6">
          <p className="text-sm font-semibold tracking-widest text-gray-400 whitespace-nowrap">
            FORMAT:
          </p>

          <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex-1 pb-2">
            {options.map((item, index) => (
              <button
                key={index}
                onClick={() => setActive(item)}
                className={`relative flex items-center gap-3 rounded-2xl px-5 py-4 border transition-all duration-300 flex-shrink-0
                  ${
                    active === item
                      ? "border-indigo-500 bg-white/10 text-white shadow-[0_0_30px_rgba(99,102,241,0.30)]"
                      : "border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:border-white/20 hover:text-white"
                  }`}
              >
                {/* Icons */}
                <div className="relative w-8 h-6 flex items-center">
                  {getIcons(item).map((Icon, i) => (
                    <Icon
                      key={i}
                      className={`absolute text-xl ${
                        i === 0
                          ? "left-0 z-10"
                          : "left-4 z-0 opacity-90"
                      } ${getIconClass(Icon)}`}
                    />
                  ))}
                </div>

                {/* Text */}
                <span className="font-medium">{item}</span>

                {/* Active Check */}
                {active === item && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-[#030303] text-indigo-500 text-2xl shadow-lg">
                    <IoCheckmarkCircleSharp />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}