import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserDashboardPage from "./pages/UserDashboardPage";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageOrders from "./pages/Admin/ManageOrders";

// 🔻 Newly added order-related pages
// import PlaceOrder from "./pages/Order/PlaceOrder";
import MyOrders from "./pages/Order/MyOrders";
import AllOrders from "./pages/Admin/AllOrders";

import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import AddressForm from "./pages/Address/AddressForm";
import ViewOrder from "./pages/ViewOrder";
import PlaceOrder from "./pages/Order/PlaceOrder";
import DummyPaymentPage from "./pages/Payments/DummyPaymentPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboardPage />
              </PrivateRoute>
            }
          />

          {/* 🔻 New User Order Routes */}
          <Route
            path="/place-order"
            element={
              <PrivateRoute>
                <PlaceOrder/>
              </PrivateRoute>
            }
          />
          <Route
  path="/payment"
  element={
    <PrivateRoute>
      <DummyPaymentPage/>
    </PrivateRoute>
  }
/>

          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />
           <Route
            path="/orders/:id" 
            element={
              <PrivateRoute>
                <ViewOrder/>
              </PrivateRoute>
            }
          />
         {/*  Address Route */}
          <Route
            path="/address"
            element={
              <PrivateRoute>
                <AddressForm/>
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <PrivateRoute adminOnly={true}>
                <ManageProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <PrivateRoute adminOnly={true}>
                <ManageOrders />
              </PrivateRoute>
            }
          />

          {/* 🔻 New Admin All Orders Page */}
          <Route
            path="/admin/all-orders"
            element={
              <PrivateRoute adminOnly={true}>
                <AllOrders />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<div className="text-center text-xl mt-10">404 - Page Not Found</div>} />
        </Routes>
      </Router>
      {/* <Footer/> */}
    </AuthProvider>
  );
}

export default App;
