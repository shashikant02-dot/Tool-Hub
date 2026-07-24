"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import FormatSelector from "@/app/components/Formatselector";
import UploadUI from "@/app/components/UploadUI";
import CardInfo from "@/app/components/CardInfo";
import CardInfo2 from "@/app/components/CardInfo2";
import Formatconvert from "@/app/components/Formatconvert";
import CardInfo3 from "@/app/components/cardInfo3";
import SubscriptionPopup from "@/app/components/SubscriptionPopup";

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug;

  const TOOL_NAME = slug || "image-to-code";
  const LIMIT = 3;

  const [format, setFormat] = useState("HTML + CSS");
  const [freeUses, setFreeUses] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const used = freeUses?.[TOOL_NAME] || 0;

  // load
  useEffect(() => {
    const data = localStorage.getItem("freeUsesByTool");
    if (data) setFreeUses(JSON.parse(data));
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("freeUsesByTool", JSON.stringify(freeUses));
  }, [freeUses]);

  // CORE FUNCTION
  const handleUse = () => {
    const current = freeUses?.[TOOL_NAME] || 0;

    if (current >= LIMIT) {
      setShowPopup(true);
      return false;
    }

    return true;
  };

  if (slug === "code-formatter") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Code Formatter
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-center">

      {/* ================= BACKGROUND ================= */}

      {/* Main Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />

      {/* Blue Glow */}
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />

      {/* Pink Glow */}
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />


      {/* ================= HERO ================= */}

      <section className="relative z-10 mt-28 px-6 pb-16">

        <div className="mx-auto max-w-5xl">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">

            <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200">
              ✨ AI-Powered Developer Tool
            </span>

            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              Convert designs instantly
            </span>

          </div>


          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">

            Image to{" "}

            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Code AI
            </span>

          </h1>


          {/* Description */}
          <p className="mx-auto my-12 max-w-4xl text-center text-xl leading-8 text-gray-400 md:text-2xl">

            Transform <b className="text-gray-200">screenshots</b> and designs
            into production-ready{" "}

            <b className="text-gray-200">HTML, CSS, React,</b>

            Tailwind,

            <br />

            and Vue code instantly.

            <b className="text-gray-200"> Free online tool</b> powered by{" "}

            <b className="text-gray-200">Google Gemini AI.</b>

          </p>


          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">

            <span>✓ AI-powered generation</span>

            <span>✓ Multiple frameworks</span>

            <span>✓ Fast & easy to use</span>

          </div>

        </div>

      </section>


      {/* ================= TOOL ================= */}

      <section className="relative z-10 px-4 pb-24 sm:px-6">

        <div className="mx-auto max-w-7xl">

          <FormatSelector
            active={format}
            setActive={setFormat}
          />

          <UploadUI
            format={format}
            apiEndpoint="/api/upload"
            toolName={TOOL_NAME}
            freeUses={freeUses}
            setFreeUses={setFreeUses}
            setShowPopup={setShowPopup}
            onUse={handleUse}
          />

        </div>

      </section>


      {/* ================= CONTENT SECTIONS ================= */}

      <CardInfo
        heading={
          <>
            How to Convert Image to Code in{" "}
            <span className="text-indigo-600">
              4 Simple Steps
            </span>
          </>
        }
        subheading="Transform any design screenshot into production-ready code in seconds"
        steps={[
          {
            stepNumber: "STEP 01",
            title: "Upload Your Image",
            description:
              "Upload any UI screenshot, JPEG, or PNG to our photo to code generator. We support all major image formats up to 10MB.",
          },
          {
            stepNumber: "STEP 02",
            title: "Select Output Format",
            description:
              "Choose your target stack: HTML/CSS, React, Tailwind, or Vue. Our tool acts as a versatile image to html converter.",
          },
          {
            stepNumber: "STEP 03",
            title: "AI Generates Code",
            description:
              "Our advanced AI image to code converter analyzes your design and writes clean, semantic, production-ready code instantly.",
          },
          {
            stepNumber: "STEP 04",
            title: "Preview & Download",
            description:
              "View the results in real-time, copy the snippets, or download HTML CSS code files directly to your device.",
          },
        ]}
      />


      <CardInfo2
        heading={
          <>
            AI Image to Code Generator{" "}
            <span className="text-indigo-600">
              Features
            </span>
          </>
        }
        subheading="Everything you need to convert designs to code efficiently"
        steps={[
          {
            stepNumber: "STEP 01",
            title: "Multi-Framework Support",
            description:
              "Convert images to HTML, CSS, React, Tailwind, Vue, and Next.js code. Choose your preferred framework for any project.",
          },
          {
            stepNumber: "STEP 02",
            title: "Advanced AI Technology",
            description:
              "Powered by Google Gemini Pro Vision AI for accurate, pixel-perfect code generation. Latest 2026 AI model.",
          },
          {
            stepNumber: "STEP 03",
            title: "Responsive Code Generation",
            description:
              "All generated code is mobile-first and responsive. Works perfectly on phones, tablets, and desktops.",
          },
          {
            stepNumber: "STEP 04",
            title: "Lightning Fast Conversion",
            description:
              "Convert screenshots to production-ready code in under 5 seconds. No waiting, instant results.",
          },
          {
            stepNumber: "STEP 05",
            title: "All Image Formats Supported",
            description:
              "Works with PNG, JPG, JPEG, WebP, SVG, and more. Upload any design screenshot or mockup.",
          },
          {
            stepNumber: "STEP 06",
            title: "100% Free & Unlimited",
            description:
              "No sign-up required, unlimited conversions, completely free forever. No hidden costs or subscriptions.",
          },
          {
            stepNumber: "STEP 07",
            title: "Privacy First & Secure",
            description:
              "Images processed securely and never stored on our servers. Your designs stay private.",
          },
          {
            stepNumber: "STEP 08",
            title: "Download & Export",
            description:
              "Download code as individual files. Copy to clipboard with one click.",
          },
          {
            stepNumber: "STEP 09",
            title: "Production-Ready Code",
            description:
              "Clean, semantic, commented code following industry best practices. Ready for production use.",
          },
        ]}
      />


      <Formatconvert />


      <CardInfo3
        heading={
          <>
            Perfect For Every{" "}
            <span className="text-indigo-600">
              Development Workflow
            </span>
          </>
        }
        subheading="Whether you're a developer, designer, or entrepreneur, our tool fits your needs"
        steps={[
          {
            stepNumber: "STEP 01",
            title: "Frontend Developers",
            description:
              "Speed up development by using our tool to convert screenshots to React code, HTML, and Tailwind CSS code instantly. Save hours of manual coding.",
          },
          {
            stepNumber: "STEP 02",
            title: "UI/UX Designers",
            description:
              "Bridge the design-to-development gap. Use it as a Figma to html code converter for your designs from Sketch or Adobe XD.",
          },
          {
            stepNumber: "STEP 03",
            title: "Agencies & Freelancers",
            description:
              "Deliver client projects faster with AI-powered image-to-code conversion. Meet deadlines with ease.",
          },
          {
            stepNumber: "STEP 04",
            title: "Startups & Solo Founders",
            description:
              "Build MVPs rapidly. Convert designs to code yourself and launch faster without hiring expensive developers.",
          },
          {
            stepNumber: "STEP 05",
            title: "Students & Learners",
            description:
              "Learn web development by seeing how designs translate to HTML, CSS, React code. Understand code structure.",
          },
          {
            stepNumber: "STEP 06",
            title: "Rapid Prototyping",
            description:
              "Convert sketches and wireframes to code for quick prototypes. Iterate faster with instant code generation.",
          },
        ]}
      />


      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />


      <SubscriptionPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
      />

    </main>
  );
}