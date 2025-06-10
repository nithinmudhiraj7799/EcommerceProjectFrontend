import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5004/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
          },
        });
        setOrder(res.data);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="p-6">Loading order details...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  if (!order) return <div className="p-6">No order found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <h2 className="mt-6 text-2xl font-semibold mb-4">Items</h2>
      <ul className="list-disc pl-5 space-y-2">
        {order.items.map((item) => (
          <li key={item.product}>
            {item.product?.name || "Product"} — Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <strong>Total Price:</strong> ${order.totalPrice?.toFixed(2) || "N/A"}
      </p>
    </div>
  );
};

export default ViewOrder;
