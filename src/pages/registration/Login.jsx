import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import Layout from "../../components/layout/Layout";

export default function Login() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(myContext);

  // close state 
  const [close , setClose] = useState(false)
  function onClose (){
    setClose(true);
    navigate("/")
  } 

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
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Firebase auth
      const users = await signInWithEmailAndPassword(auth, email, password);
      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users.user.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        localStorage.setItem("users", JSON.stringify(userDoc));
        toast.success("Login successful");

        setUserLogin({ email: "", password: "" });

        if (userDoc.role === "user") {
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

  if(loading){"Loading data..."}

  return ( !close && (
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
            className="w-full bg-yellow-500 active:bg-orange-600 text-black font-semibold py-2 rounded hover:bg-yellow-600 transition"
          >
            Login
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
