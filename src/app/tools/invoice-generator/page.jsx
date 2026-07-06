import InvoiceGenerator from "./InvoiceGenerator";

export const metadata = {
  title: " Invoice Generator Online - Create & Download PDF Invoices | ToolHub",

  description:
    "Create professional invoices online for free. Add your company details, customer information, taxes, discounts and download high-quality PDF invoices instantly.",

  keywords: [
    "invoice generator",
    "free invoice generator",
    "online invoice generator",
    "invoice maker",
    "invoice creator",
    "gst invoice generator",
    "invoice template",
    "pdf invoice",
    "business invoice",
    "invoice software",
  ],

  alternates: {
    canonical: "https://yourdomain.com/tools/invoice-generator",
  },

  openGraph: {
    title: "Free Invoice Generator Online | Toolghar",
    description:
      "Generate professional invoices with GST, taxes, discounts and download them as PDF in seconds.",
    url: "https://yourdomain.com/tools/invoice-generator",
    siteName: "Toolghar",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invoice Generator Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator",
    description:
      "Create professional PDF invoices online for free.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <InvoiceGenerator />;
}