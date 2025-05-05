import React, { useState } from "react";
import axios from "axios";

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    crop: "",
    description: "",
    basePrice: "",
    quantity: "",
    endTime: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get token from storage
    console.log(token)

    const auctionData = new FormData();
    auctionData.append("crop", formData.crop);
    auctionData.append("description", formData.description);
    auctionData.append("basePrice", formData.basePrice);
    auctionData.append("quantity", formData.quantity);
    auctionData.append("endTime", formData.endTime);
    // if (image) auctionData.append("image", image);

    try {
        console.log(token)
      const res = await axios.post("http://localhost:8000/api/v1/auctions", auctionData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`, 
        }
      });
      alert("Auction created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error creating auction:", err);
      alert("Failed to create auction.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Create New Auction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crop Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Crop Name</label>
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Wheat, Rice"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe your crop quality and details"
            />
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Base Price (₹/quintal)</label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Quantity (in quintals)</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Auction End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          {/* <div>
            <label className="block text-sm font-semibold text-gray-700">Upload Crop Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full"
            />
          </div>  */}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Submit Auction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
