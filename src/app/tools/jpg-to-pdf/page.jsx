import JpgToPdfConverter from "@/app/components/JpgToPdfConverter";
import PdfBio from "@/app/components/PdfBio";
import React from "react";
import {
  Move,
  Files,
  Hash,
  FileEdit,
  ShieldCheck,
  Infinity,
} from "lucide-react";
import FeaturesGrid from "@/app/components/FeatureGrid";
import JpgHowItWorks from "@/app/components/JpgHowWork";
export const metadata = {
  title: "Jpg to PDF",

  description:
    "Convert PDF to Word online for free. Fast, secure, and works on all devices.",

  alternates: {
    canonical: "https://yourdomain.com/tools/pdf-to-word",
  },
};
export default function page() {
  const features = [
    {
      icon: Move,
      title: "JPG, PNG, and WEBP in one go",
      description:
        "Add the three formats people actually have — JPEG photos, PNG screenshots and transparent graphics, and modern WEBP images — and mix them freely in a single document without converting anything first.",
    },
    {
      icon: Files,
      title: "Drag to reorder before converting",
      description:
        "Arrange the images into the exact page order you want by dragging them into place. The position you see in the grid is the position each picture takes in the finished PDF.",
    },
    {
      icon: Hash,
      title: "Portrait or landscape pages",
      description:
        "Choose the orientation that suits your images — upright portrait for documents and tall photos, or wide landscape for screenshots and panoramas — applied consistently across the whole file.",
    },
    {
      icon: FileEdit,
      title: "Page size presets and fit-to-image",
      description:
        "Pick a standard page such as A4 or US Letter for a uniform printable document, or choose fit-to-image so each page is sized to the picture it holds with no surrounding whitespace.",
    },
    {
      icon: ShieldCheck,
      title: "Margins and image fit modes",
      description:
        "Add even margins so images do not crowd the edge, and choose how each picture fills the space — fit within the margins, fill the page, or center at its natural size — to control cropping and scaling.",
    },
    {
      icon: Infinity,
      title: "Live preview and custom filename",
      description:
        "Watch a live preview of the resulting pages update as you adjust the options, then set your own output filename so the download arrives named the way you want rather than a generic default.",
    },
  ];
  return (
    <>
      <section className="mt-28 flex justify-center">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto px-4 py-10">
          <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            JPG to PDF
          </h1>

          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl lg:text-2xl">
            Combine JPG, PNG, and WEBP images into one tidy PDF. Drag the
            pictures into the order you want, choose the orientation, page size,
            margins, and how each image fits the page, then download — all
            without leaving your browser.
          </p>
        </div>
      </section>
      <JpgToPdfConverter />
      <PdfBio
        title="Bind a pile of images into one shareable PDF"
        para1="Photos and scans rarely travel well as loose files. A folder of twenty receipts, a set of phone snaps of a signed form, or a handful of design mockups is awkward to email, easy to lose, and impossible to flip through in order. Toolghar's JPG to PDF tool gathers those images into a single document: drop them in, arrange them, decide how each one should sit on the page, and download one PDF that opens the same way on every device."
        para2="This is more than a quiet stack of pictures. You control the layout that most online converters hide. Set the pages to portrait or landscape, pick a page size such as A4, US Letter, or fit-to-image, add margins so nothing crowds the edge, and choose a fit mode that decides whether an image fills the page, sits centered at its natural size, or scales to fit within the margins. A live preview updates as you change those options, so you see the finished document before you commit."
        para3="Because every step runs inside the page you are reading, your images never travel to a server. That makes JPG to PDF a safe choice for the personal and sensitive pictures people most often need to bundle — scanned IDs, medical paperwork, signed contracts photographed on a phone — without handing any of them to an unfamiliar online service just to staple them together."
      />
      <FeaturesGrid features={features} />
      <PdfBio
        title="Why building the PDF in the browser is worth it"
        para1="The first benefit is order and portability. Loose images arrive in whatever sequence the file system feels like, and a recipient has to open each one separately. One PDF fixes that: the pages stay in your chosen order, open in a single tap, and look identical whether the reader is on a phone, a laptop, or a printer."
        para2="The second benefit is privacy. The images people most want to combine are often the most personal — scanned identity documents, insurance claims, photographed signatures, private artwork. Building the PDF locally means none of it is exposed to a third-party server; the bytes never leave the hardware you control, which for sensitive or regulated material can be the difference between a usable tool and a non-starter."
        para3="The third benefit is control without complexity. You get the layout choices a print shop would offer — orientation, page size, margins, and fit — but presented as a few clear options with a live preview, so a beginner can accept the sensible defaults while a power user can dial in an exact, consistent result before downloading."
      />
      <JpgHowItWorks />
      <PdfBio
        title="When people combine images into a PDF"
        para1="Freelancers and small businesses turn photographed receipts and invoices into a single expense PDF for an accountant or a reimbursement claim. Reordering by date and choosing A4 portrait with a small margin produces a clean, printable record instead of a chaotic folder of phone snaps."
        para2="Applicants and students assemble scanned documents — certificates, ID pages, signed forms — that a portal wants as one upload. A consistent page size and a fit-within-margins mode keeps every page looking deliberate and professional rather than stretched or cropped."
        para3="Designers and photographers send a quick visual set to a client as a contact sheet or lookbook. Landscape orientation with fit-to-image or a fill mode lets each shot use the full page, and drag-to-reorder builds the narrative sequence before export."
      />

      <PdfBio
        title="Why choose Toolghar's JPG to PDF tool"
        para1="Many online image-to-PDF converters make you upload your pictures, register an account, or accept a watermark and a daily limit on free conversions. Toolghar takes the opposite approach: the conversion runs locally, there is no login, there is no watermark on your pages, and there is no artificial cap beyond your device's own memory."
        para2="It also gives you the layout control that lighter tools skip. Instead of forcing every image onto a fixed page or stretching it to fill, you decide the orientation, page size, margins, and fit mode, and a live preview shows the outcome before you download. That means the difference between a document that looks thrown together and one that looks deliberately produced."
        para3="And it stays consistent with the rest of Toolghar — the same clean interface, keyboard-friendly controls, drag-to-reorder, and dark-mode support — so it feels familiar from the first use rather than like a bolted-on utility."
      />

      <PdfBio
        title="Your images never leave your device"
        para1="Every step of the conversion happens in your browser. When you add images, their bytes are read into the page's memory and assembled by libraries that ship with the application itself — there is no background upload and no copy stored on a server."
        para2="Because the processing is local, the privacy guarantee is structural rather than a promise: there is simply no network request that carries your pictures anywhere. That is what makes the tool appropriate for the personal images people most often combine — scanned identity documents, signed agreements, medical paperwork, private artwork — which you should not hand to an unfamiliar service just to bind them into a file."
        para3="It is worth understanding how the layout is built, because it affects your output. Each image is embedded into the PDF and drawn onto a page according to the orientation, page size, margins, and fit mode you chose. JPEG and PNG images, including transparent PNGs, embed directly; WEBP images are decoded in the browser first and then embedded. Nothing about that pipeline reaches outside your device — the point is simply that the result is a faithful, image-based PDF assembled entirely on your own hardware."
      />

      <PdfBio
        title="Your images never leave your device"
        para1="Decide orientation by content, not habit. Upright documents, portraits, and scanned forms usually look best in portrait; screenshots, panoramas, and wide design shots breathe better in landscape. Picking one orientation for the whole set keeps the document feeling consistent."
        para2="Match the page size to the destination. Choose A4 or US Letter when the PDF will be printed or fed into a form that expects standard pages, and reach for fit-to-image only when you want each page to hug its picture with no border."
        para3="Use margins and fit together. A small margin with a fit-within mode prevents important edges from being cropped, while a zero margin with a fill mode is best when you want a borderless, edge-to-edge image."
      />

      <PdfBio
        title="More about converting images to PDF"
        para1="A common question is why mixing very different image sizes can look uneven. When pictures have different aspect ratios, a fixed page size will frame each one differently — some with more margin, some filling more of the page. Choosing fit-to-image gives every page its own dimensions, while a standard page size with a fit-within mode keeps the page shape constant and lets the margins vary instead."
        para2="People also ask about image quality. The tool embeds your images rather than recompressing them aggressively, so a page is only as sharp as the picture you supply. For crisp text in a scanned document, start from the highest-resolution scan you have; an image that already looks soft on screen will look the same in the PDF."
        para3="Another frequent question is about transparency. PNG images with transparent backgrounds are supported, and where a page area is not covered by the image it appears against the page itself. If you need a guaranteed solid background, place the image on a standard page size rather than fit-to-image so the surrounding page area is predictable."
      />
    </>
  );
}
