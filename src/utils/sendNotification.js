import axios from "axios";

// Optional: use your deployed backend URL instead of localhost
const BASE_URL = "http://localhost:5000"; // Change to live URL when deployed

export const sendAutoNotification = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/sendNotification`, {
      title: "New Work Added",
      body: "New work is uploaded, please check it out!",
      key: "super_secret_123", // 👈 must match backend key
    });

    if (res.data.success) {
      console.log(`✅ Notification sent to ${res.data.sent} users`);
    } else {
      console.warn("⚠️ Notification failed:", res.data.error || "Unknown error");
    }
  } catch (err) {
    console.error("❌ Notification request error:", err.message);
  }
};
