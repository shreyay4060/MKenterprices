import React, { useContext } from "react";
import myContext from "../../context/myContext";

export default function ContactDetails() {
  const context = useContext(myContext);
  const { getAllContactMsg, deleteContactMsgFun } = context;

  // Helper to format Firestore Timestamp or ISO date string
  const formatDateTime = (date, time) => {
    try {
      let jsDate;

      if (date?.seconds) {
        jsDate = new Date(date.seconds * 1000); // Convert Firestore Timestamp to JS Date
      } else {
        jsDate = new Date(date); // Fallback for plain date string
      }

      const formattedDate = jsDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

      let formattedTime = "N/A";
      if (time?.seconds) {
        const timeObj = new Date(time.seconds * 1000);
        formattedTime = timeObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (typeof time === "string") {
        formattedTime = time;
      }

      return `${formattedDate} at ${formattedTime}`;
    } catch (err) {
      return "Invalid date/time";
    }
  };

  return (
    <div className="px-4 py-6 text-white">
      <h2 className="text-xl font-bold text-yellow-400 mb-6">
        Contact Messages
      </h2>

      {getAllContactMsg.length === 0 ? (
        <p className="text-gray-400">No contact messages found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getAllContactMsg.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#010320] via-[#010e50] to-[#021b57] p-5 rounded-xl border border-violet-600 shadow-md"
            >
              <p>
                <span className="text-yellow-400 font-medium">Name:</span>{" "}
                {item.name}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Email:</span>{" "}
                {item.email}
              </p>
              <p>
                <span className="text-yellow-400 font-medium">Message:</span>{" "}
                {item.message}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Time: {formatDateTime(item.date, item.time)}
              </p>

              <div className="flex gap-6 mt-4">
                <a href={`mailto:${item.email}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-black py-1 px-4 rounded text-sm">
                    Send Mail
                  </button>
                </a>

                <button
                  onClick={() => deleteContactMsgFun(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
