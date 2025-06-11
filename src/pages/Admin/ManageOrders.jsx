// src/ManageOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com"
;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("No token found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders. Make sure you're logged in as admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, BASE_URL]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/api/orders/${orderId}/status`,
        { status: newStatus.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus.toLowerCase() } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg text-gray-600">Loading orders...</p>;
  if (error)
    return <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Manage Orders</h1>

      {/* Mobile View */}
      <div className="space-y-4 sm:hidden">
        {orders.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No orders found.</div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.user?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-green-600 font-semibold">
                <strong>Total:</strong> ₹{order.total || order.price || "N/A"}
              </p>
              <p className="capitalize text-blue-700 font-medium">
                <strong>Status:</strong> {order.status}
              </p>
              <div className="mt-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase">Order ID</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Customer</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Date</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Total</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Status</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{order._id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-green-600 font-semibold">
                    ₹{order.total || order.price || "N/A"}
                  </td>
                  <td className="px-6 py-4 capitalize text-blue-700 font-medium">
                    {order.status}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
