// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAH2Dqb8PR55uVjASJFJa_omCtNUboznQE",
  authDomain: "mkgrp-7c801.firebaseapp.com",
  projectId: "mkgrp-7c801",
  storageBucket: "mkgrp-7c801.appspot.com",
  messagingSenderId: "434906872434",
  appId: "1:434906872434:web:458344549563d20a69e0eb",
});

const messaging = firebase.messaging();

// ✅ Background notification handler
messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 Background message received:", payload);

  const notificationTitle = payload.notification.title || "🔔 New Notification";
  const notificationOptions = {
    body: payload.notification.body || "You have a new message.",
    icon: payload.notification.icon || "/images/logo.jpg",
    badge: "/images/logo.jpg",
    image: payload.notification.image || undefined,
    requireInteraction: true, // Keeps notification open until user interacts
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Notification click behavior
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/")); // Opens home page on click
});
