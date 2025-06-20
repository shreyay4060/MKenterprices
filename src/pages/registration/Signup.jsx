import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

export default function Signup() {
  // navigation
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // signup state
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // handleChange function
  function handleChangeFun(event) {
    const { name, value } = event.target;

    setUserSignup((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // console.log(signup)
  }

  // signup function
  const userSignupFun = async (e) => {
    e.preventDefault(); // ✅ This prevents page reload

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

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-violet-200 px-4">
      {/* loader */}
      <div className=" flex justify-center mt-10">{loading && <Loader />}</div>
      <div className="w-70 max-w-md bg-white px-5 py-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-violet-700 mb-6">
          Create a new account
        </h2>
        <form onSubmit={userSignupFun} className="space-y-4">

          <input
            type="text"
            onChange={handleChangeFun}
            value={userSignup.name}
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            type="email"
            value={userSignup.email}
            onChange={handleChangeFun}
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            type="password"
            onChange={handleChangeFun}
            name="password"
            value={userSignup.password}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-violet-700 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
