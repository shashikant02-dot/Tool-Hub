"use client";

export default function SignatureUpload({
  invoiceData,
  setInvoiceData,
}) {
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setInvoiceData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          signature: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Hidden File Input */}
      <input
        id="signature-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {/* Custom Button */}
      <label
        htmlFor="signature-upload"
        className="inline-flex cursor-pointer items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Upload Signature
      </label>

      {/* File Preview */}
      {invoiceData.company.signature && (
        <img
          src={invoiceData.company.signature}
          alt="Signature"
          className="mt-4 h-16 object-contain"
        />
      )}
    </div>
  );
}