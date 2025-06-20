import React from 'react';
import { useNavigate } from 'react-router';
import Loader from '../../components/loader/Loader';

export default function Login() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-violet-200 px-4">
      <div className="w-70 max-w-md bg-white py-11 px-5 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-violet-700 mb-6">
          Login to your account
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <span onClick={()=>navigate("/signup")} className="text-violet-700 font-semibold cursor-pointer hover:underline">Sign up</span>
        </p>
      </div>
      <Loader />
    </div>
  );
}
