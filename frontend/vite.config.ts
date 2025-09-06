import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configurações de desenvolvimento
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "/http:localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Otimização de build
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: true,
  },

  // Configuração de TypeScript
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
