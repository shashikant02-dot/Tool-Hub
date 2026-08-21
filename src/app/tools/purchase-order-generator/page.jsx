import InvoiceGenerator from "../invoice-generator/InvoiceGenerator";
import DocSeoSection from "@/app/components/DocSeoSection";
import { getDocSeo } from "@/app/utils/docSeoConfig";

export const metadata = {
  title: "Purchase Order Generator Online - Create & Download PDF | ToolHub",
  description: "Create professional purchase orders online for free and download as PDF instantly.",
  keywords: getDocSeo("purchase-order").keywords,
  alternates: { canonical: "https://yourdomain.com/tools/purchase-order-generator" },
};

export default function Page() {
  return (
    <>
      <InvoiceGenerator docType="purchase-order" />
      {/* <DocSeoSection docType="purchase-order" docLabel="Purchase Order" /> */}
    </>
  );
}