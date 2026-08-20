import InvoiceGenerator from "../invoice-generator/InvoiceGenerator";

export const metadata = {
  title: "Quotation Generator Online - Create & Download PDF Quotations | ToolHub",
  description: "Create professional price quotations online for free and download as PDF instantly.",
  alternates: { canonical: "https://yourdomain.com/tools/quotation-generator" },
};

export default function Page() {
  return <InvoiceGenerator docType="quotation" />;
}