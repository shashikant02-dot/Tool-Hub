import ToolPage from "./ToolPage";

export const metadata = {
  title: "Image to Code AI Converter – HTML, React & Tailwind | ToolHub",

  description:
    "Convert screenshots and UI designs into HTML, CSS, React, Tailwind CSS, Vue and Next.js code using AI. Free, fast and secure online Image to Code converter.",

  keywords: [
    "image to code",
    "ai image to code",
    "image to html",
    "screenshot to html",
    "image to react",
    "image to tailwind",
    "design to code",
    "figma to html",
    "ui to code",
    "html generator",
    "react code generator",
    "tailwind converter",
  ],

  alternates: {
    canonical: "https://yourdomain.com/tools/image-to-code",
  },

  openGraph: {
    title: "Image to Code AI Converter | ToolHub",
    description:
      "Generate production-ready HTML, CSS, React and Tailwind code from screenshots instantly.",
    url: "https://yourdomain.com/tools/image-to-code",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Image to Code AI Converter",
    description:
      "Convert screenshots into clean HTML, CSS, React and Tailwind code using AI.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <ToolPage />;
}