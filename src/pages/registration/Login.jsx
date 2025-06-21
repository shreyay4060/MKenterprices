import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

export default function Login({ onClose }) {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(myContext);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLoginFun = async (e) => {
    e.preventDefault();
    const { email, password } = userLogin;

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      navigate("/homePage");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials or user not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      {loading && <Loader />}
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-8 rounded-xl shadow-2xl border border-yellow-500">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-300 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={userLoginFun} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userLogin.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => {
              onClose(); 
              navigate("/signup");
            }}
            className="text-yellow-400 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
