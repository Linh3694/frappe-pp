import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import { twMerge } from "tailwind-merge";

// Tạm thời comment out dev context để tránh lỗi 417
// if (import.meta.env.DEV) {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  
//   fetch(`${backendUrl}/api/method/parent_portal.www.parent_portal.get_context_for_dev`, {
//     method: "POST",
//     credentials: 'include', // Include cookies for authentication
//   })
//     .then((response) => response?.json() || Promise.reject())
//     .then((values) => {
//       const v = JSON.parse(values.message);
//       //@ts-expect-error
//       if (!window.frappe) window.frappe = {};
//       //@ts-ignore
//       window.frappe.boot = v;
//     })
//     .catch((error) => {
//       console.warn("Failed to get dev context:", error);
//     });
// }

// Khởi tạo window.frappe cơ bản cho development
if (import.meta.env.DEV && !window.frappe) {
  //@ts-expect-error
  window.frappe = {
    boot: {
      sitename: import.meta.env.VITE_SITE_NAME || 'admin.sis.wellspring.edu.vn',
      versions: {
        frappe: '15.0.0'
      }
    }
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
