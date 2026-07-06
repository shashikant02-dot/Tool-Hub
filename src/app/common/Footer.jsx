import Link from "next/link";
import {
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
  FaFilePdf,
  FaImage,
  FaCode,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="relative  overflow-hidden border-t border-white/10 bg-gradient-to-br from-black via-slate-950 to-black text-white">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* TOP SECTION */}
        <div className="grid gap-12 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              ToolHub
            </h2>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              Fast, secure and free online tools for PDFs, Images,
              SEO, Developers and everyday productivity tasks.
            </p>

            {/* Newsletter */}
            <div className="mt-8 flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none"
              />

              <button className="bg-white px-5 font-medium text-black transition hover:bg-slate-200">
                Subscribe
              </button>
            </div>

            {/* WhatsApp Support */}
            <button className="mt-5 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 font-medium text-white shadow-lg transition hover:scale-105">
              <FaWhatsapp />
              WhatsApp Support
            </button>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {[FaLinkedinIn, FaYoutube, FaFacebookF, RiTwitterXLine].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:text-black"
                  >
                    <Icon size={16} />
                  </button>
                )
              )}
            </div>
          </div>

          {/* PDF TOOLS */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <FaFilePdf className="text-red-400" />
              PDF Tools
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/jpg-to-pdf"
                  className="text-slate-400 transition hover:text-white"
                >
                  JPG to PDF
                </Link>
              </li>

              <li>
                <Link
                  href="/tools/merge-pdf"
                  className="text-slate-400 transition hover:text-white"
                >
                  Merge PDF
                </Link>
              </li>

              <li>
                <Link
                  href="/tools/split-pdf"
                  className="text-slate-400 transition hover:text-white"
                >
                  Split PDF
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition hover:text-white"
                >
                  PDF to Word
                </Link>
              </li>
            </ul>
          </div>

          {/* IMAGE TOOLS */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <FaImage className="text-blue-400" />
              Image Tools
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/image-compresor"
                  className="text-slate-400 transition hover:text-white"
                >
                  Compress Image
                </Link>
              </li>

              <li>
                <Link
                  href="/tools/image-converter"
                  className="text-slate-400 transition hover:text-white"
                >
                  Convert Image
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition hover:text-white"
                >
                  Resize Image
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition hover:text-white"
                >
                  Remove Background
                </Link>
              </li>
            </ul>
          </div>

          {/* DEV TOOLS */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <FaCode className="text-violet-400" />
              Developer Tools
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/csv-to-json"
                  className="text-slate-400 transition hover:text-white"
                >
                  CSV to JSON
                </Link>
              </li>

              <li>
                <Link
                  href="/tools/excel-json"
                  className="text-slate-400 transition hover:text-white"
                >
                  Excel to JSON
                </Link>
              </li>

              <li>
                <Link
                  href="/tools/image-to-code"
                  className="text-slate-400 transition hover:text-white"
                >
                  Image to Code
                </Link>
              </li>

              <li>
                <Link
                  href="/tools/handwriting-to-text"
                  className="text-slate-400 transition hover:text-white"
                >
                  Handwriting to Text
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* STATS */}
        {/* <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            ["100+", "Online Tools"],
            ["1M+", "Monthly Users"],
            ["100%", "Free Forever"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur"
            >
              <h3 className="text-4xl font-bold text-white">
                {value}
              </h3>

              <p className="mt-2 text-slate-400">
                {label}
              </p>
            </div>
          ))}
        </div> */}

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 ToolHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-slate-500 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="text-slate-500 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}