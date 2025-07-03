// messaging.js
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { fireDB } from "./FirebaseConfig";

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAH2Dqb8PR55uVjASJFJa_omCtNUboznQE",
  authDomain: "mkgrp-7c801.firebaseapp.com",
  projectId: "mkgrp-7c801",
  storageBucket: "mkgrp-7c801.appspot.com",
  messagingSenderId: "434906872434",
  appId: "1:434906872434:web:458344549563d20a69e0eb",
};

// ✅ Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const messaging = getMessaging(app);

// 🔐 Request FCM Token + Save to Firestore
export const requestNotificationPermission = async (userId) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BH8LQbEluEd6R-8yLCtgJ1KQmJbsCFWHML3Wyb0xBzq7eDQyWRUO1LHXA9ck0oOtlkNx-_CY_ZWwV6JqP2ERf_k",
    });

    if (token) {
      console.log("✅ FCM Token:", token);
      if (userId) {
        await setDoc(doc(fireDB, "user", userId), { fcmToken: token }, { merge: true });
      }
      return token;
    } else {
      console.warn("❌ No FCM token received.");
      return null;
    }
  } catch (err) {
    console.error("🔴 Error getting FCM token:", err);
    return null;
  }
};

// 📥 Handle foreground messages with sound + icon
onMessage(messaging, (payload) => {
  console.log("📥 Foreground message received:", payload);
  const { title, body } = payload.notification;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/images/logo.jpg", // ✅ this must exist in public folder
      badge: "/images/logo.jpg",
      sound: "default", // Note: works only on some platforms
    });
  }
});

export { messaging };
