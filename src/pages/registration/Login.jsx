// ✅ Login.jsx - only the Firestore query logic is changed to use `doc()`
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Layout from "../../components/layout/Layout";
import { requestNotificationPermission } from "../../firebase/messaging";

export default function Login() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(myContext);
  const [close, setClose] = useState(false);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  function onClose() {
    setClose(true);
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const userLoginFun = async (e) => {
    e.preventDefault();
    const { email, password } = userLogin;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      const user = users.user;

      const userDocRef = doc(fireDB, "user", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        const fcmToken = await requestNotificationPermission(user.uid);
        console.log("\ud83d\udd14 FCM Token:", fcmToken);

        if (fcmToken) {
          await setDoc(userDocRef, { ...userData, fcmToken }, { merge: true });
          localStorage.setItem("users", JSON.stringify({ ...userData, fcmToken }));
        } else {
          localStorage.setItem("users", JSON.stringify(userData));
        }

        toast.success("Login successful");
        setUserLogin({ email: "", password: "" });

        if (userData.role === "user") {
          navigate("/userDashboard");
        } else {
          navigate("/adminDashboard");
        }
      } else {
        toast.error("User not found in Firestore");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid credentials or network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    !close && (
      <Layout>
        {loading && <Loader />}
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-8 rounded-xl shadow-2xl border border-yellow-500">
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-200 hover:scale-125 hover:text-amber-400 text-3xl"
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
                disabled={loading}
                className={`w-full py-2 font-semibold rounded transition duration-200 ${
                  loading
                    ? "bg-yellow-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-yellow-400 font-semibold cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </Layout>
    )
  );
}
