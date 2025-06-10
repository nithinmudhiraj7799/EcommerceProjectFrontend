import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5004/api/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (!token) {
      toast.error("You must be logged in to perform this action.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("countInStock", form.countInStock);
      if (form.image) formData.append("image", form.image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5004/api/products/${editingId}`,
          formData,
          config
        );
        toast.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5004/api/products", formData, config);
        toast.success("Product added successfully!");
      }

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
        image: null,
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      countInStock: product.countInStock?.toString() || "",
      image: null, // Clear file input; image already in DB
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      toast.error("You must be logged in to delete a product.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5004/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
      <h2 className="text-4xl font-bold text-blue-700">📦 Manage Products</h2>

      {/* Product Form */}
      <section className="bg-white shadow-xl rounded-lg p-6 border border-blue-100">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          autoComplete="off"
        >
          {["name", "description", "category"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            className="border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="countInStock"
            placeholder="Stock Quantity"
            value={form.countInStock}
            onChange={handleChange}
            required
            min="0"
            className="border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="col-span-full border border-gray-300 p-3 rounded-md"
          />

          <button
            type="submit"
            disabled={submitting}
            className="col-span-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {submitting && <FaSpinner className="animate-spin" />}
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </section>

      {/* Products Table */}
      <section className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : (
          <table className="min-w-full text-left text-sm text-gray-800 bg-white">
            <thead className="bg-blue-50 text-blue-700">
              <tr>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Price</th>
                <th className="px-6 py-3 border-b">Category</th>
                <th className="px-6 py-3 border-b">Stock</th>
                <th className="px-6 py-3 border-b">Image</th>
                <th className="px-6 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400 italic">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">₹{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.countInStock}</td>
                    <td className="px-6 py-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded shadow"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 text-gray-500 flex items-center justify-center rounded text-xs italic">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(product)}
                        title="Edit"
                        className="text-yellow-500 hover:text-yellow-600 text-xl"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        title="Delete"
                        className="text-red-500 hover:text-red-600 text-xl"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ManageProducts;
