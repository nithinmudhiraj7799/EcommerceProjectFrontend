import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5004/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const handleAddToCart = (product) => {
    const updated = cart.find((item) => item._id === product._id)
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];
    setCart(updated);

    toast.success(`✅ ${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-12 drop-shadow">
        🛍️ Explore Our Fresh Fruits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <h3 className="font-bold text-xl text-center text-green-800 mb-1">
              {product.name}
            </h3>
            <p className="text-gray-600 text-center mb-2">{product.description}</p>
            <p className="text-orange-600 text-center font-semibold mb-2">
              ₹ {product.price} / kg
            </p>
            <p className="text-sm text-center text-gray-500 mb-4">
              Quantity Available: {product.countInStock}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition"
              >
                ➕
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition"
              >
                🛒
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition"
              >
                view
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ProductListPage;
