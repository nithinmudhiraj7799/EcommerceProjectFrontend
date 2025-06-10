import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5004/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error loading product", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg animate-pulse">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />
        )}

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600">${product.price}</p>
          <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
