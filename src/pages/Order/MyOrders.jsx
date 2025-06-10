import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Get user from localStorage safely
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5004/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to fetch your orders.");
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError("Please log in to see your orders.");
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name || user?.email?.split("@")[0] || "User"} 👋
      </h1>

      <h2 className="text-2xl font-semibold mt-6 mb-4">My Recent Orders</h2>

      {error && <p className="text-red-600">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2 capitalize">{order.status}</td>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.product?.name || "Item"} × {item.quantity}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboardPage;
