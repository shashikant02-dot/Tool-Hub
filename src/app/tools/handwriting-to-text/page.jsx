"use client";

import { useFreeUsage } from "@/app/context/FreeUsageContext";
import CardInfo from "@/app/components/CardInfo";
import CardInfo2 from "@/app/components/CardInfo2";
import CardInfo3 from "@/app/components/cardInfo3";
import SubscriptionPopup from "@/app/components/SubscriptionPopup";
import HandwritingsUI from "@/app/components/HandwritingsUI";

export default function HandwritingToText() {
 

  const {  showPopup, setShowPopup } = useFreeUsage();

  return (
    <>
      <section className="mt-14">
        <div className="flex flex-col text-center mt-22">
          <h1 className="text-5xl font-bold">
            Free Online{" "}
            <span className="text-indigo-600">Handwriting to Text</span>{" "}
            Converter
          </h1>

          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mt-6">
            Convert handwriting into digital text using AI OCR.
          </p>
        </div>
      </section>

      {/* TOOL
      <UploadUI
        apiEndpoint="/api/handwriting"
        format="OCR"
        title="Ready to convert"
        subtitle="Upload your handwriting to see the extracted text."
        fileText="PNG, JPEG, JPG, WEBP, BMP, GIF, HEIC, HEIF, PDF up to 10 MB"
        toolName={TOOL_NAME}
        freeUses={freeUses}
        setFreeUses={setFreeUses}
        setShowPopup={setShowPopup}
      /> */}
      <HandwritingsUI/>
      <CardInfo
        heading={
          <>
            How <span className="text-indigo-600">Handwriting to Text</span>{" "}
            Works
          </>
        }
        subheading={
          <>
            Transform any <b>handwritten note</b> into <b>digital text</b>{" "}
            instantly with our <b>free online OCR</b> tool.
          </>
        }
        steps={[
          {
            stepNumber: "STEP 01",
            title: "Upload Handwriting PDF",
            description: (
              <>
                Drag & drop your <b>handwritten notes</b>, cursive letters, or
                scanned PDF documents. We support JPG, PNG, and HEIC for{" "}
                <i>instant image to text</i>.
              </>
            ),
          },
          {
            stepNumber: "STEP 02",
            title: "AI Analysis & OCR",
            description: (
              <>
                {" "}
                "Our advanced <b>handwriting to text AI</b> engine scans the
                image, recognizing complex <i>cursive strokes</i> and layout
                formatting accurately.
              </>
            ),
          },
          {
            stepNumber: "STEP 03",
            title: "Review & Edit Text",
            description: (
              <>
                Within seconds, your{" "}
                <b>handwriting is converted into editable text</b>. You can make
                quick corrections directly in our <i>online OCR editor</i>.
              </>
            ),
          },
          {
            stepNumber: "STEP 04",
            title: "Copy, Download, Share",
            description: (
              <>
                One-click to copy the <b>digitized text</b> to your clipboard.
                Your <b>handwriting to digital transcription</b> is ready for
                any document.
              </>
            ),
          },
        ]}
      />

      <CardInfo2
        heading={
          <>
            <div className="text-5xl">
              The Best{" "}
              <span className="text-indigo-600">Handwriting to Text</span> AI
              Online
            </div>
          </>
        }
        subheading={
          <span className=" text-center ">
            Experience the most powerful <b>AI handwriting recognition</b> hub.
            Easily <b>convert image to text</b>, transcribe{" "}
            <b>cursive scripts</b>, and digitize <b>messy handwriting</b> with
            our <b>free Online OCR</b> service
          </span>
        }
        steps={[
          {
            stepNumber: "TECHNOLOGY",
            title: "Advanced Cursive to Text OCR",
            description: (
              <>
                Our <b>AI handwriting to text converter</b> is specifically
                trained on millions of English samples, recognizing complex
                cursive strokes and messy penmanship where standard{" "}
                <b>online OCR tools</b> fail.
              </>
            ),
          },
          {
            stepNumber: "SECURE",
            title: "Private Image to Text",
            description: (
              <>
                Convert <b>handwriting to digital text </b>securely. Our{" "}
                <b>online OCR service </b>processes files in real-time, ensuring
                that your sensitive data is never stored and is deleted
                immediately.
              </>
            ),
          },
          {
            stepNumber: "FREE",
            title: "Free Online Handwriting OCR",
            description: (
              <>
                Access the best <b>free handwriting to text</b> tool without
                limits. Toolghar offers <b>unlimited OCR online</b> with no
                registration required and no hidden subscription costs.
              </>
            ),
          },
          {
            stepNumber: "EDUCATION",
            title: "Digitize Handwritten Notes",
            description: (
              <>
                Perfect for students to{" "}
                <b>convert handwritten notes to digital text. </b>Transcribe
                lecture notes and assignments into searchable formats like Word
                and Google Docs instantly.
              </>
            ),
          },
          {
            stepNumber: "HISTORY",
            title: " Old Handwriting Transcription",
            description: (
              <>
                Our <b>handwritten text extractor</b> excels at transcribing old
                family letters, historical diaries, and manuscripts, making{" "}
                <b>scanned document to text</b> conversion easy.
              </>
            ),
          },
          {
            stepNumber: "BUSINESS",
            title: "Whiteboard to Text Converter",
            description: (
              <>
                Instantly <b>convert pictures to text</b> from meeting
                whiteboards, brainstorming sessions, and sticky notes. The
                ultimate <b>productivity tool</b> for professional digital
                transcription.
              </>
            ),
          },
        ]}
      />

      <CardInfo3
        heading={
          <>
            <div className="flex justify-center">
              <p className="text-indigo-500 mb-10 p-2 font-bold text-xl w-[33vw] flex  justify-center bg-indigo-50 rounded-2xl">
                #1 Rated Free Online Handwriting to Text Converter & AI OCR
              </p>
            </div>
            Elite <span className="text-indigo-600"> Handwriting to Text</span>{" "}
            Features
          </>
        }
        subheading={
          <>
            Cutting-edge<b> AI OCR</b> technology for accurate{" "}
            <b>handwriting recognition </b>and digital transcription.
          </>
        }
        steps={[
          {
            stepNumber: " 01",
            title: "Advanced Cursive to Text AI",
            description: (
              <>
                Our specialized <b> handwriting to text AI</b> accurately
                transcribes joined-up writing, artistic signatures, and complex
                calligraphic styles that standard tools miss.
              </>
            ),
          },
          {
            stepNumber: " 02",
            title: "Convert Scanned Docs & PDFs",
            description: (
              <>
                Easily upload multipage scanned PDFs. We extract{" "}
                <b>handwriting to digital text</b> from forms, historic letters,
                and old legal documents using advanced <b>AI OCR</b>.
              </>
            ),
          },
          {
            stepNumber: "03",
            title: "Digitize Messy Notes",
            description: (
              <>
                Our <b>handwriting to text converter</b> is trained on thousands
                of bad penmanship styles, making it perfect for digitizing messy
                lecture notes and meeting minutes.
              </>
            ),
          },
          {
            stepNumber: " 04",
            title: "Preserve Original Layout",
            description: (
              <>
                We don't just do <b>handwriting to text extraction</b>; we
                respect the structure. Paragraphs, line breaks, and spacing are
                maintained for a true-to-life digital copy.
              </>
            ),
          },
          {
            stepNumber: " 05",
            title: "Private & Secure Transcription",
            description: (
              <>
                Your privacy matters. All <b>handwriting to text online</b>{" "}
                processing happens securely in real-time and is permanently
                deleted from our servers immediately.
              </>
            ),
          },
          {
            stepNumber: "06",
            title: "Free Unlimited Export",
            description: (
              <>
                Export your <b>online handwriting to text</b> results as a plain
                text file (.txt) or copy to clipboard. 100% free OCR with no
                daily limits.
              </>
            ),
          },
        ]}
      />
      <SubscriptionPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}
