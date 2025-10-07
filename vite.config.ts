import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { htmlPrerender } from "vite-plugin-html-prerender";

export default defineConfig({
  plugins: [
    react(),
    htmlPrerender({
      staticDir: path.resolve(__dirname, "dist"),
      routes: ["/", "/about", "/projects", "/feedback", "/contact"],
      selector: "main", // renders content inside <main> tag
      minify: {
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
