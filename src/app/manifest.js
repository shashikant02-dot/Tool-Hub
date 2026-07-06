export default function manifest() {
  return {
    name: "ToolHub",

    short_name: "ToolHub",

    start_url: "/",

    display: "standalone",

    background_color: "#ffffff",

    theme_color: "#2563eb",

    icons: [
      {
        src: "/file.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}