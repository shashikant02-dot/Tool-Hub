import ExcelConvert from "@/app/components/ExcelConvert";
import ExcelCards from "@/app/components/ExcelCards";
import Excelfeatures from "@/app/components/Excelfeatures";
import ExcelWork from "@/app/components/ExcelWork";

export const metadata = {
  title: "Image to Excel Converter – Free Online Tool",
  description:
    "Convert images, screenshots and PDFs into structured Excel sheets instantly. Fast, secure and free tool.",
  keywords: [
    "image to excel",
    "image to spreadsheet",
    "pdf to excel",
    "excel converter",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/image-to-excel",
  },
  openGraph: {
    title: "Image to Excel Converter",
    description: "Convert images into Excel sheets instantly.",
    url: "https://yourdomain.com/tools/image-to-excel",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-center">
      {/* ================= BACKGROUND (same as Image to Code) ================= */}

      {/* Main Radial Background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />

      {/* Blue Glow */}
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />

      {/* Pink Glow */}
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      {/* Extra glow further down so the gradient feels continuous
          all the way to the bottom of the page, not just the hero */}
      <div className="pointer-events-none absolute left-1/2 top-[120%] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-700/10 blur-[170px]" />
      <div className="pointer-events-none absolute right-[-150px] top-[170%] -z-10 h-[500px] w-[500px] rounded-full bg-purple-700/10 blur-[160px]" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 mt-28 px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">
            <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200">
              📊 AI-Powered Tool
            </span>
            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              Image to spreadsheet
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Image to{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Excel
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto my-12 max-w-4xl text-center text-xl leading-8 text-gray-400 md:text-2xl">
            Turn <b className="text-gray-200">images and PDFs</b> into
            formatted <b className="text-gray-200">Excel sheets</b> instantly.
            Free online tool, no sign-up needed.
          </p>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Instant conversion</span>
            <span>✓ Accurate table detection</span>
            <span>✓ 100% free</span>
          </div>
        </div>
      </section>

      {/* ================= TOOL ================= */}
      <section className="relative z-10 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ExcelConvert />
        </div>
      </section>

      {/* ================= CONTENT (same dark background, no white break) ================= */}
      <div className="relative z-10 text-center pt-16 pb-4 px-6">
        <h2 className="text-5xl font-bold my-8 text-white">
          The Ultimate Image to Excel Converter
        </h2>

        <p className="text-[22px] max-w-4xl mx-auto leading-relaxed text-gray-400">
          ToolHub is your all-in-one solution to convert images to
          spreadsheets instantly.
        </p>

        <p className="text-[22px] max-w-4xl mx-auto leading-relaxed text-gray-400 mt-1">
          Convert screenshots, PDFs and images into Excel in seconds.
        </p>
      </div>

      <div className="relative z-10">
        <Excelfeatures />
        <ExcelWork />
        <ExcelCards />
      </div>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />
    </main>
  );
}