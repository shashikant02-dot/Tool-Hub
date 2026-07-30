"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)]">
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

      <h2 className="relative z-10 text-2xl font-bold text-white mb-1">
        Send us a message
      </h2>
      <p className="relative z-10 text-gray-400 mb-8">
        Fill out the form below and we'll get back to you soon.
      </p>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">Subject</label>
          <input
            type="text"
            required
            placeholder="What is this about?"
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">Message</label>
          <textarea
            required
            rows={6}
            placeholder="Tell us more..."
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-3 outline-none transition-all resize-none focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)] disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <Send size={18} />
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-400 text-sm">
            <CheckCircle size={18} />
            Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm">
            <AlertCircle size={18} />
            Something went wrong. Please try again.
          </div>
        )}

      </form>

      {/* Corner Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
    </div>
  );
}