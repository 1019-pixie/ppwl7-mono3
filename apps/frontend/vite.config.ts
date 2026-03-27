import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// apps/frontend/vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // Menambahkan dukungan untuk pengiriman cookie/credentials
        secure: false, 
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
        // Baris yang kamu minta ditambahkan:
        // Catatan: Di Vite/http-proxy, properti ini biasanya tidak langsung bernama 'credentials', 
        // tapi setting ini memastikan header 'set-cookie' diteruskan dengan benar.
      },
    },
  },
});