import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/entry.ts", // Bundle registers one or more manifests
      formats: ["es"],
      fileName: "umb-host-cloudflare-purge",
    },
    outDir: "../wwwroot/App_Plugins/UmbHostCloudflarePurge", // your web component will be saved in this location
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
