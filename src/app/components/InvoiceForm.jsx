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
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      />
    </div>
  );
}

  return (
    <>
<div className="mt-12 flex items-center justify-center px-6  via-white to-blue-50 relative overflow-hidden">

  {/* Background Blobs */}
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl"></div>

  <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center z-10">

    {/* LEFT SIDE */}
    <div>
      

      <h1 className="mt-5 text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
        Create <span className="text-blue-600">Professional</span><br />
        Invoices in Seconds
      </h1>

      <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
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
            className="px-4 py-2 bg-white/70 backdrop-blur border border-slate-200 rounded-full text-sm text-slate-700 shadow-sm hover:shadow transition"
          >
            {item}
          </span>
        ))}
      </div>

   
    </div>

   

  </div>
</div>

     {/* <h1 className="text-4xl mt-12 lg:text-5xl font-semibold text-center tracking-tight text-slate-900">
  Invoices made{" "}
  <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
    simple
  </span>
</h1>

<p className="mt-4 text-center text-slate-500 text-lg">
  Fast, clean and professional invoice generation tool
</p> */}
    <div className="max-w-6xl mx-auto mt-12">

      <div className="space-y-8">
        {/* Company */}
        {/* ================= Company Details ================= */}

       <div className="rounded-2xl border border-slate-200 bg-white p-8">

  {/* Top */}

  <div className="flex flex-col lg:flex-row justify-between gap-10">

    <div className="flex-1">
      <input
        placeholder="Invoice"
        className="w-full max-w-md text-4xl font-semibold border border-slate-300 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
      />
    </div>

    <div className="w-full lg:w-72">
  <LogoUpload
    invoiceData={invoiceData}
    setInvoiceData={setInvoiceData}
  />
</div>

  </div>

  <div className="my-10 border-t border-slate-200"></div>

  {/* From + Bill To */}

  <div className="grid lg:grid-cols-2 gap-12">

    {/* FROM */}

    <div>

      <h2 className="text-3xl font-semibold mb-8">
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

      <h2 className="text-3xl font-semibold mb-8">
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

</div>

        {/* Customer */}
        {/* ================= Customer Details ================= */}

        {/* <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Customer Name
                </label>

                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="John Doe"
                  value={customer.name}
                  onChange={(e) => updateCustomer("name", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="customer@email.com"
                  value={customer.email}
                  onChange={(e) => updateCustomer("email", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>

                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="+91 9876543210"
                  value={customer.phone}
                  onChange={(e) => updateCustomer("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Customer Address
              </label>

              <textarea
                rows={5}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none resize-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                placeholder="Enter complete customer address..."
                value={customer.address}
                onChange={(e) => updateCustomer("address", e.target.value)}
              />
            </div>
          </div>
        </div> */}

        {/* Invoice */}
        {/* ================= Invoice Details ================= */}

       <div className="mt-10 border-t border-slate-200 pt-10">

  <h2 className="mb-8 text-3xl font-semibold text-slate-800">
    Invoice Details
  </h2>

  <div className="grid gap-8 lg:grid-cols-2">

    {/* Left */}

    <div className="space-y-5">

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-slate-700">
          Number
        </label>

        <input
          type="text"
          placeholder="INV0001"
          value={invoice.number}
          onChange={(e) => updateInvoice("number", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-slate-700">
          Date
        </label>

        <input
          type="date"
          value={invoice.date}
          onChange={(e) => updateInvoice("date", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-slate-700">
          Due Date
        </label>

        <input
          type="date"
          value={invoice.dueDate}
          onChange={(e) => updateInvoice("dueDate", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

    </div>

    {/* Right */}

    <div className="space-y-5">

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-slate-700">
          Payment Terms
        </label>

        <input
          placeholder="On Receipt"
          value={invoice.paymentTerms}
          onChange={(e) =>
            updateInvoice("paymentTerms", e.target.value)
          }
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-slate-700">
          PO Number
        </label>

        <input
          placeholder="PO-001"
          value={invoice.poNumber}
          onChange={(e) =>
            updateInvoice("poNumber", e.target.value)
          }
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-[130px_1fr] items-center gap-5">
        <label className="font-medium text-slate-700">
          Currency
        </label>

        <select
          value={invoice.currency}
          onChange={(e) =>
            updateInvoice("currency", e.target.value)
          }
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>

    </div>

  </div>

</div>
        {/* Invoice Items */}
        {/* ================= Invoice Items ================= */}

      <div className="rounded-3xl w-full  border border-slate-200 bg-white  overflow-hidden">
  <InvoiceItems
    invoiceData={invoiceData}
    setInvoiceData={setInvoiceData}
  />
</div>

        {/* ================= Invoice Summary ================= */}

        <div className="rounded-3xl  bg-white  overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
    <div>
      <h2 className="text-2xl font-semibold text-slate-800">
        Charges & Adjustments
      </h2>
      <p className="text-sm text-slate-500">
        Tax, discount and shipping charges
      </p>
    </div>
  </div>

  {/* Content */}
  <div className="grid gap-6 p-8 md:grid-cols-3">

    {/* Tax */}
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <label className="mb-3 block text-sm font-medium text-slate-700">
        Tax (%)
      </label>

      <div className="relative">
        <input
          type="number"
          placeholder="18"
          value={invoiceData.tax}
          onChange={(e) =>
            setInvoiceData({
              ...invoiceData,
              tax: e.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-10 outline-none transition focus:border-blue-500"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          %
        </span>
      </div>
    </div>

    {/* Discount */}
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <label className="mb-3 block text-sm font-medium text-slate-700">
        Discount
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
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
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>
    </div>

    {/* Shipping */}
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <label className="mb-3 block text-sm font-medium text-slate-700">
        Shipping
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
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
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>
    </div>

  </div>

</div>

        {/* Banking */}

        {/* ================= Payment Information ================= */}

       <div className="rounded-2xl bg-white border border-slate-200  overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-8 py-6">
    <div className="flex items-center gap-4">
      {/* <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
        🏦
      </div> */}

      <div>
        <h2 className="text-2xl font-semibold text-slate-800">
          Payment Information
        </h2>

        {/* <p className="text-sm text-slate-500">
          Bank details for receiving payments
        </p> */}
      </div>
    </div>

    <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
      Optional
    </span>
  </div>

  {/* Form */}
  <div className="p-8">
    <div className="grid gap-6 md:grid-cols-2">

      {/* Bank Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Bank Name
        </label>

        <input
          type="text"
          placeholder="State Bank of India"
          value={invoiceData.company.bankName}
          onChange={(e) => updateCompany("bankName", e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Account Holder */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Account Holder
        </label>

        <input
          type="text"
          placeholder="John Doe"
          value={invoiceData.company.accountName}
          onChange={(e) => updateCompany("accountName", e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Account Number */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
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
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* IFSC */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          IFSC Code
        </label>

        <input
          type="text"
          placeholder="SBIN0001234"
          value={invoiceData.company.ifsc}
          onChange={(e) => updateCompany("ifsc", e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 uppercase outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* UPI */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          UPI ID
        </label>

        <input
          type="text"
          placeholder="yourname@upi"
          value={invoiceData.company.upi}
          onChange={(e) => updateCompany("upi", e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

    </div>

   

  </div>

</div>
        {/* Signature */}
        {/* ================= Signature ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white  overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
        ✍️
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Signature
        </h2>

        <p className="text-xs text-slate-500">
          Optional
        </p>
      </div>
    </div>

  </div>

  {/* Upload */}
  <div className="p-6">

    <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">

      <div>
        <p className="font-medium text-slate-700">
          Upload Signature
        </p>

        <p className="text-xs text-slate-500 mt-1">
          PNG/JPG recommended
        </p>
      </div>

      <SignatureUpload
        invoiceData={invoiceData}
        setInvoiceData={setInvoiceData}
      />

    </div>

  </div>

</div>

        {/* Download */}
        {/* ================= Action Bar ================= */}

        <div className=" bottom-5 z-50 mt-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center  px-8 py-5">
              {/* Right */}
              <DownloadPdf data={pdfData} />
                <DownloadWord data={invoiceData} />

            </div>
          </div>
        </div>
        </div>
      </>
  );
}
