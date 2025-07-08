// public/firebase-messaging-sw.js

// ✅ Import Firebase libraries for background messaging
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

// ✅ Firebase project configuration (from your Firebase console)
firebase.initializeApp({
  apiKey: "AIzaSyAH2Dqb8PR55uVjASJFJa_omCtNUboznQE",
  authDomain: "mkgrp-7c801.firebaseapp.com",
  projectId: "mkgrp-7c801",
  storageBucket: "mkgrp-7c801.appspot.com",
  messagingSenderId: "434906872434",
  appId: "1:434906872434:web:458344549563d20a69e0eb",
});

// ✅ Initialize Firebase Messaging
const messaging = firebase.messaging();

// ✅ Handle background push notifications
messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 Background message received:", payload);

  const notification = payload.notification || {};
  const data = payload.data || {};

  const title = notification.title || data.title || "🔔 New Notification";
  const body = notification.body || data.body || "You have a new message.";
  const icon = notification.icon || "https://mkenterprices.vercel.app/images/logo.jpg";
  const image = notification.image || data.image;
  const badge = "https://mkenterprices.vercel.app/images/logo.jpg";

  const options = {
    body,
    icon,
    badge,
    image,
    requireInteraction: true,
    data: {
      url: "https://mkenterprices.vercel.app", // ✅ full URL for redirect
    },
  };

  self.registration.showNotification(title, options);
});

// ✅ Open app when user taps on notification
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const targetUrl = "https://mkenterprices.vercel.app";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
