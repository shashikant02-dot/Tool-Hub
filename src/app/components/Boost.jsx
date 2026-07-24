export default function Boost() {
  const stats = [
    { value: "800+", label: "Formats Supported" },
    { value: "40K+", label: "Files Converted" },
    { value: "3K+", label: "Happy Users" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <section className="relative w-full py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            Built for productivity
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Everything you need.
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}All in one place.
            </span>
          </h2>

        </div>


        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-purple-900/20"
            >

              {/* Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />


              {/* Number */}
              <h3 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">

                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {item.value}
                </span>

              </h3>


              {/* Label */}
              <p className="relative mt-4 text-sm font-medium text-gray-400">
                {item.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}