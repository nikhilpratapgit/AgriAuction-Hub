import React from 'react';
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

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/auctions" element={<AuctionList/>} />
            <Route path="/auction/:id" element={<AuctionDetail/>} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
