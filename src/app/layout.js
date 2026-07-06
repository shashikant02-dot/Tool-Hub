import "./globals.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { FreeUsageProvider } from "./context/FreeUsageContext";
import PopupProvider from "./components/PopupProvider";

export const metadata = {

  metadataBase: new URL("https://yourdomain.com"),


title: {
    default: "ToolHub - Free Online Tools",
    template: "%s | ToolHub",
  },
   description:
    "Free online PDF, Image, Invoice, Excel and File Conversion tools.",

  keywords: [
    "PDF Tools",
    "Invoice Generator",
    "Excel Tools",
    "JPG to PDF",
    "Image Converter",
    
  ],

  authors: [{ name: "ToolHub" }],

  creator: "ToolHub",

  publisher: "ToolHub",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://yourdomain.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "ToolHub",
    title: "ToolHub",
    description:
      "Free online file conversion tools.",
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
    title: "ToolHub",
    description: "Free Online Tools",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        <FreeUsageProvider>
          <PopupProvider />

          {children}
        </FreeUsageProvider>
        <Footer />
      </body>
    </html>
  );
}
