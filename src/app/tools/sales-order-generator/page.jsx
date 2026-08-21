import InvoiceGenerator from "../invoice-generator/InvoiceGenerator";
import DocSeoSection from "@/app/components/DocSeoSection";
import { getDocSeo } from "@/app/utils/docSeoConfig";

export const metadata = {
  title: "Sales Order Generator Online - Create & Download PDF | ToolHub",
  description: "Create professional sales orders online for free and download as PDF instantly.",
  keywords: getDocSeo("sales-order").keywords,
  alternates: { canonical: "https://yourdomain.com/tools/sales-order-generator" },
};

export default function Page() {
  return (
    <>
      <InvoiceGenerator docType="sales-order" />
      {/* <DocSeoSection docType="sales-order" docLabel="Sales Order" /> */}
    </>
  );
}