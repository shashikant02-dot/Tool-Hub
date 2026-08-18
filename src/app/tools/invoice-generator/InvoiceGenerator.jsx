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
        // Company Header Details
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
      number: "#",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      paymentTerms: "",
      poNumber: "",
      currency: "INR",
    },
    items: [{ description: "", qty: 1, price: 0 }],
    tax: 0,
    // discount: 0,
    // shipping: 0,
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
    <main className="relative min-h-screen overflow-hidden bg-[#030303] py-10 px-4">

      {/* ================= BACKGROUND (same as Image-to-Code) ================= */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      <div className="relative z-10">
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
      </div>

      <SubscriptionPopup open={showPopup} onClose={() => setShowPopup(false)} />

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

    </main>
  );
}