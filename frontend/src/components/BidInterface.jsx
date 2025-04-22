import React, { useState } from "react";

const BidInterface = ({ cropName, currentBid, auctionEndTime }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (parseInt(bidAmount) <= currentBid) {
      alert("Bid must be higher than the current bid!");
    } else {
      setIsSubmitting(true);
      // Simulate bid submission (API request or socket event)
      setTimeout(() => {
        setIsSubmitting(false);
        alert(`Bid of ₹${bidAmount} placed successfully!`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Place Your Bid for {cropName}
        </h2>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Current Bid:</span> ₹{currentBid}
          </p>
          <p className="text-md text-gray-600 mt-2">
            Auction ends at: {new Date(auctionEndTime).toLocaleString()}
          </p>
        </div>

        {/* Bid Form */}
        <form onSubmit={handleBidSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Your Bid (₹)</label>
            <input
              type="number"
              value={bidAmount}
              onChange={handleBidChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your bid amount"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded ${isSubmitting ? "bg-gray-400" : "bg-green-600 text-white"} hover:bg-green-700 transition`}
            >
              {isSubmitting ? "Placing Bid..." : "Place Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidInterface;
