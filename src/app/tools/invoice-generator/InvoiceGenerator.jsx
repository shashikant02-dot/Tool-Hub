"use client";

import InvoiceForm from "@/app/components/InvoiceForm";
import InvoicePreview from "@/app/components/InvoicePreview";
import SubscriptionPopup from "@/app/components/SubscriptionPopup";
import { useFreeUsage } from "@/app/context/FreeUsageContext";
import { useState } from "react";

export const DOC_TYPES = {
  invoice: {
    label: "Invoice",
    title: "INVOICE",
    partyLabel: "Bill To",
    numberPrefix: "INV-",
    secondDateLabel: "Due Date",
    referenceLabel: "PO Number",
  },
  quotation: {
    label: "Quotation",
    title: "QUOTATION",
    partyLabel: "Quotation For",
    numberPrefix: "QUO-",
    secondDateLabel: "Valid Until",
    referenceLabel: "Reference No.",
  },
  "sales-order": {
    label: "Sales Order",
    title: "SALES ORDER",
    partyLabel: "Ship To",
    numberPrefix: "SO-",
    secondDateLabel: "Delivery Date",
    referenceLabel: "Customer PO Ref.",
  },
  "purchase-order": {
    label: "Purchase Order",
    title: "PURCHASE ORDER",
    partyLabel: "Vendor / Supplier",
    numberPrefix: "PO-",
    secondDateLabel: "Expected Delivery",
    referenceLabel: "Reference No.",
  },
};

// ✅ Har doc type ke liye ek fresh, alag-alag blank record
function makeBlankData(type) {
  return {
    company: {
      logo: "",
      headerName: "",
      headerAddress: "",
      headerPhone: "",
      headerEmail: "",
      name: "",
      designation: "",
      company: "",
      service: "",
      address: "",
      email: "",
      phone: "",
      gst: "",
      signature: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      ifsc: "",
      upi: "",
    },
    customer: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    invoice: {
      number: DOC_TYPES[type].numberPrefix,
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      paymentTerms: "",
      poNumber: "",
      currency: "INR",
    },
    items: [{ description: "", hsn: "", qty: 1, price: 0, taxRate: 18 }],    tax: 0,
    notes: "",
    terms: "",
  };
}

export default function InvoiceGenerator() {
  const [docType, setDocType] = useState("invoice");
  const docMeta = DOC_TYPES[docType] || DOC_TYPES.invoice;
  const TOOL_NAME = `${docType}-generator`;
  const [showPreview, setShowPreview] = useState(false);

  const { checkLimit, increaseUsage, isPro, showPopup, setShowPopup } =
    useFreeUsage();

  // ✅ 4 alag records, ek hi state object ke andar keys se separated
  const [allData, setAllData] = useState(() => ({
    invoice: makeBlankData("invoice"),
    quotation: makeBlankData("quotation"),
    "sales-order": makeBlankData("sales-order"),
    "purchase-order": makeBlankData("purchase-order"),
  }));

  const invoiceData = allData[docType];

  const setInvoiceData = (updater) => {
    setAllData((prev) => ({
      ...prev,
      [docType]:
        typeof updater === "function" ? updater(prev[docType]) : updater,
    }));
  };

  const handleDocTypeChange = (newType) => {
    if (newType === docType) return;
    setDocType(newType);
  };

    const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
    0,
  );

  // ✅ Ab tax flat % nahi — har item ka apna taxRate hai
  const taxAmount = invoiceData.items.reduce((sum, item) => {
    const amount = Number(item.qty || 0) * Number(item.price || 0);
    return sum + amount * (Number(item.taxRate || 0) / 100);
  }, 0);

  const discountAmount = Number(invoiceData.discount || 0);
  const shippingAmount = Number(invoiceData.shipping || 0);
  const grandTotal = subtotal + taxAmount + shippingAmount - discountAmount;

  const computedInvoice = {
    ...invoiceData,
    subtotal,
    taxAmount,
    discountAmount,
    shippingAmount,
    grandTotal,
    docType,
    docMeta,
  };

  const handleGeneratePdf = () => {
    if (checkLimit(TOOL_NAME)) {
      setShowPopup(true);
      return false;
    }
    increaseUsage(TOOL_NAME);
    return true;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] py-10 px-4">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      <div className="relative z-10">
        {showPreview ? (
          <InvoicePreview
            invoiceData={computedInvoice}
            docType={docType}
            docMeta={docMeta}
            back={() => setShowPreview(false)}
          />
        ) : (
          <InvoiceForm
            invoiceData={computedInvoice}
            setInvoiceData={setInvoiceData}
            previewInvoice={() => setShowPreview(true)}
            onGeneratePdf={handleGeneratePdf}
            isPro={isPro}
            docType={docType}
            docMeta={docMeta}
            docTypeOptions={DOC_TYPES}
            onDocTypeChange={handleDocTypeChange}
          />
        )}
      </div>

      <SubscriptionPopup open={showPopup} onClose={() => setShowPopup(false)} />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />
    </main>
  );
}