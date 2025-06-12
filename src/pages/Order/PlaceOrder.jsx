

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  console.log("🔔 PlaceOrder component rendered");


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    console.log("🛒 Cart Items Loaded:", storedCart);
    console.log("🔔 PlaceOrder useEffect triggered");
    const fetchAddresses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
//           console.log(" Cart Items:", cartItems);
// console.log(" Mapped Order Items:", orderItems);
// console.log(" Address ID:", addressId);
// console.log(" Token:", token);

        const { data } = await axios.get("http://localhost:5004/api/address/my", {
          headers: {
             "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("📦 Fetched Addresses:", data);
        setAddresses(data);
      } catch (err) {
        console.error("❌ Failed to fetch addresses:", err);
      }
    };

    fetchAddresses();
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!addressId) {
      setMessage("❌ Please select an address before placing the order.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const orderItems = cartItems.map((item) => ({
        product: item._id || item.id,
        quantity: item.quantity,
      }));

      // console.log("📤 Order Payload:", {
      //   items: orderItems,
      //   address: addressId,
      // });
//       console.log("🛒 Cart Items:", cartItems);
// console.log("🧾 Mapped Order Items:", orderItems);
// console.log("🏠 Address ID:", addressId);
// console.log("🔑 Token:", token);

      const response = await axios.post(
        "http://localhost:5004/api/orders/",
        { items: orderItems, address: addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Order Response:", response.data);

      setMessage("✅ Order placed successfully! Redirecting to payment...");
      setTimeout(() => {
        navigate("navigate(`/payment?amount=${totalPrice.toFixed(2)}`)");
      }, 2000);
    } catch (error) {
      console.error("❌ Order Placement Error:", error);
      setMessage(`❌ ${error.response?.data?.message || "Failed to place order"}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart items display */}
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="border p-4 rounded flex justify-between">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">₹ {item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Address selector */}
          <div className="mt-6">
            <label htmlFor="address" className="block font-semibold mb-2">
              Select Shipping Address:
            </label>
            <select
              id="address"
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">-- Select Address --</option>
              {addresses.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.street}, {addr.city}
                </option>
              ))}
            </select>
          </div>

          {/* Total */}
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ₹ {totalPrice.toFixed(2)}</h3>
          </div>

          {/* Message and Button */}
          {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Placing Order..." : "Proceed to Payment"}
          </button>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
