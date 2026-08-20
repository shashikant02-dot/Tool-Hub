import InvoiceGenerator from "../invoice-generator/InvoiceGenerator";

export const metadata = {
  title: "Sales Order Generator Online - Create & Download PDF | ToolHub",
  description: "Create professional sales orders online for free and download as PDF instantly.",
  alternates: { canonical: "https://yourdomain.com/tools/sales-order-generator" },
};

export default function Page() {
  return <InvoiceGenerator docType="sales-order" />;
}