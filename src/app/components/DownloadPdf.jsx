"use client";

import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";

export default function DownloadPdf({ data }) {

  const downloadPDF = async () => {

    const blob = await pdf(
      <InvoicePDF data={data}/>
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${data.invoice.number}.pdf`;

    a.click();

    URL.revokeObjectURL(url);

  };

  return (

    <button
      onClick={downloadPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
    >
      Download PDF
    </button>

  );

}