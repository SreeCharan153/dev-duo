import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "vite-plugin-prerender";

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ["/", "/about", "/projects", "/feedback", "/contact"],
      staticDir: path.resolve(__dirname, "dist"),
      captureAfterDocumentEvent: "render-complete", // ✅ updated property
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
