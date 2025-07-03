// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAH2Dqb8PR55uVjASJFJa_omCtNUboznQE",
  authDomain: "mkgrp-7c801.firebaseapp.com",
  projectId: "mkgrp-7c801",
  storageBucket: "mkgrp-7c801.firebasestorage.app",
  messagingSenderId: "434906872434",
  appId: "1:434906872434:web:458344549563d20a69e0eb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/images/logo.jpg',
  });
});
