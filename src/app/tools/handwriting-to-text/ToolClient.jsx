// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import FormatSelector from "@/app/components/Formatselector";
// import UploadUI from "@/app/components/UploadUI";
// import CardInfo from "@/app/components/CardInfo";
// import CardInfo2 from "@/app/components/CardInfo2";
// import Formatconvert from "@/app/components/Formatconvert";
// import CardInfo3 from "@/app/components/cardInfo3";
// import SubscriptionPopup from "@/app/components/SubscriptionPopup";

// export default function ToolPage() {
//   const params = useParams();
//   const slug = params.slug;

//   const TOOL_NAME = slug || "image-to-code";
//   const LIMIT = 3;

//   const [format, setFormat] = useState("HTML + CSS");
//   const [freeUses, setFreeUses] = useState({});
//   const [showPopup, setShowPopup] = useState(false);

//   const used = freeUses?.[TOOL_NAME] || 0;

//   // load
//   useEffect(() => {
//     const data = localStorage.getItem("freeUsesByTool");
//     if (data) setFreeUses(JSON.parse(data));
//   }, []);

//   // save
//   useEffect(() => {
//     localStorage.setItem("freeUsesByTool", JSON.stringify(freeUses));
//   }, [freeUses]);

//   // ✅ CORE FUNCTION (IMPORTANT)
//  const handleUse = () => {
//   const current = freeUses?.[TOOL_NAME] || 0;

//   if (current >= LIMIT) {
//     setShowPopup(true);
//     return false;
//   }

//   return true;
// };

//   if (slug === "code-formatter") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Code Formatter
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen text-center">

//       {/* HERO */}
//       <div className="mt-28">
//         <h1 className="text-6xl font-bold">
//           Image to Code AI
//         </h1>

//         <p className="mt-4">
//           Convert screenshots to code
//         </p>

//         <div className="mt-6">
//           {used}/3 free uses
//         </div>
//       </div>

//       {/* TOOL */}
//       <FormatSelector active={format} setActive={setFormat} />

//       <UploadUI
//         format={format}
//         apiEndpoint="/api/upload"
//         toolName={TOOL_NAME}
//         freeUses={freeUses}
//         setFreeUses={setFreeUses}
//         setShowPopup={setShowPopup}
//         onUse={handleUse}   // ⭐ MOST IMPORTANT
//       />

//       {/* CONTENT SECTIONS (DATA NOT CHANGED) */}
//       <CardInfo
//         heading={
//           <>
//             How to Convert Image to Code in{" "}
//             <span className="text-indigo-600">4 Simple Steps</span>
//           </>
//         }
//         subheading="Transform any design screenshot into production-ready code in seconds"
//         steps={[
//           {
//             stepNumber: "STEP 01",
//             title: "Upload Your Image",
//             description:
//               "Upload any UI screenshot, JPEG, or PNG to our photo to code generator. We support all major image formats up to 10MB.",
//           },
//           {
//             stepNumber: "STEP 02",
//             title: "Select Output Format",
//             description:
//               "Choose your target stack: HTML/CSS, React, Tailwind, or Vue. Our tool acts as a versatile image to html converter.",
//           },
//           {
//             stepNumber: "STEP 03",
//             title: "AI Generates Code",
//             description:
//               "Our advanced AI image to code converter analyzes your design and writes clean, semantic, production-ready code instantly.",
//           },
//           {
//             stepNumber: "STEP 04",
//             title: "Preview & Download",
//             description:
//               "View the results in real-time, copy the snippets, or download HTML CSS code files directly to your device.",
//           },
//         ]}
//       />

//       <CardInfo2
//         heading={
//           <>
//             AI Image to Code Generator{" "}
//             <span className="text-indigo-600">Features</span>
//           </>
//         }
//         subheading="Everything you need to convert designs to code efficiently"
//         steps={[
//           {
//             stepNumber: "STEP 01",
//             title: "Multi-Framework Support",
//             description:
//               "Convert images to HTML, CSS, React, Tailwind, Vue, and Next.js code. Choose your preferred framework for any project.",
//           },
//           {
//             stepNumber: "STEP 02",
//             title: "Advanced AI Technology",
//             description:
//               "Powered by Google Gemini Pro Vision AI for accurate, pixel-perfect code generation. Latest 2026 AI model.",
//           },
//           {
//             stepNumber: "STEP 03",
//             title: "Responsive Code Generation",
//             description:
//               "All generated code is mobile-first and responsive. Works perfectly on phones, tablets, and desktops.",
//           },
//           {
//             stepNumber: "STEP 04",
//             title: "Lightning Fast Conversion",
//             description:
//               "Convert screenshots to production-ready code in under 5 seconds. No waiting, instant results.",
//           },
//           {
//             stepNumber: "STEP 05",
//             title: "All Image Formats Supported",
//             description:
//               "Works with PNG, JPG, JPEG, WebP, SVG, and more. Upload any design screenshot or mockup.",
//           },
//           {
//             stepNumber: "STEP 06",
//             title: "100% Free & Unlimited",
//             description:
//               "No sign-up required, unlimited conversions, completely free forever. No hidden costs or subscriptions.",
//           },
//           {
//             stepNumber: "STEP 07",
//             title: "Privacy First & Secure",
//             description:
//               "Images processed securely and never stored on our servers. Your designs stay private.",
//           },
//           {
//             stepNumber: "STEP 08",
//             title: "Download & Export",
//             description:
//               "Download code as individual files. Copy to clipboard with one click.",
//           },
//           {
//             stepNumber: "STEP 09",
//             title: "Production-Ready Code",
//             description:
//               "Clean, semantic, commented code following industry best practices. Ready for production use.",
//           },
//         ]}
//       />

//       <Formatconvert />

//       <CardInfo3
//         heading={
//           <>
//             Perfect For Every{" "}
//             <span className="text-indigo-600">Development Workflow</span>
//           </>
//         }
//         subheading="Whether you're a developer, designer, or entrepreneur, our tool fits your needs"
//         steps={[
//           {
//             stepNumber: "STEP 01",
//             title: "Frontend Developers",
//             description:
//               "Speed up development by using our tool to convert screenshots to React code, HTML, and Tailwind CSS code instantly. Save hours of manual coding.",
//           },
//           {
//             stepNumber: "STEP 02",
//             title: "UI/UX Designers",
//             description:
//               "Bridge the design-to-development gap. Use it as a Figma to html code converter for your designs from Sketch or Adobe XD.",
//           },
//           {
//             stepNumber: "STEP 03",
//             title: "Agencies & Freelancers",
//             description:
//               "Deliver client projects faster with AI-powered image-to-code conversion. Meet deadlines with ease.",
//           },
//           {
//             stepNumber: "STEP 04",
//             title: "Startups & Solo Founders",
//             description:
//               "Build MVPs rapidly. Convert designs to code yourself and launch faster without hiring expensive developers.",
//           },
//           {
//             stepNumber: "STEP 05",
//             title: "Students & Learners",
//             description:
//               "Learn web development by seeing how designs translate to HTML, CSS, React code. Understand code structure.",
//           },
//           {
//             stepNumber: "STEP 06",
//             title: "Rapid Prototyping",
//             description:
//               "Convert sketches and wireframes to code for quick prototypes. Iterate faster with instant code generation.",
//           },
//         ]}
//       />
//       <SubscriptionPopup open={showPopup} onClose={() => setShowPopup(false)} />
//     </div>
//   );
// }
// "use client";

// import { useRef, useState } from "react";
// import { IoIosCloudUpload } from "react-icons/io";
// import { FaFileImage } from "react-icons/fa";

// export default function UploadUI({
//   format,
//   title = "Ready to code",
//   subtitle = "Upload your design to see the magic happen",
//   fileText = "PNG, JPEG, JPG, WEBP, SVG+XML up to 10 MB",
//   apiEndpoint = "/api/upload",
//   extraData = {},
//   toolName,
//   freeUses,
//   setFreeUses,
//   setShowPopup,
  
// }){
//   const fileRef = useRef(null);

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [code, setCode] = useState("");
//   const [tableData, setTableData] = useState(null);
//   const [downloadUrl, setDownloadUrl] = useState("");

// function openFile() {
//   if ((freeUses[toolName] || 0) >= 3) {
//     setShowPopup(true);
//     return;
//   }

//   fileRef.current.click();
// }

//   async function uploadFile() {
//     if (!file) return alert("Select file first");

//     // Free limit check
//    if ((freeUses[toolName] || 0) >= 3) {
//   setShowPopup(true);
//   return;
// }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("format", format);

//     Object.entries(extraData).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     setLoading(true);

//     try {
//       const res = await fetch(apiEndpoint, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
// setLoading(false);

// // Success hone par hi counter increase hoga
// if (res.ok && (data.code || data.downloadUrl)) {
//   setFreeUses((prev) => ({
//     ...prev,
//     [toolName]: (prev[toolName] || 0) + 1,
//   }));
// }

// if (data.downloadUrl) {
//   setDownloadUrl(data.downloadUrl);
// }

//       if (data.code) {
//         setCode(data.code);

//         if (apiEndpoint === "/api/image-to-excel") {
//           try {
//             setTableData(JSON.parse(data.code));
//           } catch {
//             setTableData(null);
//           }
//         }
//       } else {
//         setCode("Error generating result. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//       alert("Something went wrong!");
//     }
//   }

//   return (
//     <div className="mt-24 flex justify-center px-6 py-10 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* LEFT SIDE */}
//         <div className="relative overflow-hidden border border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-white shadow-sm">
//           {/* subtle glow */}
//           <div className="absolute -top-20 -left-20 h-64 w-64 bg-indigo-100 rounded-full blur-3xl opacity-40" />

//           <div
//             className="relative w-16 h-16 flex items-center justify-center border border-dashed border-indigo-300 text-indigo-600 rounded-full mb-4 cursor-pointer bg-indigo-50"
//             onClick={openFile}
//           >
//             <FaFileImage className="text-2xl" />
//           </div>

//           <h2 className="text-xl font-semibold text-slate-900">
//             Drag and drop or
//           </h2>

//           <p className="text-sm text-slate-500 mt-2 font-medium text-center">
//             {fileText}
//           </p>

//           <input
//             type="file"
//             ref={fileRef}
//             className="hidden"
//             onChange={(e) => {
//               if (e.target.files?.[0]) {
//                 setFile(e.target.files[0]);
//                 setCode("");
//                 setTableData(null);
//                 setDownloadUrl("");
//               }
//             }}
//           />

//           <button
//             className="mt-6 px-6 py-2 w-[28vw] max-w-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition shadow-md flex items-center justify-center gap-2"
//             onClick={openFile}
//           >
//             Upload File
//             <IoIosCloudUpload className="text-2xl" />
//           </button>

//           <p className="text-slate-400 mt-2 text-sm">
//             or drag and drop your file here
//           </p>

//           {file && (
//             <p className="text-green-600 mt-3 font-medium">{file.name}</p>
//           )}

//           {file && (
//            <button
//   onClick={uploadFile}
// disabled={loading || (freeUses[toolName] || 0) >= 3}  className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
// >
//   {loading
//   ? "Processing..."
//   : (freeUses[toolName] || 0) >= 3
//   ? "Limit Reached"
//   : "Submit"}
// </button>
//           )}
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="relative overflow-hidden border border-slate-200 rounded-3xl p-6 bg-white flex flex-col h-[450px] shadow-sm">
//           {/* glow */}
//           <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-purple-100 rounded-full blur-3xl opacity-40" />

//           {!code ? (
//             <div className="flex-grow flex flex-col items-center justify-center text-center">
//               <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 border border-indigo-100">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.8}
//                   stroke="currentColor"
//                   className="w-6 h-6 text-indigo-400"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
//                   />
//                 </svg>
//               </div>

//               <h2 className="text-2xl font-bold text-slate-500">{title}</h2>

//               <p className="text-base text-slate-400 mt-2 max-w-[280px]">
//                 {subtitle}
//               </p>
//             </div>
//           ) : (
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-slate-800">
//                   Generated Result
//                 </h2>

//                 {downloadUrl && (
//                   <a
//                     href={downloadUrl}
//                     download
//                     className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
//                   >
//                     Download
//                   </a>
//                 )}
//               </div>

//               {/* TABLE */}
//               {apiEndpoint === "/api/image-to-excel" &&
//               tableData &&
//               Array.isArray(tableData) ? (
//                 <div className="overflow-auto flex-grow">
//                   <table className="w-full border border-slate-200 text-sm">
//                     <thead>
//                       <tr>
//                         {Object.keys(tableData[0]).map((key) => (
//                           <th
//                             key={key}
//                             className="border px-3 py-2 bg-slate-100 text-left font-semibold"
//                           >
//                             {key}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {tableData.map((row, index) => (
//                         <tr key={index}>
//                           {Object.values(row).map((value, i) => (
//                             <td key={i} className="border px-3 py-2">
//                               {String(value)}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <pre className="bg-slate-900 text-green-400 text-xs p-4 rounded-xl overflow-auto flex-grow font-mono whitespace-pre-wrap">
//                   {code}
//                 </pre>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
