import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
