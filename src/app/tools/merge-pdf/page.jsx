import FeaturesGrid from "@/app/components/FeatureGrid";
import HowItWorks from "@/app/components/HowItWorks";
import PdfBio from "@/app/components/PdfBio";
import UploadUiMerge from "@/app/components/UploadUiMerge";
import React from "react";
import {
  Move,
  Files,
  Hash,
  FileEdit,
  ShieldCheck,
  Infinity,
} from "lucide-react";


export const metadata = {
  title: "Merge PDF  | Toolghar",

  description:
    "Merge PDF files online for free. Combine multiple PDF documents into one file, reorder pages, remove unwanted pages, and download instantly. Secure browser-based PDF merger.",

  keywords: [
    "merge pdf",
    "merge pdf online",
    "combine pdf",
    "join pdf files",
    "pdf merger",
    "merge multiple pdf",
    "merge pdf free",
    "pdf combine tool",
    "online pdf merger",
    "toolghar pdf",
  ],

  alternates: {
    canonical: "https://yourdomain.com/tools/merge-pdf",
  },
}

export default function page() {
  const features = [
    {
      icon: Move,
      title: "Drag-and-drop ordering",
      description:
        "Set the exact sequence of your documents by dragging cards or using the move-up and move-down controls. The merged file follows the order you see on screen.",
    },
    {
      icon: Files,
      title: "Per-file page selection",
      description:
        "Open any file and keep only the pages you want. Select by clicking thumbnails, by page range, or with odd and even shortcuts, and the rest are left out of the merge.",
    },
    {
      icon: Hash,
      title: "Live merged page count",
      description:
        "A running total shows how many pages the finished PDF will contain, recalculated the moment you add a file, reorder, or change a page selection.",
    },
    {
      icon: FileEdit,
      title: "Custom output filename",
      description:
        "Name the result whatever your filing system expects. Leave it blank and a sensible default is applied automatically.",
    },
    {
      icon: ShieldCheck,
      title: "Runs entirely in your browser",
      description:
        "Files are read into memory on your device and processed locally with bundled libraries. No upload step, no account, no waiting in a queue.",
    },
    {
      icon: Infinity,
      title: "No file count or size paywall",
      description:
        "Combine two files or twenty. The only practical limit is the memory available on your own machine, not an artificial tier.",
    },
  ];
  return (
    <>
      <section className="mt-14 bg-[#fcfeff]">
       <div className="mt-22 flex flex-col items-center px-4 text-center">
  

  {/* Heading */}
 <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent [-webkit-text-fill-color:transparent] text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] py-2">
  Merge PDF
</h1>

  {/* Description */}
  <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl lg:text-2xl">
    Combine several PDFs into one tidy document. Arrange the files, keep
    only the pages you need, and download a single merged file instantly—
    all without leaving your browser.
  </p>


  {/* Decorative Gradient Glow */}
  <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
</div>
        <div className="mt-16 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full shadow">
            <span className="text-lg">
              ✔ All processing happens in your browser
            </span>
          </div>
        </div>
        <UploadUiMerge />
        <PdfBio
          title=" Combine your PDFs into one ordered file"
          para1=" Merging PDFs sounds simple until you are juggling a signed
              contract, three appendices, and a cover letter that all need to
              arrive as one attachment. Toolghar's Merge PDF tool turns that
              scramble into a few deliberate clicks: add every file, drag them
              into the sequence you want, trim out the pages you do not need,
              and produce a single document that opens cleanly on any device."
          para2="Unlike a quick concatenation script, this tool gives you control
              over the details that actually matter when you assemble a
              document. You decide the order of the files, you decide which
              pages survive from each one, and you see the total page count
              update before you commit. Nothing is guessed and nothing is hidden
              behind a progress bar you cannot inspect."
          para3="Because the entire process happens inside the page you are
              reading, your files never travel to a server. That makes Merge PDF
              a comfortable fit for invoices, medical records, legal bundles,
              and anything else you would rather not email to an unknown machine
              just to staple a few pages Every step of the merge happens in your browser. When you add a file, its bytes are read into the page's memory and handled by PDF libraries that ship with the application itself — there is no background upload and no copy stored on a server.
              
              together."
        />
        <FeaturesGrid
          features={features}
          bioTitle="Why merging in the browser is worth it"
          bioPara1="Privacy comes first..."
          bioPara2="Faster processing..."
          bioPara3="Avoid document mistakes..."
        />{" "}
        <HowItWorks />
        <PdfBio
          title="Why choose Toolghar's Merge PDF tool"
          para1="Many online mergers ask you to upload your documents, sign up for an account, or accept a daily cap on how many files you can combine. Toolghar takes the opposite approach: the work runs locally, there is no login, and there is no artificial limit on the number or size of files beyond your device's own memory."
          para2="It is also built for control rather than just convenience. The same page lets you reorder files, select individual pages, remove the ones you do not want, preview thumbnails, and read a live page total before you commit. You are never merging blind and hoping the output is right."
          para3="And it stays consistent with the rest of Toolghar — the same clean interface, keyboard-friendly controls, and dark-mode support — so it feels familiar from the first use rather than like a bolted-on utility."
        />
        <PdfBio
          title="Your files never leave your device"
          para1="Every step of the merge happens in your browser. When you add a file, its bytes are read into the page's memory and handled by PDF libraries that ship with the application itself — there is no background upload and no copy stored on a server."
          para2="Because the processing is local, the privacy guarantee is structural rather than a promise: there is simply no network request that carries your document anywhere. That is why the tool works for sensitive material that policy or common sense says should not be sent to an unfamiliar service."
          para3="When you finish, clear the tool, or close the tab, the in-memory references are released and the temporary links used to deliver your download are revoked. Nothing lingers and nothing is retained for later."
        />
        <PdfBio
          title="Tips for a clean merge"
          para1="Add files in roughly the order you want them, then fine-tune with the move controls. Starting close to the final sequence makes reordering quick and avoids confusion when you have many documents."
          para2="Use page selection to drop redundant cover sheets and blank pages before merging rather than editing the combined file afterwards. Trimming at the source keeps the result lean and the page numbering sensible."
          para3="Give the output a descriptive filename that matches how you file documents — for example, a project code and date — so the merged PDF is easy to find later without renaming it by hand."
        />
        <PdfBio
          title="More about how merging works"
          para1="A common question is whether merging reduces quality. It does not: the tool copies the original pages into a new document rather than re-rendering them, so text stays selectable, vector graphics stay sharp, and images keep their original resolution."
          para2="People also ask what happens to forms, links, and bookmarks. Page content and most links are carried over with the pages they belong to, though complex interactive forms can behave differently once pages from several sources sit side by side, so it is worth checking the result if your documents rely heavily on form fields."
          para3="Another frequent question is about encrypted files. A PDF that opens normally on your device can usually be merged; a file that demands a password to open may need to be unlocked first, since the tool needs to read the pages to copy them."
        />
        <PdfBio
          title="How the merge is performed"
          para1="Under the hood, each PDF you add is parsed in the browser to read its page count and structure. When you merge, the tool builds an ordered plan of exactly which pages to take from which file, then copies those pages into a brand-new document in that order before saving it back out as a single PDF."
          para2="Heavy work is moved off the main thread into a Web Worker, so the interface stays responsive even while a large bundle is being assembled. File bytes are transferred to the worker rather than copied where possible, which keeps memory use modest."
          para3="The libraries that do the parsing and writing are bundled with the application and loaded on demand through dynamic imports — never fetched from a third-party CDN at runtime. That keeps the initial page light, removes a dependency on an outside script, and ensures the same trusted code performs every merge."
        />
      </section>
    </>
  );
}
