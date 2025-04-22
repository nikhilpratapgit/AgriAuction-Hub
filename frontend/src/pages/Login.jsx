import React, { useState } from 'react';
import loginImage from '../assets/login.webp'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-gray-50">
      {/* Left side: Login form */}
      <div className="w-full md:w-1/2 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Login to AgriAuction Hub</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-green-600 hover:underline">Register here</a></p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="w-full md:w-1/2 h-full bg-cover bg-center">
        {/* This is where you add the background image URL for griculture auction */}
        <img src={loginImage} alt='login image'/>
      </div>
    </div>
  );
};

export default Login;
