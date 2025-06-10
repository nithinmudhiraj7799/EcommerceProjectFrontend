import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="font-bold text-green-600">${product.price}</p>
      <button
        onClick={() => navigate(`/products/${product._id}`)}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        View
      </button>
    </div>
  );
};

export default ProductCard;
