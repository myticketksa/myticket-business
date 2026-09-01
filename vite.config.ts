import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const projectRoot = import.meta.dirname

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "./src"),
      react: path.resolve(projectRoot, "node_modules/react"),
      "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-redux",
      "react-router",
      "use-sync-external-store",
      "use-sync-external-store/with-selector",
      "use-sync-external-store/shim",
      "use-sync-external-store/shim/with-selector",
      "@reduxjs/toolkit",
      "radix-ui",
      "@phosphor-icons/react",
      "lucide-react",
      "sonner",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "yup",
    ],
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
})
