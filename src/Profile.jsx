// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

const Profile = () => {
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        setPurchased(res.data.purchased || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load profile data", error);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Typography className="text-center py-20">Loading...</Typography>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <Typography variant="h4" className="mb-6">Orders</Typography>

        {purchased.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center shadow">
            <Typography variant="h6" className="text-gray-700 mb-1">No orders yet</Typography>
            <Typography variant="small" className="text-gray-500">Go to store to place an order.</Typography>
          </div>
        ) : (
          <div className="grid gap-6">
            {purchased.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex items-start gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="small" className="text-gray-600">Size: {item.size}</Typography>
                  <Typography variant="small" className="text-gray-600">Qty: {item.quantity}</Typography>
                  <Typography variant="paragraph" className="text-gray-900 font-semibold mt-1">
                    Total: LE {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
