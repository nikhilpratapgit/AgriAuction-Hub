
import React, { useState } from "react";
import wheat from '../assets/wheat.avif';
import rice from '../assets/rice.avif';
import tomatos from '../assets/tomatos.avif';
import BidInterface from "../components/BidInterface"; // Import your bidding component

const auctions = [
  {
    id: 1,
    crop: "Wheat",
    description: "Premium quality wheat grown in Punjab fields.",
    image: wheat,
    basePrice: "₹1600",
    endTime: "2025-04-25 18:00",
  },
  {
    id: 2,
    crop: "Rice",
    description: "Fresh Basmati rice from Haryana.",
    image: rice,
    basePrice: "₹2200",
    endTime: "2025-04-24 16:00",
  },
  {
    id: 3,
    crop: "Tomatoes",
    description: "Red ripe tomatoes freshly harvested.",
    image: tomatos,
    basePrice: "₹1000",
    endTime: "2025-04-23 14:00",
  },
];

const AuctionPage = () => {
  const [selectedAuction, setSelectedAuction] = useState(null);

  const handlePlaceBid = (auction) => {
    setSelectedAuction(auction);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        {selectedAuction ? `Place Bid for ${selectedAuction.crop}` : "Live Crop Auctions"}
      </h1>

      {selectedAuction ? (
        <div className="max-w-2xl mx-auto">
          <BidInterface
            cropName={selectedAuction.crop}
            currentBid={selectedAuction.basePrice}
            auctionEndTime={selectedAuction.endTime}
            onBack={() => setSelectedAuction(null)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={auction.image}
                alt={auction.crop}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-green-800">{auction.crop}</h2>
                <p className="text-gray-600 text-sm mt-1">{auction.description}</p>

                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Base Price:</span> {auction.basePrice}/quintal
                  </p>
                  <p>
                    <span className="font-semibold">Ends At:</span> {auction.endTime}
                  </p>
                </div>

                <button
                  onClick={() => handlePlaceBid(auction)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionPage;
