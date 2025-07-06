// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAH2Dqb8PR55uVjASJFJa_omCtNUboznQE",
  authDomain: "mkgrp-7c801.firebaseapp.com",
  projectId: "mkgrp-7c801",
  storageBucket: "mkgrp-7c801.appspot.com",
  messagingSenderId: "434906872434",
  appId: "1:434906872434:web:458344549563d20a69e0eb",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 Background message received:", payload);

  const notificationTitle =
    payload.notification?.title || payload.data?.title || "🔔 New Notification";
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "You have a new message.",
    icon: payload.notification?.icon || "/images/logo.jpg",
    badge: "/images/logo.jpg",
    image: payload.notification?.image || payload.data?.image,
    requireInteraction: true,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/")); // Redirect to homepage on click
});
