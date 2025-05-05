import React, { useState } from "react";
import axios from "axios";
import registerImage from '../assets/register.avif';
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    name :"",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/register", formData);
      toast.success("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
        <img src={registerImage} alt="Register for Agriculture" className="w-full h-full object-cover" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Create Account</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? <a href="/login" className="text-green-600 underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
