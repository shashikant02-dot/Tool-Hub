import FeaturesGrid from "@/app/components/FeatureGrid";
import SplitPdf from "@/app/components/SplitPdf";
import React from "react";
import {
  Move,
  Files,
  Hash,
  FileEdit,
  ShieldCheck,
  Infinity,
} from "lucide-react";
import PdfBio from "@/app/components/PdfBio";
import SplitHowItWorks from "@/app/components/SplitWorkshow";

export const metadata = {
  title: "Split PDF Online Free - Extract & Separate PDF Pages | Toolghar",

  description:
    "Split PDF files online for free. Extract pages, split by page range, every N pages, or save individual pages instantly. Secure browser-based PDF splitter with no uploads.",

  keywords: [
    "split pdf",
    "split pdf online",
    "pdf splitter",
    "extract pdf pages",
    "separate pdf pages",
    "split pdf free",
    "split pdf by page range",
    "extract pages from pdf",
    "pdf page extractor",
    "online pdf splitter",
  ],

  alternates: {
    canonical: "https://yourdomain.com/tools/split-pdf",
  },
}


export default function Page() {
  const features = [
    {
      icon: Move,
      title: "Split by custom page range",
      description:
        "Type the ranges that match your document, such as 1-5, 6-10, and 11-20, and each range becomes its own output file. Ideal when the natural breaks fall at uneven places.",
    },
    {
      icon: Files,
      title: "Split every N pages",
      description:
        "Tell the tool to cut after every N pages and it divides the document into equal chunks automatically — perfect for booklets, batches, or anything with a regular structure.",
    },
    {
      icon: Hash,
      title: "Extract pages individually",
      description:
        "Burst the PDF so every page is saved as a separate one-page file. Handy when you need each page on its own for filing, signing, or sharing.",
    },
    {
      icon: FileEdit,
      title: "Pull a custom set into one file",
      description:
        "Hand-pick pages from anywhere in the document and gather them into a single extract. Non-adjacent pages are fine — collect pages 2, 7, and 15 into one tidy output.",
    },
    {
      icon: ShieldCheck,
      title: "Visual page grid selection",
      description:
        "See thumbnails of every page and click to choose them, or use range and odd/even shortcuts. The grid keeps you oriented so you split exactly where you mean to.",
    },
    {
      icon: Infinity,
      title: "Preview, then download all as a ZIP",
      description:
        "Review each output before saving, download any single file on its own, or grab everything at once in a single ZIP archive. All of it happens on your device.",
    },
  ];
  return (
    <>
      <section className="mt-20">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
  {/* Heading */}
  <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl">
    Split PDF
  </h1>

  {/* Description */}
  <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl lg:text-2xl">
    Break one PDF into the smaller documents you actually need. Split by
    page range, every few pages, single pages, or a custom selection,
    preview each result, and download them in one go.
  </p>
</div>
        <SplitPdf />
        <FeaturesGrid features={features} />
      </section>
      <PdfBio
        title="Why splitting in the browser is the better way"
        para1="The first benefit is confidentiality. A statement or contract that is divided locally is never exposed to an outside server, so the pages stay on the hardware you control. For documents tied to finance, health, or legal matters, that structural privacy is frequently what decides whether an online tool is allowed at all."
        para2="The second is responsiveness. There is no upload of the source file and no wait for the server to hand back your pieces; the bytes already live on your device, so the only constraint is how fast your machine can copy pages into new documents. Even a long report separates into parts in moments."
        para3="The third is accuracy. Because you can name your ranges, watch the page grid, and preview each resulting file, you confirm the cut is right before a single byte is saved. That visual check heads off the everyday mistakes — a range that is off by one page, a chapter that starts in the wrong place, a stray page in the wrong file."
      />
      <SplitHowItWorks />

      <PdfBio
        title="When people reach for a PDF splitter
"
        para1="Accountants and bookkeepers split a year-end export into one file per month or per client, using custom ranges so each statement ends exactly where the next begins. A clean separation keeps the records easy to file and audit later."
        para2="Teachers and trainers break a single course booklet into individual handouts, splitting every few pages so each worksheet or chapter becomes a document students can open on its own without scrolling past unrelated material."
        para3="Researchers and students extract just the pages that matter — a methods section here, an appendix there — gathering non-adjacent pages into one compact reference instead of carrying the entire source document around."
      />

      <PdfBio
        title="Why choose Toolghar's Split PDF tool

"
        para1="Plenty of online splitters insist on uploading your document, creating an account, or limiting how many pages or files you can produce before asking for payment. Toolghar runs the split locally, needs no sign-in, and places no artificial cap on output beyond the memory your own device has available."
        para2="It also gives you more than one honest way to divide a file. Custom ranges, fixed intervals, single-page bursting, and hand-picked extraction each exist as a first-class option, so you choose the method that matches your document instead of forcing every job through the same rigid split."
        para3="And it behaves like the rest of Toolghar — the same clean layout, keyboard-friendly controls, and dark-mode support — so the splitter feels familiar the moment you open it rather than like an unrelated utility bolted on at the edge."
      />
      <PdfBio
        title="Tips for a clean split"
        para1="Sketch your ranges before you start typing them. Knowing that chapters end at pages 5, 10, and 20 makes entering 1-5, 6-10, and 11-20 quick and removes the guesswork of fixing an off-by-one cut afterwards."
        para2="Use the every-N option only when the document really is uniform. For booklets with a fixed number of pages per section it is the fastest path, but for irregular content custom ranges will land the breaks far more accurately."
        para3="Give your outputs predictable names that match how you file things — a client code, a month, or a section title — so the split files are easy to find later instead of arriving as a pile of generic names you have to rename by hand."
      />
      <PdfBio 
        title="More about how splitting works

"
        para1="A frequent question is how splitting differs from removing pages. Splitting keeps all of your content but distributes it across several new files, whereas removing pages produces one file with certain pages deleted. If your goal is to separate a document rather than trim it, splitting is the tool you want."
        para2="People also ask what happens to bookmarks, links, and form fields. The page content and most links travel with the pages they belong to, but a bookmark or cross-reference that pointed to a page now living in a different output file naturally no longer resolves, so it is worth checking documents that rely heavily on internal navigation."
        para3="Another common question concerns protected files. A PDF that opens normally on your device can usually be split; one that demands a password just to open may need to be unlocked first, because the tool has to read the pages before it can copy them into new documents."
      />
    </>
  );
}
