import React from 'react';

const Home = () => {
  return (
    <div className="bg-green-50">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-green-600 text-white">
        <div className="text-center px-4 md:px-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Welcome to AgriAuction Hub
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Bid on agricultural crops in real-time, anywhere, anytime.
          </p>
          <div className="mt-8">
            <a
              href="/auctions"
              className="bg-yellow-500 text-green-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all"
            >
              Start Bidding Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700">How It Works</h2>
          <p className="mt-4 text-gray-600">Your gateway to real-time crop auctions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-green-700">Create Auctions</h3>
            <p className="mt-4 text-gray-700">Farmers can easily list crops for sale in a few steps.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-green-700">Live Bidding</h3>
            <p className="mt-4 text-gray-700">Buyers place bids in real-time, ensuring competitive pricing.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-green-700">Transaction History</h3>
            <p className="mt-4 text-gray-700">All auction results are recorded for transparency and trust.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="text-center px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-4">Ready to join the auction?</h2>
          <p className="text-lg mb-6">Sign up now and start bidding on fresh crops from trusted farmers.</p>
          <a
            href="/auth"
            className="bg-yellow-500 text-green-700 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 hover:text-white transition-all"
          >
            Join AgriAuction Hub
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
