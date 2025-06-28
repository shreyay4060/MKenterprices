import React from "react";

export default function ReviewMsg({ reviews }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map(({ id, name, email, message, date }) => (
        <div
          key={id}
          className="bg-gray-800 text-white border border-yellow-500 p-6 rounded-2xl shadow-lg hover:shadow-gray-600 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-yellow-300 mb-1">{name}</h3>
          <p className="text-sm text-gray-400 mb-3">{email}</p>
          <p className="text-white mb-4">{message}</p>
          <p className="text-xs text-right text-gray-400">
            {date?.seconds ? new Date(date.seconds * 1000).toLocaleString() : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
