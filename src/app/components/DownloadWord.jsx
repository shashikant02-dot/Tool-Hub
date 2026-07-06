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
  TextRun,
  ShadingType,
  BorderStyle,
} from "docx";

export default function DownloadWord({ data }) {
  const downloadWord = async () => {
    const {
      company,
      customer,
      invoice,
      items,
      subtotal,
      taxAmount,
      shippingAmount,
      grandTotal,
    } = data;

    const doc = new Document({
      sections: [
        {
          children: [

            // ================= TOP HEADER (LIKE IMAGE) =================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
              },
              rows: [
                new TableRow({
                  children: [
                    // LEFT COMPANY INFO
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: company.name || "Company Name",
                              bold: true,
                              size: 32,
                              color: "2F5597",
                            }),
                          ],
                        }),
                        new Paragraph(company.address || "Street Address"),
                        new Paragraph(company.city || "City, ST ZIP"),
                        new Paragraph(`Phone: ${company.phone || "-"}`),
                      ],
                    }),

                    // RIGHT INVOICE TITLE
                    new TableCell({
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          children: [
                            new TextRun({
                              text: "INVOICE",
                              bold: true,
                              size: 48,
                              color: "2F5597",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph(""),

            // ================= INVOICE + DATE BOX =================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      shading: {
                        fill: "2F5597",
                        type: ShadingType.CLEAR,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "INVOICE #",
                              bold: true,
                              color: "FFFFFF",
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      shading: {
                        fill: "2F5597",
                        type: ShadingType.CLEAR,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          children: [
                            new TextRun({
                              text: "DATE",
                              bold: true,
                              color: "FFFFFF",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph(invoice.number?.toString() || "-"),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          text: invoice.date || "-",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph(""),

            // ================= BILL TO =================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      shading: { fill: "2F5597", type: ShadingType.CLEAR },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "BILL TO",
                              bold: true,
                              color: "FFFFFF",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph(`Name: ${customer.name}`),
            new Paragraph(`Company: ${customer.company || "-"}`),
            new Paragraph(`Address: ${customer.address}`),
            new Paragraph(`Email: ${customer.email}`),
            new Paragraph(`Phone: ${customer.phone}`),

            new Paragraph(""),

            // ================= ITEMS TABLE =================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                // HEADER ROW
                new TableRow({
                  children: ["DESCRIPTION", "QTY", "UNIT PRICE", "AMOUNT"].map(
                    (h) =>
                      new TableCell({
                        shading: { fill: "2F5597", type: ShadingType.CLEAR },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: h,
                                bold: true,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                        ],
                      })
                  ),
                }),

                // ITEMS
                ...items.map(
                  (item) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph(item.description)],
                        }),
                        new TableCell({
                          children: [new Paragraph(String(item.qty))],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(`₹${item.price}`),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(
                              `₹${item.qty * item.price}`
                            ),
                          ],
                        }),
                      ],
                    })
                ),
              ],
            }),

            new Paragraph(""),

            // ================= TOTAL BOX (RIGHT SIDE) =================
            new Table({
              width: { size: 50, type: WidthType.PERCENTAGE },
              alignment: AlignmentType.RIGHT,
              rows: [
                ["Subtotal", subtotal],
                ["Tax", taxAmount],
                ["Shipping", shippingAmount],
              ].map(
                ([label, value]) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph(label)],
                      }),
                      new TableCell({
                        children: [new Paragraph(`₹${value}`)],
                      }),
                    ],
                  })
              ),

              // GRAND TOTAL
              rows: [
                ...[
                  ["Subtotal", subtotal],
                  ["Tax", taxAmount],
                  ["Shipping", shippingAmount],
                ].map(
                  ([label, value]) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph(label)],
                        }),
                        new TableCell({
                          children: [new Paragraph(`₹${value}`)],
                        }),
                      ],
                    })
                ),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "TOTAL",
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `₹${grandTotal}`,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph(""),

            // ================= FOOTER =================
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Thank you for your business!",
                  bold: true,
                }),
              ],
            }),
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
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
    >
      Download Word
    </button>
  );
}