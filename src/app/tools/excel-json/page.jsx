import ExcelToJson from "@/app/components/ExcelToJson";
import React from "react";
export const metadata = {
  title: "Excel to JSON Converter",
  description:
    "Convert Excel spreadsheets (.xlsx, .xls) into structured JSON format instantly. Fast, secure and free for developers.",
  keywords: [
    "excel to json",
    "xlsx to json",
    "spreadsheet to json",
    "excel converter",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/excel-to-json",
  },
};
export default function page() {
  return (
    <section className="mt-20 ">
      <div className="flex flex-col text-center mt-22">
        <h1 className="text-5xl font-bold">
          Excel to <span className="text-green-500"> JSON</span>
        </h1>
        <p className="text-2xl text-gray-600 leading-14">
          Convert Excel spreadsheets (.xlsx, .xls) to JSON format with automatic
          header detection.
        </p>
      </div>
      <ExcelToJson />
    </section>
  );
}
