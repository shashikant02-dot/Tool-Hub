import InvoiceGenerator from "../invoice-generator/InvoiceGenerator";

export const metadata = {
  title: "Purchase Order Generator Online - Create & Download PDF | ToolHub",
  description: "Create professional purchase orders online for free and download as PDF instantly.",
  alternates: { canonical: "https://yourdomain.com/tools/purchase-order-generator" },
};

export default function Page() {
  return <InvoiceGenerator docType="purchase-order" />;
}