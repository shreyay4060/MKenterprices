import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { auth, fireDB, googleProvider } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { requestNotificationPermission } from "../../firebase/messaging";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";

export default function Signup() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [close, setClose] = useState(false);

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    fcmToken: "",
  });

  function onClose() {
    setClose(true);
    navigate("/");
  }

  function handleChangeFun(event) {
    const { name, value } = event.target;
    setUserSignup((prev) => ({ ...prev, [name]: value }));
  }

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);

      let userData;
      const fcmToken = await requestNotificationPermission(user.uid);

      if (snapshot.empty) {
        userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          role: "user",
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
        if (fcmToken) userData.fcmToken = fcmToken;

        await setDoc(doc(fireDB, "user", user.uid), userData);
        userData = { ...userData, id: user.uid };
      } else {
        const docSnap = snapshot.docs[0];
        userData = { id: docSnap.id, ...docSnap.data() };
        if (fcmToken) userData.fcmToken = fcmToken;

        await setDoc(doc(fireDB, "user", userData.id), userData);
      }

      localStorage.setItem("users", JSON.stringify(userData));
      toast.success("Signed in with Google");
      navigate("/homePage");
    } catch (error) {
      console.error("Google Signup Error", error);
      toast.error(`Google Signup Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const userSignupFun = async (e) => {
    e.preventDefault();
    const { name, email, password } = userSignup;

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!name || !email || !password)
      return toast.error("Please fill all the fields");
    if (!nameRegex.test(name))
      return toast.error(
        "Name must be at least 3 letters and contain only alphabets and spaces"
      );
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const fcmToken = await requestNotificationPermission(user.uid);

      const userData = {
        name,
        email,
        uid: user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      if (fcmToken) userData.fcmToken = fcmToken;

      await setDoc(doc(fireDB, "user", user.uid), userData);

      localStorage.setItem(
        "users",
        JSON.stringify({ ...userData, id: user.uid })
      );
      setUserSignup({ name: "", email: "", password: "", fcmToken: "" });
      toast.success("You are signed up successfully");
      navigate("/homePage");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use")
        toast.error("Email is already registered");
      else if (error.code === "auth/invalid-email")
        toast.error("Invalid email format");
      else if (error.code === "auth/weak-password")
        toast.error("Password should be at least 6 characters");
      else toast.error("Failed to signup, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    !close && (
      <Layout>
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/60">
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-8 rounded-xl shadow-2xl border border-violet-600 transition-transform duration-300 hover:scale-105">
            <button
              className="absolute top-2 right-3 text-gray-300 hover:text-amber-500 hover:scale-125 text-3xl"
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
                name="name"
                value={userSignup.name}
                onChange={handleChangeFun}
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                name="email"
                value={userSignup.email}
                onChange={handleChangeFun}
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="password"
                name="password"
                value={userSignup.password}
                onChange={handleChangeFun}
                placeholder="Password"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-yellow-400 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm mb-2">or</p>
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full py-2 px-4 flex items-center justify-center gap-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
}
