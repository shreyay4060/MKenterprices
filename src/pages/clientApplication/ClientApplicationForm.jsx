import React, { useState, useContext } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";

export default function ClientApplicationForm() {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const [client, setClient] = useState({
    companyName: "",
    clientName: "",
    email: "",
    workName: "",
    fromDate: "",
    toDate: "",
    salaryPerPerson: "",
    numberOfWorkers: "",
    timeFrom: "",
    timeTo: "",
    address: "",
    contact: "",
    description: "",
    countryCode: "+91",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setClient((prev) => ({ ...prev, contact: cleaned }));
    } else if (name === "numberOfWorkers" || name === "salaryPerPerson") {
      const cleaned = value.replace(/\D/g, "");
      setClient((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setClient((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const {
      companyName,
      clientName,
      email,
      workName,
      fromDate,
      toDate,
      salaryPerPerson,
      numberOfWorkers,
      timeFrom,
      timeTo,
      address,
      contact,
      description,
      location
    } = client;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (
      !companyName ||
      !clientName ||
      !email ||
      !workName ||
      !fromDate ||
      !toDate ||
      !salaryPerPerson ||
      !numberOfWorkers ||
      !timeFrom ||
      !timeTo ||
      !address ||
      !contact ||
      !description ||
      !location
    ) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (!nameRegex.test(clientName)) {
      toast.error("Client name must not contain numbers or special characters");
      return false;
    }

    if (!nameRegex.test(companyName)) {
      toast.error("Company name must not contain numbers or special characters");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(contact)) {
      toast.error("Contact must be a valid 10-digit Indian phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(fireDB, "clients"), {
        ...client,
        contact: `${client.countryCode} ${client.contact}`,
        salaryPerPerson: Number(client.salaryPerPerson),
        numberOfWorkers: Number(client.numberOfWorkers),
        submittedAt: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });

      toast.success("Client application submitted");

      setClient({
        companyName: "",
        clientName: "",
        email: "",
        workName: "",
        fromDate: "",
        toDate: "",
        salaryPerPerson: "",
        numberOfWorkers: "",
        timeFrom: "",
        timeTo: "",
        address: "",
        contact: "",
        description: "",
        countryCode: "+91",
        location: ""
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting client application:", error);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="min-h-screen pt-28 px-4 bg-gradient-to-br from-slate-900 via-black to-gray-800 text-white py-10 overflow-x-hidden">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl p-6 shadow-lg border border-yellow-500">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
            Client Application Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <label className="block text-sm">Company Name</label>
            <input type="text" name="companyName" placeholder="Company Name" value={client.companyName} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />

            <label className="block text-sm">Client Name</label>
            <input type="text" name="clientName" placeholder="Client Name" value={client.clientName} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />

            <label className="block text-sm">Email</label>
            <input type="email" name="email" placeholder="Client/Company Email" value={client.email} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />

            <label className="block text-sm">Work Name</label>
            <input type="text" name="workName" placeholder="Work Name" value={client.workName} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />

            <label className="block text-sm">Work Address</label>
            <input type="text" name="address" placeholder="Work Address" value={client.address} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
            <label className="block text-sm">Location</label>
            <input type="text" name="location" placeholder="Location" value={client.location} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
            <label className="block text-sm">Work Description</label>
            <textarea name="description" placeholder="Work Description" value={client.description} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded resize-none" rows={4} />


            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm">From Date</label>
                <input type="date" name="fromDate" value={client.fromDate} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
              </div>
              <div className="flex-1">
                <label className="block text-sm">To Date</label>
                <input type="date" name="toDate" value={client.toDate} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" name="salaryPerPerson" placeholder="Salary Per Person (INR)" value={client.salaryPerPerson} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
              <input type="text" name="numberOfWorkers" placeholder="Number of Workers" value={client.numberOfWorkers} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input type="time" name="timeFrom" value={client.timeFrom} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
              <input type="time" name="timeTo" value={client.timeTo} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />
            </div>


            <div className="flex gap-4">
              <select name="countryCode" value={client.countryCode} onChange={handleChange} className="w-28 p-3 bg-gray-800 border border-gray-600 rounded">
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input type="tel" name="contact" placeholder="Contact Number" value={client.contact} onChange={handleChange} className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded" />
            </div>

            <button type="submit" disabled={loading} className={`w-full py-2 font-semibold rounded transition duration-200 ${
              loading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-black"
            }`}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
