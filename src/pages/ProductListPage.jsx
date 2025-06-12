import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const BASE_URL = "https://ecommerceprojectbackend-em29.onrender.com";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      const productList = Array.isArray(res.data) ? res.data : res.data.products || [];
      // console.log("Fetched products:", productList.map(p => p.category));

      setProducts(productList);
      setDisplayedProducts(productList);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter(
  (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()

      );
    }


    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filtered);
  }, [searchTerm, sortOrder, categoryFilter, products]);

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-700">
        🌿 Organic Products 🌿
      </h1>

      {/* 🔍 Search & Filters */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Search products..."
          className="p-3 border border-gray-300 rounded-lg shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">⬇️ Sort by</option>
          <option value="asc"> Price: Low to High</option>
          <option value="desc"> Price: High to Low</option>
        </select>

       <select
  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
>
  <option value="">🍽 Filter by Category</option>
  <option value="fruit">Fruit</option>
  <option value="vegetable">Vegetable</option>
  <option value="dry fruit">Dry Fruit</option>
</select>


      </div>

      {/* Loader / Error / No Products */}
      {loading && (
        <p className="text-center text-lg font-semibold text-gray-600 animate-pulse">
          Loading products...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}
      {!loading && displayedProducts.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-xl mb-4"
            />
            <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-green-700 font-bold text-lg mb-4">₹{product.price}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition"
              >
                🛒
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                🔍 View
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductListPage;
