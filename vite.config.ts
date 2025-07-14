import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

interface EnvConfig {
  VITE_BASE_URL?: string;
  VITE_PORT?: string;
}

// Resolve the JSON file path
const envPath = path.resolve(__dirname, "env.development.json");

// Read JSON config safely with type
let envConfig: EnvConfig = {};
if (fs.existsSync(envPath)) {
  envConfig = JSON.parse(fs.readFileSync(envPath, "utf-8")) as EnvConfig;
  process.env.VITE_BASE_URL = envConfig.VITE_BASE_URL;
} else {
  console.error("Error: env.development.json not found");
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: parseInt(envConfig.VITE_PORT || "5000", 10),
  },
  base: "./",
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          chart: ["apexcharts"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
  },
});
