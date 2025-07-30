import React, { useState, useEffect } from "react";
import axios from "axios";
import BidInterface from "../components/BidInterface";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/auctions/get`, {
          withCredentials: true,
        });
        setAuctions(res.data || []);
      } catch (err) {
        console.error("Error fetching auctions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handlePlaceBid = (auction) => {
    setSelectedAuction(auction);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        {selectedAuction
          ? t("placeBidHeading", { crop: selectedAuction.crop })
          : t("liveAuctionsHeading")}
      </h1>

      {selectedAuction ? (
        <div className="max-w-2xl mx-auto">
          <BidInterface
            auctionId={selectedAuction._id}
            cropName={selectedAuction.crop}
            currentBid={selectedAuction.basePrice}
            auctionEndTime={selectedAuction.endTime}
            onBack={() => setSelectedAuction(null)}
          />
        </div>
      ) : loading ? (
        <p className="text-center text-gray-500">{t("loadingAuctions")}</p>
      ) : auctions.length === 0 ? (
        <p className="text-center text-red-500">{t("noAuctions")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <div
              key={auction._id}
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
                    <span className="font-semibold">{t("basePrice")}:</span> ₹{auction.basePrice}/quintal
                  </p>
                  <p>
                    <span className="font-semibold">{t("endsAt")}:</span>{" "}
                    {new Date(auction.endTime).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handlePlaceBid(auction)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition dark:bg-green-700 dark:hover:bg-green-600"
                >
                  {t("placeBidButton")}
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

