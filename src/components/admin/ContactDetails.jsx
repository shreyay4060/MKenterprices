import React, { useContext } from 'react';
import myContext from '../../context/myContext';

export default function ContactDetails() {
  const context = useContext(myContext);
  const { getAllContactMsg, deleteContactMsgFun } = context;

  return (
    <div className="px-4 py-6 space-y-4 text-white">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Contact Messages</h2>

      {getAllContactMsg.length === 0 ? (
        <p className="text-gray-400">No contact messages found.</p>
      ) : (
        getAllContactMsg.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-lg border border-violet-600 w-full lg:w-md shadow-md"
          >
            <p><span className="text-yellow-400 font-medium">Name:</span> {item.name}</p>
            <p><span className="text-yellow-400 font-medium">Email:</span> {item.email}</p>
            <p><span className="text-yellow-400 font-medium">Message:</span> {item.message}</p>
            <p className="text-sm text-gray-400">Time: {item.date}</p>

            {/* Optional delete button */}
            <button
              onClick={() => deleteContactMsgFun(item.id)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
