// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ShippingPage = () => {
//   const [form, setForm] = useState({
//     fullName: "",
//     mobile: "",
//     houseNo: "",
//     street: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     landmark: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAddress = async () => {
//       try {
//         const { data } = await axios.get("/api/address/my", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (data) setForm(data);
//       } catch {}
//     };
//     fetchAddress();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/address/save", form, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("✅ Address saved");
//       navigate("/payment");
//     } catch {
//       alert("❌ Failed to save address");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4 text-center">Shipping Address</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         {Object.keys(form).map((key) => (
//           <input
//             key={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         ))}
//         <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           Continue to Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ShippingPage;
