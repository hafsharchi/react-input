import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['lib'], rollupTypes: true, tsconfigPath: resolve(__dirname, "tsconfig.lib.json") }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.tsx"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
    },
  },
});
