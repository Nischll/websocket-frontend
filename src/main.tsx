import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const Client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={Client}>
      <ToastContainer limit={2} />
      {/* <AuthProvider> */}
      <App />
      {/* </AuthProvider> */}
    </QueryClientProvider>
  </StrictMode>
);
