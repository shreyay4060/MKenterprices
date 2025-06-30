import React, { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

export default function ClientApplications() {
  const {
    getAllClientApplications,
    deleteClientApplicationFun,
    loading,
    getAllClientApplicationsFun,
  } = useContext(myContext);

  const navigate = useNavigate();

  useEffect(() => {
    getAllClientApplicationsFun();
  }, []);

  const formatDateTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateOnly = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
    });
  };

  const handleAddToWork = async (app) => {
    try {
      const newWork = {
        title: app.workName || "",
        image: "", // Optional: populate if image data is available
        place: app.address || "",
        location: app.location || "",
        description: app.description || "",
        salary: app.salaryPerPerson || "",
        time: `${app.timeFrom || ""} - ${app.timeTo || ""}`,
        fromDate: app.fromDate || "",
        toDate: app.toDate || "",
        postedDate: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      if (!newWork.title || !newWork.location || !newWork.salary) {
        toast.error("Missing required fields: title, location, or salary");
        return;
      }

      await addDoc(collection(fireDB, "work"), newWork);
      toast.success("Work added successfully");
    } catch (error) {
      console.error("Error adding to work:", error);
      toast.error("Failed to add to work");
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="min-h-screen mt-24 bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10">
            All Client Applications
          </h2>

          {getAllClientApplications.length === 0 ? (
            <p className="text-center text-gray-400">No applications found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAllClientApplications.map((app, index) => (
                <div
                  key={app.id}
                  className="bg-gray-800 border border-yellow-500 rounded-xl p-4 shadow-lg relative overflow-hidden break-words"
                >
                  <div className="absolute top-2 right-3 text-xs text-gray-400">
                    {formatDateTime(app.submittedAt)}
                  </div>

                  <h3 className="text-lg font-bold text-yellow-300 mb-2">
                    {app.workName} — {app.companyName}
                  </h3>

                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Client:</span>{" "}
                    {app.clientName}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Email:</span>{" "}
                    {app.email}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Date:</span>{" "}
                    {formatDateOnly(app.fromDate)} - {formatDateOnly(app.toDate)}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Time:</span>{" "}
                    {app.timeFrom} - {app.timeTo}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Salary:</span>{" "}
                    ₹{app.salaryPerPerson} / day
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Workers:</span>{" "}
                    {app.numberOfWorkers}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Contact:</span>{" "}
                    {app.contact}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-yellow-200">Location:</span>{" "}
                    {app.location || "N/A"}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold text-yellow-200">Address:</span>{" "}
                    {app.address}
                  </p>
                  {app.description && (
                    <p className="text-sm italic text-gray-300 mb-2 break-words">
                      <span className="text-yellow-600">Description : </span> {app.description}
                    </p>
                  )}

                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => deleteClientApplicationFun(app.id)}
                      className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                    >
                      <FaTrash />
                      Delete
                    </button>
                    <button
                      onClick={() => handleAddToWork(app)}
                      className="mt-2 text-green-400 hover:text-green-600 text-sm underline"
                    >
                      Add to Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
