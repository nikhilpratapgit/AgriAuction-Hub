import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">Farmer Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg text-gray-500">Total Auctions</h2>
          <p className="text-3xl font-semibold text-green-700">12</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg text-gray-500">Active Bids</h2>
          <p className="text-3xl font-semibold text-green-700">4</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg text-gray-500">Transactions</h2>
          <p className="text-3xl font-semibold text-green-700">₹82,000</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Create New Auction</h3>
          <p className="text-gray-600 mb-4">Start selling your crops now by creating a new auction listing.</p>
          <a
            href="/create"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Create Auction
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Auction History</h3>
          <p className="text-gray-600 mb-4">View details of past and completed crop auctions.</p>
          <a
            href="/history"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            View History
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
