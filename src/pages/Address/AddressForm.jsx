import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Your deployed backend URL
const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com";

const AddressForm = () => {
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        const token = user?.token;

        if (!token) {
          setMessage("Please login first.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/address/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setAddress(res.data);
        }
      } catch (err) {
        setMessage("Failed to load address.");
      }
      setLoading(false);
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const token = user?.token;

      await axios.post(`${BASE_URL}/api/address/save`, address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Address saved successfully!");
      setAddress({
        fullName: "",
        mobile: "",
        houseNo: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        landmark: "",
      });

      navigate("/checkout");
    } catch (err) {
      setMessage("Failed to save address.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={address.mobile}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="houseNo"
          placeholder="House No"
          value={address.houseNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code"
          value={address.pinCode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={address.landmark}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {message && (
          <p
            className={`text-center ${
              message.includes("Failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
