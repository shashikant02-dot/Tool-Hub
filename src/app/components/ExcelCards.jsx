import React from "react";

const cards = [
  {
    title: "For Business & Finance",
    description:
      (<>Professionals love our <b>business card scanner to excel and invoice to excel</b> features. Easily <b>scan bank statements into excel, scan invoices into excel,</b> or perform <b>inventory with barcode scanner excel</b> tasks. It's the ideal <b>app to scan business cards into excel</b> and <b>scan bill to excel.</b></>)
  },
  {
    title: "Data Entry & Automation",
    description:(<>Automate your workflow. <b>Extract tabular data from images </b>instantly. Whether it's <b>data entry images in excel, copy data from picture to excel,</b> or <b>convert hard copy to excel,</b> our <b>fastest image to excel converter</b> saves hours. Perfect for <b>scanning documents into excel spreadsheet</b> tasks.</>)
  },
  {
    title: "Mobile & Scanning",
    description:
     (<>Use your phone as a scanner. <b>Scan to excel android </b> and <b>iphone photo to excel</b> compatible. Convert <b>camscanner pdf to excel, scan paper to excel</b>, or <b>scan handwriting to excel.</b> We are the best<b> mobile barcode scanner to excel</b> solution online.

</>)
  },
  {
    title: "Advanced OCR Features",
    description:(<>Our <b>ocr image to excel</b> engine can<b> read text from image to excel, convert handwritten table to excel</b>, and <b>extract table from scanned pdf to excel</b>. It handles <b>blurred images, low light photos</b>, and complex <b>graph image to data excel</b> conversions.

</>)
  },
];

export default function ExcelCards() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-9xl w-[79vw] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 ">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-[30px] p-10 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-[24px] font-bold text-[#0B1736] mb-6">
                {card.title}
              </h3>

              <p className="text-[18px] leading-relaxed text-[#5B6B84]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}