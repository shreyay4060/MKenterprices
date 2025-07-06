import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ✅ Register Firebase Messaging service worker
if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ FCM Service Worker registered:", registration);
      window.fcmServiceWorkerRegistration = registration;
    })
    .catch((err) => {
      console.error("❌ Service Worker registration failed:", err);
    });
} else {
  console.warn("⚠️ Push messaging is not supported in this browser.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
