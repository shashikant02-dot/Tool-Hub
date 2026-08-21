// ✅ Har doc-type page ka apna unique SEO content — H1, subheading, intro
// paragraph, aur FAQ. Pehle sabhi 4 pages (/invoice-generator,
// /quotation-generator, /sales-order-generator, /purchase-order-generator)
// same hardcoded hero text dikhate the — Google isko duplicate content
// treat karta hai. Ab har page apna alag angle/content deta hai, isi config
// se — dono InvoiceForm.jsx (hero) aur page.jsx (intro + FAQ + schema) yahi
// single source of truth use karte hain.

export const DOC_SEO = {
  invoice: {
    heading: "Professional",
    headingLine2: "Invoices in Seconds",
    subheading:
      "Generate GST-ready invoices with automatic tax calculation, branding support, and instant PDF export — no complexity, just speed.",
    intro:
      "Our free invoice generator lets you create professional, GST-compliant invoices online in minutes. Add line items, apply CGST/SGST/IGST per item, include your logo and bank details, then download a print-ready PDF or Word file — no signup required.",
    keywords: [
      "invoice generator",
      "free invoice generator",
      "online invoice maker",
      "GST invoice generator",
      "create invoice online",
      "invoice template",
      "PDF invoice generator",
      "invoice generator India",
      "tax invoice generator",
      "download invoice PDF",
    ],
    faqs: [
      {
        q: "Is this invoice generator free?",
        a: "Yes, you can create and download invoices for free. Pro plans remove usage limits for high-volume billing.",
      },
      {
        q: "Can I add GST or multiple taxes to an invoice?",
        a: "Yes. Each item supports multiple taxes — CGST, SGST, IGST, UGST, or a custom tax — with its own rate.",
      },
      {
        q: "Can I download the invoice as PDF or Word?",
        a: "Both. Every invoice can be exported as a print-ready PDF or an editable .docx Word file.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes, the invoice editor and downloads work on desktop, tablet, and mobile browsers.",
      },
      {
        q: "Can I add my company logo and bank details?",
        a: "Yes. You can upload a logo, add a signature, and include bank/UPI payment details on the invoice.",
      },
    ],
  },
  quotation: {
    heading: "Professional",
    headingLine2: "Quotations in Seconds",
    subheading:
      "Send clients attractive, itemized price quotations with automatic tax and discount calculation, branding, and instant PDF export.",
    intro:
      "Create professional price quotations for clients in minutes. List your products or services, apply per-item taxes and discounts, set a validity date, and share a polished PDF or Word quotation that builds trust before a sale is confirmed.",
    keywords: [
      "quotation generator",
      "free quotation generator",
      "online quotation maker",
      "price quotation format",
      "quotation template",
      "create quotation online",
      "GST quotation generator",
      "PDF quotation generator",
      "business quotation maker",
    ],
    faqs: [
      {
        q: "Is this quotation generator free?",
        a: "Yes, creating and downloading quotations is free, with Pro plans available for higher usage.",
      },
      {
        q: "Can I set a validity date on the quotation?",
        a: "Yes. Each quotation has a 'Valid Until' field so clients know how long the pricing is good for.",
      },
      {
        q: "Can I convert a quotation into an invoice later?",
        a: "You can reuse the same company, customer, and item details to quickly create an invoice once the client accepts.",
      },
      {
        q: "Does it support discounts and multiple taxes?",
        a: "Yes, every line item supports discounts and multiple tax types like CGST, SGST, or IGST.",
      },
      {
        q: "Can I download the quotation as PDF or Word?",
        a: "Yes, both PDF and editable Word (.docx) formats are supported.",
      },
    ],
  },
  "sales-order": {
    heading: "Professional",
    headingLine2: "Sales Orders in Seconds",
    subheading:
      "Confirm customer orders with a clear, itemized sales order — automatic totals, tax breakdown, and instant PDF export.",
    intro:
      "Generate professional sales orders to confirm customer purchases before delivery. Add products or services, quantities, delivery dates, and payment terms, then export a clean PDF or Word document your customer can reference alongside their purchase.",
    keywords: [
      "sales order generator",
      "free sales order generator",
      "online sales order maker",
      "sales order format",
      "sales order template",
      "create sales order online",
      "PDF sales order generator",
      "customer order form generator",
    ],
    faqs: [
      {
        q: "Is this sales order generator free?",
        a: "Yes, you can create and download sales orders for free.",
      },
      {
        q: "What's the difference between a sales order and an invoice?",
        a: "A sales order confirms a customer's purchase before delivery and billing, while an invoice is the formal bill requesting payment.",
      },
      {
        q: "Can I add a delivery date?",
        a: "Yes, each sales order includes a delivery date field along with the order date.",
      },
      {
        q: "Can I include tax and shipping charges?",
        a: "Yes, sales orders support per-item taxes, shipping charges, and discounts, just like invoices.",
      },
      {
        q: "Can I download it as PDF or Word?",
        a: "Yes, both formats are supported for sharing or printing.",
      },
    ],
  },
  "purchase-order": {
    heading: "Professional",
    headingLine2: "Purchase Orders in Seconds",
    subheading:
      "Send suppliers a clear, professional purchase order — itemized quantities, rates, taxes, and instant PDF export.",
    intro:
      "Create professional purchase orders to formally request goods or services from a vendor. Add supplier details, item quantities and rates, applicable taxes, and expected delivery dates, then download a polished PDF or Word purchase order to send directly to your supplier.",
    keywords: [
      "purchase order generator",
      "free purchase order generator",
      "online purchase order maker",
      "PO generator online",
      "purchase order template",
      "create purchase order online",
      "PDF purchase order generator",
      "vendor purchase order format",
    ],
    faqs: [
      {
        q: "Is this purchase order generator free?",
        a: "Yes, creating and downloading purchase orders is free.",
      },
      {
        q: "Can I add supplier/vendor details separately from my company details?",
        a: "Yes, the form has a dedicated Vendor / Supplier section separate from your own company information.",
      },
      {
        q: "Can I specify an expected delivery date?",
        a: "Yes, each purchase order includes an expected delivery date field.",
      },
      {
        q: "Does it support tax and reference numbers?",
        a: "Yes, you can add per-item taxes and a reference number for internal tracking.",
      },
      {
        q: "Can I download the purchase order as PDF or Word?",
        a: "Yes, both PDF and Word (.docx) downloads are supported.",
      },
    ],
  },
};

export function getDocSeo(docType) {
  return DOC_SEO[docType] || DOC_SEO.invoice;
}
