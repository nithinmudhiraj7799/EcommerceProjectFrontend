import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DummyPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amt = queryParams.get("amount");
    if (amt) {
      setAmount(Number(amt));
    }
  }, [location]);

  const handlePayment = () => {
    Swal.fire({
      title: "Processing Payment...",
      timer: 1500,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Payment Successful 🎉",
        text: `You paid ₹${amount}`,
        confirmButtonText: "Go to Home",
      }).then(() => {
        navigate("/dashboard"); 
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          UPI Payment
        </h2>

        <p className="text-center text-lg font-semibold text-gray-800 mb-4">
          Payable Amount: ₹{amount}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handlePayment}
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            PhonePe
          </button>
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            GPay
          </button>
        </div>

        <p className="text-sm text-center text-gray-500">
          This is a demo payment screen. No real money is transferred.
        </p>
      </div>
    </div>
  );
};

export default DummyPaymentPage;
