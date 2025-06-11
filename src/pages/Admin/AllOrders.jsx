// src/AllOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com"
;

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;

      const response = await axios.get(`${BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.error("❌ Error fetching all orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow mt-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">📦 All Orders (Admin)</h2>

      {loading ? (
        <p className="text-center text-gray-500 py-6">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600 py-6">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-300 p-4 rounded shadow-sm bg-gray-50">
              <p className="font-semibold text-indigo-600">Order ID: {order._id}</p>
              <p className="text-sm text-gray-700">
                👤 User: {order.user?.name || "Unknown"} ({order.user?.email || "No email"})
              </p>
              <p className="text-sm text-gray-600">
                🗓️ Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-800">
                Status: <span className="capitalize font-medium">{order.status || "pending"}</span>
              </p>

              <div className="mt-2">
                <h4 className="font-semibold text-sm">🛒 Items:</h4>
                <ul className="list-disc pl-5 mt-1 text-sm">
                  {order.items.map(({ product, quantity }) => (
                    <li key={product?._id}>
                      {product?.name || "Product info unavailable"} — Qty: {quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {order.address && (
                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-semibold">📍 Shipping Address:</h4>
                  <p>
                    {order.address.houseNo}, {order.address.street},<br />
                    {order.address.city}, {order.address.state} - {order.address.pinCode}
                  </p>
                  {order.address.landmark && <p>Landmark: {order.address.landmark}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
