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

// ✅ Handle background notification
messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 Background message received:", payload);

  const title = payload.notification?.title || payload.data?.title || "🔔 New Notification";
  const options = {
    body: payload.notification?.body || payload.data?.body || "You have a new message.",
    icon: payload.notification?.icon || "https://mkenterprices.vercel.app/images/logo.jpg",
    badge: "https://mkenterprices.vercel.app/images/logo.jpg",
    image: payload.notification?.image || payload.data?.image,
    requireInteraction: true,
  };

  self.registration.showNotification(title, options);
});

// ✅ Redirect user to site when notification is clicked
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
