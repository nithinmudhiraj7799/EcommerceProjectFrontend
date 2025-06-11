import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerceprojectbackend-em29.onrender.com/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to fetch your orders.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError("Please log in to view your dashboard.");
    }
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">
        Welcome, {user?.name || user?.email?.split("@")[0] || "User"} 👋
      </h1>

      {/* Action Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        <Link
          to="/cart"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform flex flex-col items-center"
        >
          <span className="text-4xl mb-2">🛒</span>
          <h2 className="text-xl font-semibold">View Cart</h2>
          <p className="mt-2 text-center text-white/90">
            Check your cart and update items.
          </p>
        </Link>

        <Link
          to="/products"
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform flex flex-col items-center"
        >
          <span className="text-4xl mb-2">🛍️</span>
          <h2 className="text-xl font-semibold">Shop Products</h2>
          <p className="mt-2 text-center text-white/90">
            Browse and add products to cart.
          </p>
        </Link>

        <Link
          to="/checkout"
          className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform flex flex-col items-center"
        >
          <span className="text-4xl mb-2">🚚</span>
          <h2 className="text-xl font-semibold">Place Order</h2>
          <p className="mt-2 text-center text-white/90">
            Proceed to checkout and place your order.
          </p>
        </Link>
      </section>

      <h2 className="text-2xl font-semibold mb-4">🧾 My Recent Orders</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found yet. Start shopping!</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Order ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Items</th>
                <th className="px-6 py-3 text-center font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 capitalize">{order.status}</td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    {order.items.map((item, i) => (
                      <div key={i} className="truncate">
                        {item.product?.name || "Item"} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/order/${order._id}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md transition inline-block cursor-pointer"
                      aria-label={`View details for order ${order._id.slice(-6)}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
