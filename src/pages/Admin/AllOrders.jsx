import React, { useEffect, useState } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user");
    const token=user?.token
      const response = await axios.get("http://localhost:5005/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">All Orders (Admin)</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p className="text-sm text-gray-700">
                User: {order.user?.name || "Unknown"} ({order.user?.email || "No email"})
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                Status: <span className="capitalize">{order.status || "pending"}</span>
              </p>

              <div className="mt-2">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc pl-5 mt-1">
                  {order.items.map(({ product, quantity }) => (
                    <li key={product?._id}>
                      {product?.name || "Product details not available"} — Qty: {quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {order.address && (
                <div className="mt-4">
                  <h4 className="font-semibold">Shipping Address:</h4>
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
