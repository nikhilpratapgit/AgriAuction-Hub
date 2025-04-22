import React, { useState, useEffect } from "react";
import corn from '../assets/corn.jpg'
import potato from '../assets/potato.jpg'
import rice from '../assets/rice.jpeg'
import tamato from '../assets/tamato1.jpg'
import wheat from '../assets/wheat.webp'

const AuctionDetail = () => {
  const [timeLeft, setTimeLeft] = useState(330);
  const [timeLeftCorn, setTimeLeftCorn] = useState(500);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      setTimeLeftCorn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="bg-[#E5F4E3] font-poppins">
      <header className="text-center py-5 bg-green-600 text-white shadow-md">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-sm">View past and ongoing auction records.</p>
      </header>

      <section id="history" className="mt-6 space-y-6">
        {/* Reusable Item UI */}
        {[
          {
            image: wheat,
            title: "Fresh Wheat",
            status: "✅ Completed",
            price: "$180",
            winner: "John Doe",
            time: "22 April 2025, 10:45 AM",
          },
          {
            image: tamato,
            title: "Organic Tomatoes",
            status: "🔄 Ongoing",
            price: "$130",
            timeLeft: formatTime(timeLeft),
          },
          {
            image: rice,
            title: "Premium Basmati Rice",
            status: "✅ Completed",
            price: "$250",
            winner: "Jane Smith",
            time: "20 April 2025, 03:15 PM",
          },
          {
            image: corn,
            title: "Sweet Corn",
            status: "🔄 Ongoing",
            price: "$75",
            timeLeft: formatTime(timeLeftCorn),
          },
          {
            image: potato,
            title: "Golden Potatoes",
            status: "✅ Completed",
            price: "$95",
            winner: "Alex Brown",
            time: "19 April 2025, 04:10 PM",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-white p-5 rounded-lg shadow-md mx-auto w-11/12 md:w-4/5 text-center border-l-4 ${
              item.status.includes("Completed") ? "border-green-600" : "border-yellow-500"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-36 h-36 rounded-full mx-auto mb-3 object-cover"
            />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p><strong>{item.status.includes("Completed") ? "Winning Bid" : "Current Highest Bid"}:</strong> {item.price}</p>
            {item.winner && <p><strong>Winner:</strong> {item.winner}</p>}
            <p><strong>Status:</strong> {item.status}</p>
            {item.time && <p><strong>Timestamp:</strong> {item.time}</p>}
            {item.timeLeft && <p><strong>Ends In:</strong> <span>{item.timeLeft}</span></p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default AuctionDetail;

