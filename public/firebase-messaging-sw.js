// /public/firebase-messaging-sw.js
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

// 🔔 This runs when notification is received in background
messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 Background message received", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png", // Make sure this path is correct and logo exists
    badge: "/logo192.png", // Optional for Android/Windows
    sound: "default", // Sound support is limited, but used by OS
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
