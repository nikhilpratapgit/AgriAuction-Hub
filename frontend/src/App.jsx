import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateAuction from './pages/CreateAuction';
import AuctionList from './pages/AuctionList';
import AuctionDetail from './pages/AuctionDetail';
import { Toaster } from "react-hot-toast";
import Verify from './components/Verify';
import GoogleLoginDashboard from './components/GoogleLoginDashboard';
import Profile from './components/Profile';

const App = () => {

  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  useEffect(() => {

    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar  toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode} />
        <Toaster position="top-right" reverseOrder={false} />
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/auctions" element={<AuctionList />} />
            <Route path="/history" element={<AuctionDetail />} />
            <Route path="/verify-email/:token" element={<Verify />} />
            <Route path="/google-dashboard" element={<GoogleLoginDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
