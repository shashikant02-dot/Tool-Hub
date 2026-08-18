"use client";

import DownloadPdf from "./DownloadPdf";
import DownloadWord from "./DownloadWord";
import InvoiceItems from "./InvoiceItems";
import LogoUpload from "./LogoUpload";
import SignatureUpload from "./SignatureUpload";

export default function InvoiceForm({
  invoiceData,
  setInvoiceData,
  previewInvoice,
  onGeneratePdf,
  isPro,
}) {
  const { company, customer, invoice } = invoiceData;

  const updateCompany = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const updateCustomer = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const updateInvoice = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        [field]: value,
      },
    }));
  };
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
    0,
  );

  const taxAmount = subtotal * (Number(invoiceData.tax || 0) / 100);

  const shippingAmount = Number(invoiceData.shipping || 0);

  const discountAmount = Number(invoiceData.discount || 0);

  const grandTotal = subtotal + taxAmount + shippingAmount - discountAmount;

  const pdfData = {
    ...invoiceData,
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    grandTotal,
  };
  function Input({ label, className = "", ...props }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-4">
      <label className="text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500 ${className}`}
      />
    </div>
  );
}

  return (
    <>
<div className="mt-12 flex items-center justify-center px-6 relative overflow-hidden">

  {/* Background Blobs */}
  <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-3xl"></div>
  <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl"></div>

  <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center z-10">

    {/* LEFT SIDE */}
    <div>
      

      <h1 className="mt-5 text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
        Create <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Professional</span><br />
        Invoices in Seconds
      </h1>

      <p className="mt-6 text-lg text-gray-400 max-w-lg leading-relaxed">
        Generate beautiful invoices with automatic calculations, branding support,
        and instant PDF export — no complexity, just speed.
      </p>

      {/* FEATURES */}
      <div className="mt-8 flex flex-wrap gap-3">
        {[
          "⚡ Auto Calculation",
          "📄 PDF Export",
          "🧾 Word Export",
          "🔒 Secure & Private",
        ].map((item, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-white/[0.04] backdrop-blur border border-white/10 rounded-full text-sm text-gray-300 shadow-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.08]"
          >
            {item}
          </span>
        ))}
      </div>

   
    </div>

   

  </div>
</div>

    <div className="max-w-6xl mx-auto mt-12">

      <div className="space-y-8">
        {/* Company */}
        {/* ================= Company Details ================= */}

       <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">

  {/* Hover Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

  {/* Top */}

  <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">

    <div className="flex-1">
      <input
        placeholder="Invoice"
        className="w-full max-w-md text-4xl font-semibold border border-white/10 bg-white/[0.03] text-white rounded-xl px-5 py-4 outline-none transition-all focus:border-indigo-500/60 placeholder:text-gray-500"
      />
    </div>

    <div className="w-full lg:w-72">
  <LogoUpload
    invoiceData={invoiceData}
    setInvoiceData={setInvoiceData}
  />
</div>

  </div>

  <div className="relative z-10 my-10 border-t border-white/10"></div>

  {/* From + Bill To */}

  <div className="relative z-10 grid lg:grid-cols-2 gap-12">

    {/* FROM */}

    <div>

      <h2 className="text-3xl font-semibold mb-8 text-white">
        From
      </h2>

      <div className="space-y-5">

        <Input
          label="Name"
          placeholder="Business Name"
          value={company.name}
          onChange={(e)=>updateCompany("name",e.target.value)}
        />

        <Input
          label="Email"
          placeholder="name@business.com"
          value={company.email}
          onChange={(e)=>updateCompany("email",e.target.value)}
        />

        <Input
          label="Address"
          placeholder="Street Address"
          value={company.address}
          onChange={(e)=>updateCompany("address",e.target.value)}
        />

        <Input
          label="Phone"
          placeholder="+91 9876543210"
          value={company.phone}
          onChange={(e)=>updateCompany("phone",e.target.value)}
        />

        <Input
          label="GST"
          placeholder="22AAAAA0000A1Z5"
          value={company.gst}
          onChange={(e)=>updateCompany("gst",e.target.value)}
        />

      </div>

    </div>

    {/* BILL TO */}

    <div>

      <h2 className="text-3xl font-semibold mb-8 text-white">
        Bill To
      </h2>

      <div className="space-y-5">

        <Input
          label="Name"
          placeholder="Client Name"
          value={customer.name}
          onChange={(e)=>updateCustomer("name",e.target.value)}
        />

        <Input
          label="Email"
          placeholder="client@email.com"
          value={customer.email}
          onChange={(e)=>updateCustomer("email",e.target.value)}
        />

        <Input
          label="Address"
          placeholder="Street Address"
          value={customer.address}
          onChange={(e)=>updateCustomer("address",e.target.value)}
        />

        <Input
          label="Phone"
          placeholder="+91 9876543210"
          value={customer.phone}
          onChange={(e)=>updateCustomer("phone",e.target.value)}
        />

      </div>

    </div>

  </div>

  {/* Corner Glow */}
  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

</div>

        {/* Invoice */}
        {/* ================= Invoice Details ================= */}

       <div className="mt-10 border-t border-white/10 pt-10">

  <h2 className="mb-8 text-3xl font-semibold text-white">
    Invoice Details
  </h2>

  <div className="grid gap-8 lg:grid-cols-2">

    {/* Left */}

    <div className="space-y-5">

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-gray-300">
          Number
        </label>

        <input
          type="text"
          placeholder="INV0001"
          value={invoice.number}
          onChange={(e) => updateInvoice("number", e.target.value)}
          className="rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-gray-300">
          Date
        </label>

        <input
          type="date"
          value={invoice.date}
          onChange={(e) => updateInvoice("date", e.target.value)}
          className="rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 [color-scheme:dark]"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-gray-300">
          Due Date
        </label>

        <input
          type="date"
          value={invoice.dueDate}
          onChange={(e) => updateInvoice("dueDate", e.target.value)}
          className="rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 [color-scheme:dark]"
        />
      </div>

    </div>

    {/* Right */}

    <div className="space-y-5">

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-gray-300">
          Payment Terms
        </label>

        <input
          placeholder="On Receipt"
          value={invoice.paymentTerms}
          onChange={(e) =>
            updateInvoice("paymentTerms", e.target.value)
          }
          className="rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-gray-300">
          PO Number
        </label>

        <input
          placeholder="PO-001"
          value={invoice.poNumber}
          onChange={(e) =>
            updateInvoice("poNumber", e.target.value)
          }
          className="rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-gray-300">
          Currency
        </label>

       <div className="relative">
  <select
    value={invoice.currency}
    onChange={(e) => updateInvoice("currency", e.target.value)}
    className="w-full appearance-none rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 pr-10 outline-none transition-all cursor-pointer focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 hover:border-white/20"
  >
    <option className="bg-[#0a0a0a]" value="INR">INR</option>
    <option className="bg-[#0a0a0a]" value="USD">USD</option>
    <option className="bg-[#0a0a0a]" value="EUR">EUR</option>
    <option className="bg-[#0a0a0a]" value="GBP">GBP</option>
    <option className="bg-[#0a0a0a]" value="AUD">AUD</option>
    <option className="bg-[#0a0a0a]" value="CAD">CAD</option>
    <option className="bg-[#0a0a0a]" value="AED">AED</option>
    <option className="bg-[#0a0a0a]" value="SAR">SAR</option>
    <option className="bg-[#0a0a0a]" value="SGD">SGD</option>
    <option className="bg-[#0a0a0a]" value="JPY">JPY</option>
    {/* <option className="bg-[#0a0a0a]" value="CNY">CNY</option>
    <option className="bg-[#0a0a0a]" value="ZAR">ZAR</option>
    <option className="bg-[#0a0a0a]" value="PKR">PKR</option>
    <option className="bg-[#0a0a0a]" value="BDT">BDT</option>
    <option className="bg-[#0a0a0a]" value="NPR">NPR</option>
    <option className="bg-[#0a0a0a]" value="LKR">LKR</option> */}
  </select>

  <svg
    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</div>
      </div>

    </div>

  </div>

</div>
        {/* Invoice Items */}
        {/* ================= Invoice Items ================= */}

      <div className="group relative overflow-hidden rounded-3xl w-full border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100 pointer-events-none" />
  <div className="relative z-10">
    
    <InvoiceItems
      invoiceData={invoiceData}
      setInvoiceData={setInvoiceData}
    />
    
  </div>
</div>

        {/* ================= Invoice Summary ================= */}

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

  {/* Header */}
  {/* <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-8 py-5">
    <div>
      <h2 className="text-2xl font-semibold text-white">
        Charges & Adjustments
      </h2>
      <p className="text-sm text-gray-400">
        Tax, discount and shipping charges
      </p>
    </div>
  </div> */}

  {/* Content */}
  {/* <div className="relative z-10 grid gap-6 p-8 md:grid-cols-3"> */}

   

    {/* Discount */}
    {/* <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Discount
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          ₹
        </span>

        <input
          type="number"
          placeholder="0"
          value={invoiceData.discount}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              discount: e.target.value,
            })
          }
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white py-3 pl-9 pr-4 outline-none transition focus:border-indigo-500/60 placeholder:text-gray-500"
        />
      </div>
    </div> */}

    {/* Shipping */}
    {/* <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Shipping
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          ₹
        </span>

        <input
          type="number"
          placeholder="0"
          value={invoiceData.shipping}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              shipping: e.target.value,
            })
          }
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white py-3 pl-9 pr-4 outline-none transition focus:border-indigo-500/60 placeholder:text-gray-500"
        />
      </div>
    </div> */}

  {/* </div> */}

  {/* Corner Glow */}
  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

</div>

        {/* Banking */}

        {/* ================= Payment Information ================= */}

       <div className="group relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

  {/* Header */}
  <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-8 py-6">
    <div className="flex items-center gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Payment Information
        </h2>
      </div>
    </div>

    <span className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-1 text-sm font-medium text-white shadow-lg">
      Optional
    </span>
  </div>

  {/* Form */}
  <div className="relative z-10 p-8">
    <div className="grid gap-6 md:grid-cols-2">

      {/* Bank Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Bank Name
        </label>

        <input
          type="text"
          placeholder="State Bank of India"
          value={invoiceData.company.bankName}
          onChange={(e) => updateCompany("bankName", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-500"
        />
      </div>

      {/* Account Holder */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Account Holder
        </label>

        <input
          type="text"
          placeholder="John Doe"
          value={invoiceData.company.accountName}
          onChange={(e) => updateCompany("accountName", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-500"
        />
      </div>

      {/* Account Number */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Account Number
        </label>

        <input
          type="text"
          inputMode="numeric"
          placeholder="123456789012"
          value={invoiceData.company.accountNumber}
          onChange={(e) =>
            updateCompany("accountNumber", e.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-500"
        />
      </div>

      {/* IFSC */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          IFSC Code
        </label>

        <input
          type="text"
          placeholder="SBIN0001234"
          value={invoiceData.company.ifsc}
          onChange={(e) => updateCompany("ifsc", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white px-4 py-3 uppercase outline-none transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-500"
        />
      </div>

      {/* UPI */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          UPI ID
        </label>

        <input
          type="text"
          placeholder="yourname@upi"
          value={invoiceData.company.upi}
          onChange={(e) => updateCompany("upi", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-500"
        />
      </div>

    </div>

  </div>

  {/* Corner Glow */}
  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

</div>
        {/* Signature */}
        {/* ================= Signature ================= */}

      {/* <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

  {/* Header */}
  {/* <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">

    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
        ✍️
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Signature
        </h2>

        <p className="text-xs text-gray-400">
          Optional
        </p>
      </div>
    </div>

  </div> */} 

  {/* Upload */}
  {/* <div className="relative z-10 p-6">

    <div className="flex items-center justify-between rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5">

      <div>
        <p className="font-medium text-gray-200">
          Upload Signature
        </p>

        <p className="text-xs text-gray-500 mt-1">
          PNG/JPG recommended
        </p>
      </div>

      <SignatureUpload
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />

    </div>

  </div> */}

  {/* Corner Glow */}
  {/* <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

</div> */}

        {/* Download */}
        {/* ================= Action Bar ================= */}

      <div className=" bottom-5 z-50 mt-10">
    <div className="flex flex-col gap-5 md:flex-row md:items-center px-8 py-5">
      <DownloadPdf data={pdfData} onUse={onGeneratePdf} isPro={isPro} />
      <DownloadWord data={invoiceData} onUse={onGeneratePdf} isPro={isPro} />
    </div>
  </div>
        </div>
        </div>
      </>
  );
}