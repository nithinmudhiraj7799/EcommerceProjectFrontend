import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen font-sans">
      {/* Navbar */}
      {/* <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-700">🍃 WellnessMart</h1>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Shop</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium transition">Register</Link>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="text-center py-24 px-4 bg-gradient-to-br from-blue-100 via-white to-green-100">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-4 animate-fade-in">
          Nourish Your Health Naturally 🌿
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover premium organic fruits, vegetables, and wellness essentials crafted for your healthy lifestyle.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
        >
          🛒 Shop Now
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-blue-50 rounded-2xl p-8 shadow-md hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-3">🌱 100% Organic</h3>
            <p className="text-gray-600">Our products are ethically grown without chemicals or additives.</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 shadow-md hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-3">🚚 Fast Delivery</h3>
            <p className="text-gray-600">Get fresh fruits and wellness products delivered in no time.</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 shadow-md hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-blue-700 mb-3">💬 24/7 Support</h3>
            <p className="text-gray-600">Friendly customer support via live chat, phone, or email anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-24">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} WellnessMart. All rights reserved.</p>
          <div className="space-x-4 mt-3 md:mt-0 text-sm">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
