/// <reference types='vitest' />
import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/zoos",
  server: {
    port: 2005,
    host: "localhost",
  },
  preview: {
    port: 2015,
    host: "localhost",
  },
  plugins: [
    TanStackRouterVite(),
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(["*.md"]),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: "../../dist/apps/zoos",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // For local imports
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
