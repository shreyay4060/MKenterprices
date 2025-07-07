import axios from "axios";

// ✅ Use deployed backend endpoint
const BASE_URL = "https://mkenterprises-backend.onrender.com";

export const sendAutoNotification = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/sendNotification`,
      {
        title: "New Work Added",
        body: "New work is uploaded, please check it out!",
        key: "super_secret_123", // ✅ Must match ADMIN_KEY in backend
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // ⏱️ Optional: set timeout for stability
      }
    );

    if (res.data.success) {
      console.log(`✅ Notification sent to ${res.data.sent} users`);
    } else {
      console.warn("⚠️ Notification failed:", res.data.error || "Unknown error");
      alert("⚠️ Notification failed: " + (res.data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("❌ Notification request error:", err.message);
    alert("❌ Failed to send notification. Please check your internet or try again later.");
  }
};
