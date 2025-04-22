import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold">AgriAuction Hub</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-green-200">Home</Link>
            <Link to="/auctions" className="hover:text-green-200">Auctions</Link>
            <Link to="/dashboard" className="hover:text-green-100">Dashboard</Link>
            <Link to="/create" className="hover:text-green-200">Create Auction</Link>
            <Link to="/history" className="hover:text-green-200">History</Link>
            <Link to="/login" className="hover:text-green-200">Login</Link>
            <Link to="/register" className="hover:text-green-200">Register</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Home</Link>
          <Link to="/auctions" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Auctions</Link>
          <Link to="/create" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Create Auction</Link>
          <Link to="/history" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">History</Link>
          <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Login</Link>
          <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
