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
        className="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)] hover:-translate-y-1"
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        {invoiceData.company.logo ? (
          <>
            <img
              src={invoiceData.company.logo}
              alt="Logo"
              className="relative z-10 max-h-24 max-w-24 object-contain transition duration-300 group-hover:scale-95"
            />

            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                Change Logo
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative z-10 flex items-center gap-3 transition duration-300 group-hover:opacity-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
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

              <span className="text-lg font-medium text-gray-300">
                + Logo
              </span>
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
              <span className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                + Add your logo
              </span>
            </div>
          </>
        )}

        {/* Corner Glow */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition group-hover:bg-purple-500/20" />
      </label>
    </>
  );
}