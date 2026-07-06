import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export const exportToPDF = async () => {
  const element = document.getElementById("invoice-preview");

  if (!element) return;

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });

  const pdf = new jsPDF("p", "mm", "a4");

  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  pdf.addImage(dataUrl, "PNG", 0, 0, width, height);

  pdf.save("invoice.pdf");
};

export const exportToWord = async () => {
  const element = document.getElementById("invoice-preview");

  if (!element) return;

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });

  const html = `
    <html>
      <body>
        <img src="${dataUrl}" style="width:100%" />
      </body>
    </html>
  `;

  const blob = new Blob([html], {
    type: "application/msword",
  });

  saveAs(blob, "invoice.doc");
};