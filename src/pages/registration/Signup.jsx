import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

export default function Signup({ onClose }) {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  function handleChangeFun(event) {
    const { name, value } = event.target;
    setUserSignup((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const userSignupFun = async (e) => {
    e.preventDefault();
    const { name, email, password } = userSignup;
    if (!name || !email || !password) {
      return toast.error("Please fill all the fields");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name,
        email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userSignupRef = collection(fireDB, "user");
      await addDoc(userSignupRef, user);

      setUserSignup({ name: "", email: "", password: "" });
      toast.success("You are signed up successfully");
      navigate("/homePage");
    } catch (error) {
      console.log(error);
      toast.error("Failed to signup, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/60">
      {loading && <Loader />}
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-8 rounded-xl shadow-2xl border border-violet-600">
        <button
          className="absolute top-2 right-3 text-gray-300 hover:text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Create a New Account
        </h2>
        <form onSubmit={userSignupFun} className="space-y-4">
          <input
            type="text"
            onChange={handleChangeFun}
            value={userSignup.name}
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            value={userSignup.email}
            onChange={handleChangeFun}
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            onChange={handleChangeFun}
            name="password"
            value={userSignup.password}
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
