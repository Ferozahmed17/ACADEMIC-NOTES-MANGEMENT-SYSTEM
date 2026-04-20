import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/note": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/notification": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/event": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/rating": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [react()],
});
