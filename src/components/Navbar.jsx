import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-opacity-70 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://img.freepik.com/premium-vector/ecommerce-logo-design_624194-152.jpg?semt=ais_hybrid&w=740"
              alt="Logo"
              className="h-10 w-10 rounded-full shadow-md"
            />
            <span className="text-white text-xl font-extrabold tracking-wider">
              WellnessMart
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 font-medium transition-all duration-200">Home</Link>
          <Link to="/products" className="text-white hover:text-yellow-300 font-medium transition-all duration-200">Products</Link>
          {user?.role === "admin" ? (
            <Link to="/admin" className="text-white hover:text-yellow-300 font-medium transition-all duration-200">Admin Dashboard</Link>
          ) : (
            user && (
              <Link to="/dashboard" className="text-white hover:text-yellow-300 font-medium transition-all duration-200">My Dashboard</Link>
            )
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white font-medium">Hello, <b>{user.name}</b></span>
              <button
                onClick={handleLogout}
                className="bg-blue-900 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-gradient-to-b from-indigo-800 to-purple-800 bg-opacity-95 px-6 py-6 space-y-6 rounded-b-xl shadow-xl animate-slideDown">
          <div className="flex flex-col space-y-4 text-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-semibold hover:text-yellow-300 transition">Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-semibold hover:text-yellow-300 transition">Products</Link>
            {user?.role === "admin" ? (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-semibold hover:text-yellow-300 transition">Admin Dashboard</Link>
            ) : (
              user && (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg font-semibold hover:text-yellow-300 transition">My Dashboard</Link>
              )
            )}

            {user ? (
              <>
                <p className="text-white text-md">Hello, <strong>{user.name}</strong></p>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition duration-300 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-white text-indigo-700 font-semibold py-2 rounded-lg hover:bg-indigo-100 transition text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg transition text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
