import React, { useState } from 'react';
import axios from 'axios';
import loginImage from '../assets/login.webp';
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', formData);
      console.log('Login successful:', response.data);
      toast.success("Login Successfully")
      // Store token or user info in localStorage or context
      localStorage.setItem('token', response.data.token);
      window.location.href = '/'; // redirect after login
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err)
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
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
