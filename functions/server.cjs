const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const { getFirestore } = require("firebase-admin/firestore");

const app = express();
app.use(cors());
app.use(express.json()); // ⬅️ Important for reading JSON body

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

app.post("/sendNotification", async (req, res) => {
  console.log("🔔 Incoming request:", req.body);

  const { title, body } = req.body;

  // Check for required fields
  if (!title || !body) {
    console.log("❌ Missing title or body");
    return res.status(400).json({ success: false, error: "Missing title or body" });
  }

  try {
    const snapshot = await db.collection("user").get();
    const tokens = snapshot.docs
      .map((doc) => doc.data().fcmToken)
      .filter((token) => typeof token === "string" && token.trim() !== "");

    if (tokens.length === 0) {
      console.log("❌ No valid FCM tokens found");
      return res.status(400).json({ success: false, error: "No valid FCM tokens found" });
    }

    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await admin.messaging().sendMulticast(message);
    console.log("✅ Notification sent successfully:", response);
    res.json({ success: true, response });
  } catch (err) {
    console.error("❌ Error while sending notification:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
