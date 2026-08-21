// ✅ Server component (no "use client") — intro paragraph + FAQ block +
// FAQPage JSON-LD schema, unique per doc type. Rendered inside each
// page.jsx so crawlers see distinct, indexable content per URL instead
// of the same generic tool UI on all 4 pages.
import { getDocSeo } from "@/app/utils/docSeoConfig";

export default function DocSeoSection({ docType, docLabel }) {
  const seo = getDocSeo(docType);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  // ✅ Bug fix: pehle is section ka apna background nahi tha, isliye yeh
  // page ke default light background (globals.css: #eff6ff) pe render hota
  // tha — aur "text-white" headings/questions us light background pe
  // invisible ho jaate the (white-on-white). Ab dark background khud diya
  // hai taaki InvoiceGenerator ke dark theme ke saath seamlessly jude aur
  // text hamesha visible rahe.
  return (
    <section className="relative z-10 bg-[#030303] px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <h2 className="text-2xl font-semibold text-white mb-4">
          About the {docLabel} Generator
        </h2>
        <p className="leading-relaxed text-gray-400">{seo.intro}</p>

        <h2 className="mt-12 text-2xl font-semibold text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {seo.faqs.map((f, i) => (
            <div key={i} className="border-b border-white/10 pb-5">
              <h3 className="text-lg font-medium text-white">{f.q}</h3>
              <p className="mt-2 text-gray-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}