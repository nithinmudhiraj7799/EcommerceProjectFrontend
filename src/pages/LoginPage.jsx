import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://ecommerceprojectbackend-em29.onrender.com/api/auth/login`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        setError("User data not found in response.");
        return;
      }

      login(response.data);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err);

      const message =
        err.response?.data?.message === "Invalid credentials"
          ? "Incorrect email or password"
          : err.response?.data?.message || "Login failed";

      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-sm hover:shadow-md"
        >
          Login
        </button>

        {error && (
          <p className="text-red-600 text-sm text-center -mt-4">{error}</p>
        )}

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
