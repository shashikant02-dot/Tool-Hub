import CsvToJsonCon from '@/app/components/CsvToJsonCon'
import React from 'react'
export const metadata = {
 title: "CSV to JSON Converter",
  description:
    "Convert CSV files into structured JSON format instantly. Fast, secure and free online tool for developers.",
  alternates: {
    canonical: "https://yourdomain.com/tools/csv-to-json",
  },
};
export default function page() {
  return (
    <>
<section className="mt-20 ">
     <div className="flex flex-col items-center text-center mt-20 px-4">
  <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl">
    CSV to JSON
  </h1>

  <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl lg:text-2xl">
    Convert CSV files to JSON format instantly. Upload a CSV file or
    paste your CSV data directly to generate clean, structured JSON in
    seconds.
  </p>
</div>
    </section>
    
    <CsvToJsonCon/>
    
    </>
      )
}
