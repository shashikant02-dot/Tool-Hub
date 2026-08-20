import InvoiceGenerator from "./InvoiceGenerator";

export const metadata = {
  title: "Invoice Generator Online - Create & Download PDF Invoices | ToolHub",
  description: "Create professional invoices online for free and download as PDF instantly.",
  alternates: { canonical: "https://yourdomain.com/tools/invoice-generator" },
};

export default function Page() {
  return <InvoiceGenerator docType="invoice" />;
}