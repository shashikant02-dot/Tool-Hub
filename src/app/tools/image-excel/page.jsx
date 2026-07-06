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
    <section className="mt-14 bg-[#fcfeff]">
      {/* HEADER */}
      <div className="flex flex-col text-center mt-20">
        <h1 className="text-6xl font-bold">
          Image to <span className="text-green-500">Excel</span> Converter
        </h1>

        <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
          Turn images and PDFs into formatted Excel sheets instantly.
        </p>
      </div>

      {/* CLIENT COMPONENT */}
      <ExcelConvert />

      {/* CONTENT */}
      <div className="text-center mt-32">
        <h2 className="text-5xl font-bold my-8">
          The Ultimate Image to Excel Converter
        </h2>

        <p className="text-[22px] max-w-4xl mx-auto leading-relaxed text-gray-600">
          ToolHub is your all-in-one solution to convert images to spreadsheets instantly.
        </p>

        <p className="text-[22px] max-w-4xl mx-auto leading-relaxed text-gray-600 mt-1">
          Convert screenshots, PDFs and images into Excel in seconds.
        </p>
      </div>

      <Excelfeatures />
      <ExcelWork />
      <ExcelCards />
    </section>
  );
}