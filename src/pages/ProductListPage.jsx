import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com" ;
;

  // 👇 Separate async function for API call
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      console.log("API response:", res.data); // Debugging the response

      // Check if the response is an array
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data.products && Array.isArray(res.data.products)) {
        setProducts(res.data.products); // If API wraps in `products`
      } else {
        setError("Invalid response from server.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // 👈 Call the async function
  }, []);

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.find((item) => item._id === product._id);

    const updated = alreadyInCart
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    toast.success(`✅ ${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
      transition: Slide,
    });
  
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Our Products
      </h1>

      {loading && (
        <p className="text-center text-lg font-semibold text-gray-500">
          Loading products...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
            <p className="text-green-600 font-bold text-lg mb-3">₹{product.price}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

  <ToastContainer
            position="top-right"
            autoClose={1500}
            transition={Slide}
            theme="colored"
          />    </div>
  );
};

export default ProductListPage;
