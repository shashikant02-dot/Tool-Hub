"use client";

export default function LogoUpload({
  invoiceData,
  setInvoiceData,
}) {
  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setInvoiceData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          logo: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        onChange={handleLogo}
        className="hidden"
      />

      <label
        htmlFor="logo-upload"
        className="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-slate-300 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
      >
        {invoiceData.company.logo ? (
          <>
            <img
              src={invoiceData.company.logo}
              alt="Logo"
              className="max-h-24 max-w-24 object-contain transition duration-300 group-hover:scale-95"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                Change Logo
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 transition duration-300 group-hover:opacity-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4-5 3 4 5-7 4 8H4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7h.01"
                />
              </svg>

              <span className="text-lg font-medium text-slate-600">
                + Logo
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                + Add your logo
              </span>
            </div>
          </>
        )}
      </label>
    </>
  );
}