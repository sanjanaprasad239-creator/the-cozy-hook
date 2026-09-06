import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

// GitHub Pages has no SPA fallback and ignores _redirects files. It serves the
// app's index.html for the root path only; any unmatched client-side route
// (e.g. /admin) falls through to its default 404 page. Duplicating index.html
// as 404.html makes GitHub Pages serve the app shell for every unmatched path,
// so direct visits and refreshes on client-side routes boot the router.
function githubPagesSpaFallback() {
  let outDir = "";
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));
    },
  };
}

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

export default defineConfig({
  logLevel: "error",
  // Relative base so the built app loads from the domain root (Caffeine live
  // deployment) and from a GitHub Pages subpath (username.github.io/repo/)
  // alike. Asset URLs resolve relative to the current document, so JS/CSS load
  // correctly regardless of where the exported repo is hosted.
  base: "./",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
    githubPagesSpaFallback(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"]
  },
});
