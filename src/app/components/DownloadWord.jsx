"use client";

import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  VerticalAlign,
  TextRun,
  ShadingType,
  BorderStyle,
  ImageRun,
} from "docx";

/* ---------- Currency helper ---------- */
const CURRENCY_SYMBOLS = {
  INR: "Rs.",
  USD: "$",
  CAD: "$",
  AUD: "$",
  EUR: "EUR",
  GBP: "GBP",
};

function getCurrencySymbol(code) {
  if (!code) return "Rs.";
  return CURRENCY_SYMBOLS[code.toUpperCase()] || `${code} `;
}

/* ---------- Number to words (Indian lakh/crore style, like Flipkart invoices) ---------- */
const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

function twoDigits(n) {
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
}

function threeDigits(n) {
  if (n < 100) return twoDigits(n);
  return ONES[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + twoDigits(n % 100) : "");
}

function numberToWordsIndian(num) {
  num = Math.round(Number(num) || 0);
  if (num === 0) return "Zero";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = num;

  let words = "";
  if (crore) words += threeDigits(crore) + " Crore ";
  if (lakh) words += threeDigits(lakh) + " Lakh ";
  if (thousand) words += threeDigits(thousand) + " Thousand ";
  if (hundred) words += threeDigits(hundred);

  return words.trim() || "Zero";
}

function amountInWords(value, symbolLabel) {
  return `${symbolLabel} ${numberToWordsIndian(value)} Only`;
}

/* ---------- Borders / shading helpers ---------- */
const THIN = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const gridBorders = {
  top: THIN,
  bottom: THIN,
  left: THIN,
  right: THIN,
  insideHorizontal: THIN,
  insideVertical: THIN,
};
function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: none, bottom: none, left: none, right: none };
}

/* ---------- Convert a base64 data URL (logo/signature) into docx ImageRun input ---------- */
function dataUrlToImage(dataUrl) {
  try {
    if (!dataUrl || !dataUrl.startsWith("data:image")) return null;
    const [meta, base64] = dataUrl.split(",");
    const mimeMatch = meta.match(/data:image\/(\w+);base64/);
    let type = mimeMatch ? mimeMatch[1].toLowerCase() : "png";
    if (type === "jpeg") type = "jpg";
    if (!["png", "jpg", "gif", "bmp"].includes(type)) type = "png";

    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    return { data: bytes, type };
  } catch {
    return null;
  }
}

export default function DownloadWord({ data, onUse, isPro }) {
  const downloadWord = async () => {
    // ✅ Same gate as DownloadPdf — shares the same "invoice-generator"
    // counter, so PDF + Word together count toward the same limit.
    if (onUse && !onUse()) {
      return;
    }

    const {
      company = {},
      customer = {},
      invoice = {},
      items = [],
      subtotal = 0,
      taxAmount = 0,
      shippingAmount = 0,
      discountAmount = 0,
      grandTotal = 0,
      notes,
      terms,
      docMeta,
    } = data || {};

    // ✅ Bug fix: pehle yahan "TAX INVOICE", "Invoice No", "Due Date",
    // "PO Number", "Billing / Shipping To" — sab hardcoded the. Quotation/
    // Sales Order/Purchase Order download karne par bhi Word file ke andar
    // "TAX INVOICE" hi likha aata tha. Ab docMeta (jo InvoiceGenerator.jsx
    // ke DOC_TYPES se aata hai) se dynamic labels use karte hain.
    const meta = docMeta || {
      title: "TAX INVOICE",
      label: "Invoice",
      partyLabel: "Billing / Shipping To",
      secondDateLabel: "Due Date",
      referenceLabel: "PO Number",
    };
    const docLabel = meta.label || "Invoice";

    const symbol = getCurrencySymbol(invoice?.currency);
    const currencyLabel = invoice?.currency ? invoice.currency.toUpperCase() : "INR";
    const logoImg = dataUrlToImage(company.logo);
    const signatureImg = dataUrlToImage(company.signature);

    /* ================= TOP BLOCK: Company + Invoice title ================= */

    const topBlock = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: noBorders(),
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 60, type: WidthType.PERCENTAGE },
              borders: noBorders(),
              children: [
                ...(logoImg
                  ? [
                      new Paragraph({
                        spacing: { after: 80 },
                        children: [
                          new ImageRun({
                            data: logoImg.data,
                            type: logoImg.type,
                            transformation: { width: 100, height: 50 },
                          }),
                        ],
                      }),
                    ]
                  : []),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: company.headerName || company.name || "Company Name",
                      bold: true,
                      size: 30,
                      color: "111111",
                    }),
                  ],
                }),
                ...(company.headerAddress || company.address
                  ? [
                      new Paragraph({
                        spacing: { before: 40 },
                        children: [
                          new TextRun({
                            text: company.headerAddress || company.address,
                            size: 17,
                            color: "444444",
                          }),
                        ],
                      }),
                    ]
                  : []),
                ...(company.headerPhone || company.phone
                  ? [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Phone: ${company.headerPhone || company.phone}`,
                            size: 17,
                            color: "444444",
                          }),
                        ],
                      }),
                    ]
                  : []),
                ...(company.headerEmail || company.email
                  ? [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Email: ${company.headerEmail || company.email}`,
                            size: 17,
                            color: "444444",
                          }),
                        ],
                      }),
                    ]
                  : []),
                ...(company.gst
                  ? [
                      new Paragraph({
                        spacing: { before: 40 },
                        children: [
                          new TextRun({ text: `GSTIN: ${company.gst}`, bold: true, size: 17 }),
                        ],
                      }),
                    ]
                  : []),
              ],
            }),
            new TableCell({
              width: { size: 40, type: WidthType.PERCENTAGE },
              borders: noBorders(),
              verticalAlign: VerticalAlign.TOP,
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({ text: meta.title || "TAX INVOICE", bold: true, size: 34, color: "111111" }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 60 },
                  children: [
                    new TextRun({ text: `${docLabel} No: `, bold: true, size: 18 }),
                    new TextRun({ text: `${invoice.number || "-"}`, size: 18 }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({ text: `${docLabel} Date: `, bold: true, size: 18 }),
                    new TextRun({ text: `${invoice.date || "-"}`, size: 18 }),
                  ],
                }),
                ...(invoice.dueDate
                  ? [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `${meta.secondDateLabel || "Due Date"}: `, bold: true, size: 18 }),
                          new TextRun({ text: `${invoice.dueDate}`, size: 18 }),
                        ],
                      }),
                    ]
                  : []),
                ...(invoice.paymentTerms
                  ? [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `Payment Terms: `, bold: true, size: 18 }),
                          new TextRun({ text: `${invoice.paymentTerms}`, size: 18 }),
                        ],
                      }),
                    ]
                  : []),
                ...(invoice.poNumber
                  ? [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `${meta.referenceLabel || "PO Number"}: `, bold: true, size: 18 }),
                          new TextRun({ text: `${invoice.poNumber}`, size: 18 }),
                        ],
                      }),
                    ]
                  : []),
                ...(invoice.currency
                  ? [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({ text: `Currency: `, bold: true, size: 18 }),
                          new TextRun({ text: `${invoice.currency}`, size: 18 }),
                        ],
                      }),
                    ]
                  : []),
              ],
            }),
          ],
        }),
      ],
    });

    const topDivider = new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "000000" } },
      spacing: { before: 150, after: 200 },
    });

    /* ================= SOLD BY / BILL TO (bordered box, Flipkart style) ================= */

    function fieldLine(label, value, bold = false) {
      if (!value) return null;
      return new Paragraph({
        spacing: { after: 30 },
        children: [
          new TextRun({ text: `${label}: `, bold: true, size: 17 }),
          new TextRun({ text: String(value), size: 17, bold }),
        ],
      });
    }

    const soldByChildren = [
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "Sold By / From", bold: true, size: 19 })],
      }),
      fieldLine("Company", company.company),
      fieldLine("Name", company.name),
      fieldLine("Designation", company.designation),
      fieldLine("Service", company.service),
      fieldLine("Email", company.email),
      fieldLine("Phone", company.phone),
      fieldLine("Address", company.address),
    ].filter(Boolean);

    const billToChildren = [
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: meta.partyLabel || "Billing / Shipping To", bold: true, size: 19 })],
      }),
      fieldLine("Name", customer.name || "Customer Name", true),
      fieldLine("Email", customer.email),
      fieldLine("Phone", customer.phone),
      fieldLine("Address", customer.address),
    ].filter(Boolean);

    const soldToTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: gridBorders,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              margins: { top: 120, bottom: 120, left: 150, right: 150 },
              children: soldByChildren,
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              margins: { top: 120, bottom: 120, left: 150, right: 150 },
              children: billToChildren,
            }),
          ],
        }),
      ],
    });

    /* ================= ITEMS TABLE (grey header, black borders) ================= */

    function headerCell(text, widthPct, alignment = AlignmentType.LEFT) {
      return new TableCell({
        width: { size: widthPct, type: WidthType.PERCENTAGE },
        shading: { fill: "E5E5E5", type: ShadingType.CLEAR, color: "auto" },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment,
            children: [new TextRun({ text, bold: true, color: "111111", size: 18 })],
          }),
        ],
      });
    }

    function bodyCell(text, widthPct, alignment = AlignmentType.LEFT, bold = false) {
      return new TableCell({
        width: { size: widthPct, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment,
            children: [new TextRun({ text: String(text), size: 18, bold })],
          }),
        ],
      });
    }

    const itemsRows =
      items && items.length > 0
        ? items.map((item, index) => {
            const qty = Number(item.qty || 0);
            const price = Number(item.price || 0);
            return new TableRow({
              children: [
                bodyCell(index + 1, 8, AlignmentType.CENTER),
                bodyCell(item.description || "-", 42),
                bodyCell(qty, 15, AlignmentType.CENTER),
                bodyCell(`${symbol} ${price.toFixed(2)}`, 15, AlignmentType.RIGHT),
                bodyCell(`${symbol} ${(qty * price).toFixed(2)}`, 20, AlignmentType.RIGHT, true),
              ],
            });
          })
        : [
            new TableRow({
              children: [
                new TableCell({
                  columnSpan: 5,
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "No items added", size: 18 })],
                    }),
                  ],
                }),
              ],
            }),
          ];

    const itemsTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: gridBorders,
      rows: [
        new TableRow({
          children: [
            headerCell("Sr.No", 8, AlignmentType.CENTER),
            headerCell("Item Description", 42),
            headerCell("Qty", 15, AlignmentType.CENTER),
            headerCell("Price", 15, AlignmentType.RIGHT),
            headerCell("Total", 20, AlignmentType.RIGHT),
          ],
        }),
        ...itemsRows,
      ],
    });

    /* ================= TOTALS BOX (single clean bordered box) ================= */

    function totalRow(label, value, bold = false) {
      return new TableRow({
        children: [
          new TableCell({
            borders: noBorders(),
            margins: { top: 40, bottom: 40 },
            children: [new Paragraph({ children: [new TextRun({ text: label, size: 18, bold })] })],
          }),
          new TableCell({
            borders: noBorders(),
            margins: { top: 40, bottom: 40 },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: `${symbol} ${Number(value).toFixed(2)}`, size: 18, bold }),
                ],
              }),
            ],
          }),
        ],
      });
    }

    const totalsRows = [totalRow("Subtotal", subtotal)];
    if (Number(taxAmount) > 0) totalsRows.push(totalRow("Tax", taxAmount));
    if (Number(shippingAmount) > 0) totalsRows.push(totalRow("Shipping", shippingAmount));
    if (Number(discountAmount) > 0)
      totalsRows.push(totalRow("Discount", -Math.abs(discountAmount)));

    const grandTotalRow = new TableRow({
      children: [
        new TableCell({
          borders: noBorders(),
          margins: { top: 100 },
          children: [
            new Paragraph({
              border: { top: { style: BorderStyle.SINGLE, size: 8, color: "000000" } },
              spacing: { before: 60 },
              children: [new TextRun({ text: "Grand Total", bold: true, size: 21 })],
            }),
          ],
        }),
        new TableCell({
          borders: noBorders(),
          margins: { top: 100 },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              border: { top: { style: BorderStyle.SINGLE, size: 8, color: "000000" } },
              spacing: { before: 60 },
              children: [
                new TextRun({
                  text: `${symbol} ${Number(grandTotal).toFixed(2)}`,
                  bold: true,
                  size: 21,
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const totalsBox = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: noBorders(),
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 55, type: WidthType.PERCENTAGE },
              borders: noBorders(),
              children: [new Paragraph("")],
            }),
            new TableCell({
              width: { size: 45, type: WidthType.PERCENTAGE },
              borders: gridBorders,
              margins: { top: 150, bottom: 150, left: 200, right: 200 },
              children: [
                new Paragraph({
                  spacing: { after: 100 },
                  children: [new TextRun({ text: "Amount Summary", bold: true, size: 19 })],
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: noBorders(),
                  rows: [...totalsRows, grandTotalRow],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    /* ================= AMOUNT IN WORDS ================= */

    const amountInWordsPara = new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [
        new TextRun({ text: "Amount in Words: ", bold: true, size: 18 }),
        new TextRun({ text: amountInWords(grandTotal, currencyLabel), size: 18, italics: true }),
      ],
    });

    /* ================= PAYMENT DETAILS ================= */

    const paymentLines = [];
    if (company.accountName) paymentLines.push(`Account Name: ${company.accountName}`);
    if (company.bankName) paymentLines.push(`Bank: ${company.bankName}`);
    if (company.accountNumber) paymentLines.push(`Account Number: ${company.accountNumber}`);
    if (company.ifsc) paymentLines.push(`IFSC Code: ${company.ifsc}`);
    if (company.upi) paymentLines.push(`UPI: ${company.upi}`);

    const paymentSection =
      paymentLines.length > 0
        ? [
            new Paragraph({
              spacing: { before: 150, after: 100 },
              children: [new TextRun({ text: "Payment Details", bold: true, size: 21 })],
            }),
            ...paymentLines.map(
              (line) =>
                new Paragraph({
                  spacing: { after: 40 },
                  children: [new TextRun({ text: `• ${line}`, size: 18 })],
                })
            ),
          ]
        : [];

    const notesSection = notes
      ? [
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: "Notes", bold: true, size: 21 })],
          }),
          new Paragraph({ children: [new TextRun({ text: notes, size: 18 })] }),
        ]
      : [];

    const termsSection = terms
      ? [
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: "Terms & Conditions", bold: true, size: 21 })],
          }),
          new Paragraph({ children: [new TextRun({ text: terms, size: 18 })] }),
        ]
      : [];

    /* ================= SIGNATURE BLOCK ================= */

    // const signatureBlock = new Table({
    //   width: { size: 100, type: WidthType.PERCENTAGE },
    //   borders: noBorders(),
    //   rows: [
    //     new TableRow({
    //       children: [
    //         new TableCell({
    //           width: { size: 55, type: WidthType.PERCENTAGE },
    //           borders: noBorders(),
    //           children: [new Paragraph("")],
    //         }),
    //         new TableCell({
    //           width: { size: 45, type: WidthType.PERCENTAGE },
    //           borders: noBorders(),
    //           children: [
    //             new Paragraph({
    //               alignment: AlignmentType.RIGHT,
    //               spacing: { after: 60, before: 250 },
    //               children: [
    //                 new TextRun({
    //                   text: `For ${company.headerName || company.name || "Company Name"}`,
    //                   bold: true,
    //                   size: 18,
    //                 }),
    //               ],
    //             }),
    //             ...(signatureImg
    //               ? [
    //                   new Paragraph({
    //                     alignment: AlignmentType.RIGHT,
    //                     spacing: { after: 40 },
    //                     children: [
    //                       new ImageRun({
    //                         data: signatureImg.data,
    //                         type: signatureImg.type,
    //                         transformation: { width: 100, height: 45 },
    //                       }),
    //                     ],
    //                   }),
    //                 ]
    //               : [new Paragraph({ spacing: { after: 300 }, children: [] })]),
    //             new Paragraph({
    //               alignment: AlignmentType.RIGHT,
    //               border: { top: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
    //               spacing: { before: 40 },
    //               children: [new TextRun({ text: "Authorized Signatory", size: 16 })],
    //             }),
    //           ],
    //         }),
    //       ],
    //     }),
    //   ],
    // });

    // const footerNote = new Paragraph({
    //   alignment: AlignmentType.CENTER,
    //   spacing: { before: 300 },
    //   children: [
    //     new TextRun({
    //       text: "This is a computer-generated invoice and does not require a physical signature.",
    //       italics: true,
    //       size: 15,
    //       color: "555555",
    //     }),
    //   ],
    // });

       /* ================= BUILD DOCUMENT ================= */

    const doc = new Document({
      sections: [
        {
          properties: {
            page: { margin: { top: 700, bottom: 700, left: 700, right: 700 } },
          },
          children: [
            topBlock,
            topDivider,
            soldToTable,
            new Paragraph({ spacing: { after: 200 }, children: [] }),
            itemsTable,
            new Paragraph({ spacing: { after: 100 }, children: [] }),
            totalsBox,
            amountInWordsPara,
            ...paymentSection,
            ...notesSection,
            ...termsSection,
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${invoice.number || "invoice"}.docx`);
  };

  return (
    <button
      onClick={downloadWord}
      className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
    >
      Download Word
    </button>
  );
}