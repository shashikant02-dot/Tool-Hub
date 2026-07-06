export default function Boost() {
  const stats = [
    { value: "800+", label: "Formats Supported" },
    { value: "40K+", label: "Files Converted" },
    { value: "3K+", label: "Happy Users" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="py-18">
      <div className="max-w-7xl mx-auto px-6">
        
      

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {item.value}
                </h3>

                <p className="mt-4 text-lg font-medium text-slate-600">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}