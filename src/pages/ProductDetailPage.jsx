// src/ProductDetailPage.js
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useContext(CartContext);

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com";

  // Fetch product data
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product", err));
  }, [id]);

  // Add to cart function
  const handleAddToCart = () => {
    const alreadyInCart = cart.find((item) => item._id === product._id);
    const updatedCart = alreadyInCart
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`✅ ${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
      transition: Slide,
    });
  };

  if (!product) {
    return (
      <p className="text-center text-lg text-gray-600 py-10">
        Loading product...
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-3">{product.description}</p>
        <p className="text-xl text-green-600 font-semibold mb-4">
          ₹{product.price}
        </p>

        {/* Buttons section */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded shadow transition w-full sm:w-auto"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow transition w-full sm:w-auto"
          >
            🛍️ View Cart
          </button>

          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition w-full sm:w-auto"
          >
            🔙 Back to Products
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetailPage;
