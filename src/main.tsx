import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import { twMerge } from "tailwind-merge";

if (import.meta.env.DEV) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  
  fetch(`${backendUrl}/api/method/parent_portal.www.parent_portal.get_context_for_dev`, {
    method: "POST",
    credentials: 'include', // Include cookies for authentication
  })
    .then((response) => response?.json() || Promise.reject())
    .then((values) => {
      const v = JSON.parse(values.message);
      //@ts-expect-error
      if (!window.frappe) window.frappe = {};
      //@ts-ignore
      window.frappe.boot = v;
      console.log("window.frappe.boot", v);
    })
    .catch((error) => {
      console.warn("Failed to get dev context:", error);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
