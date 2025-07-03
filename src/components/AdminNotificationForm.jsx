// src/pages/admin/AdminNotificationForm.jsx
import React, { useState } from "react";
import toast from "react-hot-toast"; // ✅ Optional but recommended
import Layout from "./layout/Layout"

export default function AdminNotificationForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Please enter both title and message");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/sendNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Notification sent successfully!");
        setTitle("");
        setBody("");
      } else {
        toast.error("❌ Failed to send notification.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Error occurred while sending.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen  bg-gradient-to-br from-black via-slate-900 to-gray-800">
    <div className="max-w-xl  mx-auto pt-47 lg:pt-26 p-6 rounded-xl shadow-lg bg-[#0f172a] text-white border border-[#1e293b]">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        📢 Admin: Send Notification
      </h2>

      <label className="block font-semibold mb-1">Title:</label>
      <input
        type="text"
        placeholder="Enter Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 rounded-md bg-[#1e293b] border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <label className="block font-semibold mb-1">Message:</label>
      <textarea
        placeholder="Enter Notification Message"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-3 mb-6 h-32 rounded-md bg-[#1e293b] border border-[#334155] text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full py-3 bg-yellow-400 text-[#0f172a] font-bold rounded-lg hover:bg-yellow-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "🚀 Send Notification"}
      </button>
    </div>
    </div>
    </Layout>
  );
}
