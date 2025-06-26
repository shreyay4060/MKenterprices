import React, { useContext } from 'react';
import myContext from '../../context/myContext';
import { useNavigate } from 'react-router';

export default function UserDetails() {
  const context = useContext(myContext);
  const { getAllUser, deleteUserFun } = context;
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-xl font-bold text-violet-400 mb-4">User Details</h2>
      <table className="min-w-full text-sm text-left text-gray-300 border border-violet-600 rounded-xl overflow-hidden">
        <thead className="bg-violet-800 text-white uppercase text-xs">
          <tr>
            <th className="px-6 py-3 border-r border-violet-600">Sr.No.</th>
            <th className="px-6 py-3 border-r border-violet-600">ID</th>
            <th className="px-6 py-3 border-r border-violet-600">Name</th>
            <th className="px-6 py-3 border-r border-violet-600">Email</th>
            <th className="px-6 py-3 border-r border-violet-600">Role</th>
            <th className="px-6 py-3 border-r border-violet-600">Joined Date</th>
            <th className="px-6 py-3">Edit</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-violet-600">
          {getAllUser.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-red-400">
                No users found.
              </td>
            </tr>
          ) : (
            getAllUser.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-700 transition-all">
                <td className="px-6 py-3 border-r border-violet-700">{index + 1}</td>
                <td className="px-6 py-3 border-r border-violet-700">{item.id}</td>
                <td className="px-6 py-3 border-r border-violet-700">{item.name || 'N/A'}</td>
                <td className="px-6 py-3 border-r border-violet-700">{item.email || 'N/A'}</td>
                <td className="px-6 py-3 border-r border-violet-700">{item.role || 'User'}</td>
                <td className="px-6 py-3 border-r border-violet-700">
                  {item?.time?.toDate ? item.time.toDate().toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }) : 'N/A'}
                </td>
                <td className="px-6 py-3  border-r border-violet-700">
                  <button
                    onClick={() => navigate(`/updateUserDetail/${item.id}`)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6  border-r border-violet-700 py-3">
                  <button
                    onClick={() => deleteUserFun(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
