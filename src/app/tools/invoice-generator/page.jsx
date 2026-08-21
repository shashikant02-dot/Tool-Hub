import InvoiceGenerator from "./InvoiceGenerator";
import DocSeoSection from "@/app/components/DocSeoSection";
import { getDocSeo } from "@/app/utils/docSeoConfig";

export const metadata = {
  title: "Invoice Generator Online - Create & Download PDF Invoices | ToolHub",
  description: "Create professional invoices online for free and download as PDF instantly.",
  keywords: getDocSeo("invoice").keywords,
  alternates: { canonical: "https://yourdomain.com/tools/invoice-generator" },
};

export default function Page() {
  return (
    <>
      <InvoiceGenerator docType="invoice" />
      {/* <DocSeoSection docType="invoice" docLabel="Invoice" /> */}
    </>
  );
}