export default function sitemap() {

  const baseUrl = "https://yourdomain.com";

  const pages = [
    "",
    "/tools/csv-to-json",
    "/tools/merge-pdf",
    "/tools/jpg-to-pdf",
    "/tools/split-pdf",
    "/tools/invoice-generator",
    "/tools/image-to-code",
    "/tools/image-excel",
    "/tools/image-converter",
    "/tools/image-compresor",
    "/tools/excel-json",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}