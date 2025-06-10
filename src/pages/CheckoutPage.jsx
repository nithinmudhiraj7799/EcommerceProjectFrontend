import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
  const [address, setAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        const token = user?.token;

        if (!token) {
          toast.error("Please login to checkout");
          setLoading(false);
          return;
        }

        // Fetch saved address
        const addressRes = await axios.get("http://localhost:5004/api/address/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const addressData = addressRes.data;
        console.log("Address Data:", addressData);

        if (Array.isArray(addressData)) {
          if (addressData.length > 0) {
            setAddress(addressData[0]); 
          } else {
            setAddress(null);
            toast.warn("No saved address found. Please add your address before checkout.");
          }
        } else if (addressData && typeof addressData === "object") {
          setAddress(addressData); 
        } else {
          setAddress(null);
          toast.warn("No saved address found. Please add your address before checkout.");
        }

        // Fetch cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
      } catch (err) {
        console.error("Error fetching checkout data:", err);
        toast.error("Failed to load checkout data.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirmOrder = async () => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const token = user?.token;

      if (!token) {
        toast.error("Please login to place order.");
        return;
      }

      if (!address) {
        toast.warn("Please add your address before placing an order.");
        return;
      }

      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: address._id,
      };

      await axios.post("http://localhost:5004/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Failed to place order. Try again.");
    }
  };

  if (loading) return <p>Loading checkout details...</p>;

  if (!address) return <p>{message || "No saved address found. Please add your address."}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <h3 className="font-semibold">Shipping Address</h3>
        <p>{address.fullName}</p>
        <p>{address.mobile}</p>
        <p>
          {address.houseNo}, {address.street}, {address.city}, {address.state} - {address.pinCode}
        </p>
        {address.landmark && <p>Landmark: {address.landmark}</p>}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))
        )}

        <div className="flex justify-between font-bold mt-4">
          <span>Total:</span>
          <span>₹{getTotalPrice()}</span>
        </div>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
      >
        Confirm Order
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CheckoutPage;
