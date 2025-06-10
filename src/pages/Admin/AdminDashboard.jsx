import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cardClass =
    "p-6 bg-white rounded-lg shadow-md cursor-pointer transform transition hover:scale-105 hover:shadow-lg";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Manage Products */}
        <div className={cardClass} onClick={() => navigate("/admin/products")}>
          <div className="flex items-center space-x-4 mb-4 text-indigo-600">
            <FaBoxOpen size={36} />
            <h2 className="text-2xl font-semibold">Manage Products</h2>
          </div>
          <p className="text-gray-600">
            Add, edit, or delete products with ease.
          </p>
        </div>

        {/* Manage Orders */}
        <div className={cardClass} onClick={() => navigate("/admin/orders")}>
          <div className="flex items-center space-x-4 mb-4 text-green-600">
            <FaClipboardList size={36} />
            <h2 className="text-2xl font-semibold">Manage Orders</h2>
          </div>
          <p className="text-gray-600">View orders and update their status.</p>
        </div>

        {/* Manage Users */}
        {/* <div className={cardClass} onClick={() => navigate("/admin/users")}>
          <div className="flex items-center space-x-4 mb-4 text-red-600">
            <FaUsers size={36} />
            <h2 className="text-2xl font-semibold">Manage Users</h2>
          </div>
          <p className="text-gray-600">View users and manage roles & permissions.</p>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
