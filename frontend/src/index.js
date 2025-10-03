import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Force dark theme class for Tailwind variable system
try {
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {
  // no-op
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);