// messaging.js
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { fireDB } from "./FirebaseConfig";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAH2Dqb8PR55uVjASJFJa_omCtNUboznQE",
  authDomain: "mkgrp-7c801.firebaseapp.com",
  projectId: "mkgrp-7c801",
  storageBucket: "mkgrp-7c801.appspot.com",
  messagingSenderId: "434906872434",
  appId: "1:434906872434:web:458344549563d20a69e0eb",
};

// ✅ Initialize Firebase app (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const messaging = getMessaging(app);

// ✅ Request permission + register service worker + save token
export const requestNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    console.log("🔔 Notification permission:", permission);

    if (permission !== "granted") {
      console.warn("🚫 Notification permission not granted");
      return null;
    }

    // ✅ Register service worker
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    // ✅ Get FCM token
    const token = await getToken(messaging, {
      vapidKey: "BH8LQbEluEd6R-8yLCtgJ1KQmJbsCFWHML3Wyb0xBzq7eDQyWRUO1LHXA9ck0oOtlkNx-_CY_ZWwV6JqP2ERf_k",
      serviceWorkerRegistration: registration,
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

// ✅ Export messaging and listener
export { messaging, onMessage };
