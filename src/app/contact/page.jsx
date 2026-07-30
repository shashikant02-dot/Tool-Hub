import ContactForm from "@/app/components/ContactForm";
import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Toolghar",
  description:
    "Get in touch with Toolghar. Have a question, feedback, or found a bug? Send us a message and we'll get back to you.",
  alternates: {
    canonical: "https://yourdomain.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-center">

      {/* ================= BACKGROUND (same as Image-to-Code) ================= */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_10%,#24103d_0%,#090713_35%,#030303_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-100px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-200px] top-[40%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-200px] top-[55%] -z-10 h-[450px] w-[450px] rounded-full bg-pink-700/10 blur-[150px]" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 mt-28 px-6 pb-16">
        <div className="mx-auto max-w-5xl">

          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-sm backdrop-blur-md">
            <span className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200">
              💬 We're here to help
            </span>
            <span className="border-l border-white/10 px-4 py-2 text-sm text-gray-400">
              Usually reply within 24h
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Get in{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="mx-auto my-12 max-w-4xl text-center text-xl leading-8 text-gray-400 md:text-2xl">
            Have a <b className="text-gray-200">question</b>, found a{" "}
            <b className="text-gray-200">bug</b>, or want to share{" "}
            <b className="text-gray-200">feedback</b>? Send us a message and
            we'll get back to you as soon as we can.
          </p>

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative z-10 px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_1.4fr] text-left">

          {/* LEFT: Contact Info Cards */}
          <div className="space-y-5">

            {[
              {
                icon: Mail,
                title: "Email us",
                value: "support@toolghar.com",
                desc: "Send us an email anytime.",
              },
              {
                icon: Phone,
                title: "Call us",
                value: "+91 9876543210",
                desc: "Mon-Fri, 10am to 6pm IST.",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Mohali, India",
                desc: "Fully remote, online-first team.",
              },
              {
                icon: Clock,
                title: "Response time",
                value: "Within 24 hours",
                desc: "We reply to every message.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white transition group-hover:text-indigo-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 font-medium mt-0.5">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner Glow */}
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
                </div>
              );
            })}

          </div>

          {/* RIGHT: Contact Form */}
          <ContactForm />

        </div>
      </section>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />
    </main>
  );
}