import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/note": {
        target: "https://academic-notes-mangement-system.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/notification": {
        target: "https://academic-notes-mangement-system.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/event": {
        target: "https://academic-notes-mangement-system.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/rating": {
        target: "https://academic-notes-mangement-system.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [react()],
});
