// src/ProductDetailPage.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useContext(CartContext);

  const BASE_URL ="https://ecommerceprojectbackend-em29.onrender.com"
;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product", err));
  }, [id]);

  const handleAdd = () => {
    const updated = cart.find((item) => item._id === product._id)
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    toast.success(`✅ ${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: "colored",
      transition: Slide,
    });
  };

  if (!product)
    return (
      <p className="text-center text-lg text-gray-600 py-10">
        Loading product...
      </p>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
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
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded shadow transition"
        >
          Add to Cart
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetailPage;
