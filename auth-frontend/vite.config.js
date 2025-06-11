import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Required for external access
    port: 5173, // Make sure Ngrok targets this
    strictPort: true,
    cors: true, // Allow cross-origin
    allowedHosts: "all", // Accept all hosts (development only)
    https: false, // Only enable this if you're using HTTPS locally
  },
});
