import React from "react";

const cards = [
  {
    title: "For Business & Finance",
    description: (
      <>
        Professionals love our <b className="text-gray-200">business card scanner to excel and invoice to excel</b> features. Easily{" "}
        <b className="text-gray-200">scan bank statements into excel, scan invoices into excel,</b> or perform{" "}
        <b className="text-gray-200">inventory with barcode scanner excel</b> tasks. It's the ideal{" "}
        <b className="text-gray-200">app to scan business cards into excel</b> and <b className="text-gray-200">scan bill to excel.</b>
      </>
    ),
  },
  {
    title: "Data Entry & Automation",
    description: (
      <>
        Automate your workflow. <b className="text-gray-200">Extract tabular data from images</b> instantly. Whether it's{" "}
        <b className="text-gray-200">data entry images in excel, copy data from picture to excel,</b> or{" "}
        <b className="text-gray-200">convert hard copy to excel,</b> our <b className="text-gray-200">fastest image to excel converter</b> saves hours. Perfect for{" "}
        <b className="text-gray-200">scanning documents into excel spreadsheet</b> tasks.
      </>
    ),
  },
  {
    title: "Mobile & Scanning",
    description: (
      <>
        Use your phone as a scanner. <b className="text-gray-200">Scan to excel android</b> and{" "}
        <b className="text-gray-200">iphone photo to excel</b> compatible. Convert{" "}
        <b className="text-gray-200">camscanner pdf to excel, scan paper to excel</b>, or{" "}
        <b className="text-gray-200">scan handwriting to excel.</b> We are the best <b className="text-gray-200">mobile barcode scanner to excel</b> solution online.
      </>
    ),
  },
  {
    title: "Advanced OCR Features",
    description: (
      <>
        Our <b className="text-gray-200">ocr image to excel</b> engine can{" "}
        <b className="text-gray-200">read text from image to excel, convert handwritten table to excel</b>, and{" "}
        <b className="text-gray-200">extract table from scanned pdf to excel</b>. It handles{" "}
        <b className="text-gray-200">blurred images, low light photos</b>, and complex{" "}
        <b className="text-gray-200">graph image to data excel</b> conversions.
      </>
    ),
  },
];

export default function ExcelCards() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-9xl w-[79vw] mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
            >
              <h3 className="text-[24px] font-bold text-white mb-6">
                {card.title}
              </h3>

              <p className="text-[18px] leading-relaxed text-gray-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}