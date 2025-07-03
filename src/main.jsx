import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ✅ Register Firebase Messaging Service Worker
if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ FCM Service Worker registered:", registration);
      // Optional: attach registration to window or export if needed later
      window.fcmServiceWorkerRegistration = registration;
    })
    .catch((err) => {
      console.error("❌ FCM Service Worker registration failed:", err);
    });
} else {
  console.warn("⚠️ Push messaging is not supported in this browser.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
