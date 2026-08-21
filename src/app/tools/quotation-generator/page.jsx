import InvoiceGenerator from "../invoice-generator/InvoiceGenerator";
import DocSeoSection from "@/app/components/DocSeoSection";
import { getDocSeo } from "@/app/utils/docSeoConfig";

export const metadata = {
  title: "Quotation Generator Online - Create & Download PDF Quotations | ToolHub",
  description: "Create professional price quotations online for free and download as PDF instantly.",
  keywords: getDocSeo("quotation").keywords,
  alternates: { canonical: "https://yourdomain.com/tools/quotation-generator" },
};

export default function Page() {
  return (
    <>
      <InvoiceGenerator docType="quotation" />
      {/* <DocSeoSection docType="quotation" docLabel="Quotation" /> */}
    </>
  );
}