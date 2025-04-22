

import React from "react";
import loginImage from '../assets/login.webp'

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
        <img src={loginImage} alt="Agriculture Login" className="w-full h-full object-cover" />
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Login to AgriAuction Hub</h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-green-600 underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
