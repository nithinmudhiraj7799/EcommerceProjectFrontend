import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaSort } from "react-icons/fa";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByRecent, setSortByRecent] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com";
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
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/api/orders/${orderId}/status`,
        { status: newStatus.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus.toLowerCase() } : order
        )
      );
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update order status.");
    }
  };

  // Delete function commented as per your request
  /*
  const handleDeleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 204) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        toast.success("Order deleted successfully!");
      } else {
        toast.error("Failed to delete order. Please try again.");
      }
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Failed to delete order.");
    }
  };
  */

  const filteredOrders = orders
    .filter((order) =>
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((order) =>
      statusFilter === "all" ? true : order.status === statusFilter
    )
    .sort((a, b) => {
      return sortByRecent
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  if (loading)
    return <p className="text-center mt-10 text-lg text-gray-600">Loading orders...</p>;
  if (error)
    return <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Manage Orders</h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white shadow-sm w-full sm:w-1/3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm bg-white shadow-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          onClick={() => setSortByRecent(!sortByRecent)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
        >
          <FaSort />
          Sort by {sortByRecent ? "Old" : "Recent"}
        </button>
      </div>

      {/* Cards for mobile and responsive view */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-4 shadow rounded-md border border-gray-100 hover:shadow-lg transition">
              <h2 className="font-semibold text-indigo-600 text-sm mb-2">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-700"><span className="font-semibold">Customer:</span> {order.user?.name || "Unknown"}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-green-600 font-bold"><span className="font-semibold">Total:</span> ₹{order.total || order.price || "N/A"}</p>
              <p className="text-sm text-blue-600"><span className="font-semibold">Status:</span> {order.status}</p>

              <div className="mt-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Delete button commented */}
              {/* 
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="w-full mt-3 bg-red-500 text-white py-2 rounded-md text-sm hover:bg-red-600"
              >
                Delete Order
              </button> 
              */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
