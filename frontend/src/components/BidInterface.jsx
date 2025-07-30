import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const BidInterface = ({ auctionId, cropName, currentBid, auctionEndTime, onBack }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (parseInt(bidAmount) <= parseInt(currentBid)) {
      setError("Bid must be higher than the current bid!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/bids`, { auctionId,bidAmount: parseInt(bidAmount)},{
          headers: {
           Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      toast.success(res.data.message || `Bid of ₹${bidAmount} placed successfully!`);
      setBidAmount("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong while placing the bid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <button onClick={onBack} className="text-green-700 mb-4 hover:underline">
          ← Back to Auctions
        </button>

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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded ${
                isSubmitting ? "bg-gray-400" : "bg-green-600 text-white"
              } hover:bg-green-700 transition`}
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


// import React, { useState } from "react";

// const BidInterface = ({ cropName, currentBid, auctionEndTime }) => {
//   const [bidAmount, setBidAmount] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleBidChange = (e) => {
//     setBidAmount(e.target.value);
//   };

//   const handleBidSubmit = (e) => {
//     e.preventDefault();
//     if (parseInt(bidAmount) <= currentBid) {
//       alert("Bid must be higher than the current bid!");
//     } else {
//       setIsSubmitting(true);
//       // Simulate bid submission (API request or socket event)
//       setTimeout(() => {
//         setIsSubmitting(false);
//         alert(`Bid of ₹${bidAmount} placed successfully!`);
//       }, 1500);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
//         <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
//           Place Your Bid for {cropName}
//         </h2>

//         <div className="text-center mb-6">
//           <p className="text-lg text-gray-700">
//             <span className="font-semibold">Current Bid:</span> ₹{currentBid}
//           </p>
//           <p className="text-md text-gray-600 mt-2">
//             Auction ends at: {new Date(auctionEndTime).toLocaleString()}
//           </p>
//         </div>

//         {/* Bid Form */}
//         <form onSubmit={handleBidSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Your Bid (₹)</label>
//             <input
//               type="number"
//               value={bidAmount}
//               onChange={handleBidChange}
//               required
//               className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter your bid amount"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-2 rounded ${isSubmitting ? "bg-gray-400" : "bg-green-600 text-white"} hover:bg-green-700 transition`}
//             >
//               {isSubmitting ? "Placing Bid..." : "Place Bid"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BidInterface;
