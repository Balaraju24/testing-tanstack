import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  server: { port: 3000 },
  build: { outDir: "dist" },
  plugins: [tsConfigPaths(), tanstackStart(), viteReact()],
});
