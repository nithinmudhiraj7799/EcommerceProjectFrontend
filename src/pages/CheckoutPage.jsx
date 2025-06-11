// src/CheckoutPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [address, setAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        toast.error("❌ Please login to checkout", {
          position: "top-right",
          autoClose: 1500,
          transition: Slide,
          theme: "colored",
        });
        setLoading(false);
        return;
      }

      try {
        const addressRes = await axios.get(`${BASE_URL}/api/address/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAddress(addressRes.data[0] || null);
        setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
      } catch (error) {
        toast.error("❌ Error fetching checkout data", {
          position: "top-right",
          autoClose: 1500,
          transition: Slide,
          theme: "colored",
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [BASE_URL]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token || !address) return;

    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      address: address._id,
    };

    try {
      await axios.post(`${BASE_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Order placed successfully!", {
        position: "top-right",
        autoClose: 1500,
        transition: Slide,
        theme: "colored",
      });

      localStorage.removeItem("cart");
      setCartItems([]);
    } catch {
      toast.error("❌ Failed to place order.", {
        position: "top-right",
        autoClose: 1500,
        transition: Slide,
        theme: "colored",
      });
    }
  };

  if (loading)
    return <p className="text-center py-10 text-gray-600">Loading checkout data...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Checkout</h2>

      {address ? (
        <>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p>{address.fullName}</p>
            <p>{address.city}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Cart Items</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between py-1 border-b">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <p className="text-right font-bold mt-3">Total: ₹{getTotalPrice()}</p>
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 px-4 py-2 rounded transition"
            >
              ✅ Confirm Order
            </button>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-center mt-6">No address found.</p>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1500}
        transition={Slide}
        theme="colored"
      />
    </div>
  );
};

export default CheckoutPage;
