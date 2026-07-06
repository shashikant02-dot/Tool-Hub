import {
  FileSpreadsheet,
  FileText,
  FileImage,
  Code2,
  Minimize2,
  Scissors,
  Images,
  Braces,
} from "lucide-react";

export const tools = [
  {
    id: 1,
    title: "Image to Code",
    desc: "Convert screenshots and designs into HTML, CSS, React and Tailwind code.",
    slug: "image-to-code",
    icon: Code2,
    category: "Converter",
  },
  {
    id: 2,
    title: "Image to Excel",
    desc: "Extract tables from images and convert them into Excel files.",
    slug: "image-excel",
    icon: FileSpreadsheet,
    category: "Converter",
  },
  {
    id: 3,
    title: "Merge PDF",
    desc: "Combine multiple PDF files into a single document instantly.",
    slug: "merge-pdf",
    icon: FileText,
    category: "PDF",
  },
  {
    id: 4,
    title: "Image Compressor",
    desc: "Reduce image size while maintaining visual quality.",
    slug: "image-compresor",
    icon: Minimize2,
    category: "Image",
  },
  {
    id: 5,
    title: "Image Converter",
    desc: "Convert PNG, JPG, WEBP and more formats online.",
    slug: "image-converter",
    icon: FileImage,
    category: "Image",
  },
  {
    id: 6,
    title: "Excel to JSON",
    desc: "Convert Excel spreadsheets into clean JSON data.",
    slug: "excel-json",
    icon: Braces,
    category: "Developer",
  },
  {
    id: 7,
    title: "Split PDF",
    desc: "Extract pages or split large PDF documents securely.",
    slug: "split-pdf",
    icon: Scissors,
    category: "PDF",
  },
  {
    id: 8,
    title: "JPG to PDF",
    desc: "Convert JPG, PNG and WEBP images into one PDF file.",
    slug: "jpg-to-pdf",
    icon: Images,
    category: "PDF",
  },
  {
    id: 9,
    title: "CSV to JSON",
    desc: "Convert CSV files into JSON instantly.",
    slug: "csv-to-json",
    icon: Braces,
    category: "Developer",
  },
  {
    id: 10,
    title: "Invoice Generator",
    desc: "Create beautiful professional invoices online.",
    slug: "invoice-generator",
    icon: FileText,
    category: "Business",
  },
];

export const categories = [
  {
    name: "All",
    count: tools.length,
  },
  {
    name: "PDF",
    count: tools.filter((tool) => tool.category === "PDF").length,
  },
  {
    name: "Image",
    count: tools.filter((tool) => tool.category === "Image").length,
  },
  {
    name: "Converter",
    count: tools.filter((tool) => tool.category === "Converter").length,
  },
  {
    name: "Developer",
    count: tools.filter((tool) => tool.category === "Developer").length,
  },
  {
    name: "Business",
    count: tools.filter((tool) => tool.category === "Business").length,
  },
];