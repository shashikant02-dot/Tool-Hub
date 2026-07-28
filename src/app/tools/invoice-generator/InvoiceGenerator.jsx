"use client";

import InvoiceForm from "@/app/components/InvoiceForm";
import InvoicePreview from "@/app/components/InvoicePreview";
import SubscriptionPopup from "@/app/components/SubscriptionPopup";
import { useFreeUsage } from "@/app/context/FreeUsageContext";
import { useState } from "react";

const TOOL_NAME = "invoice-generator";

export default function InvoiceGenerator() {
  const [showPreview, setShowPreview] = useState(false);

  const { checkLimit, increaseUsage, isPro, showPopup, setShowPopup } =
    useFreeUsage();

  const [invoiceData, setInvoiceData] = useState({
    company: {
      logo: "",
      name: "",
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
      number: "#",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      paymentTerms: "",
      poNumber: "",
      currency: "INR",
    },
    items: [{ description: "", qty: 1, price: 0 }],
    tax: 0,
    discount: 0,
    shipping: 0,
    notes: "",
    terms: "",
  });

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
    0,
  );

  const taxAmount = subtotal * (Number(invoiceData.tax || 0) / 100);
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
  };

  // ✅ Runs only when the user actually generates/downloads the PDF —
  // filling the form and previewing stays unlimited.
  const handleGeneratePdf = () => {
    if (checkLimit(TOOL_NAME)) {
      setShowPopup(true);
      return false;
    }
    increaseUsage(TOOL_NAME);
    return true;
  };

  return (
    <main className="min-h-screen py-10 px-4">
      {showPreview ? (
        <InvoicePreview
          invoiceData={computedInvoice}
          back={() => setShowPreview(false)}
        />
      ) : (
        <InvoiceForm
          invoiceData={computedInvoice}
          setInvoiceData={setInvoiceData}
          previewInvoice={() => setShowPreview(true)}
          onGeneratePdf={handleGeneratePdf}
          isPro={isPro}
        />
      )}

      <SubscriptionPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </main>
  );
}