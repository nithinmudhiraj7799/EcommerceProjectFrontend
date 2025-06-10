// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AuthContext } from "../context/AuthContext";

// const LoginPage = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5004/api/auth/login",
//         form,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.data) {
//         toast.error("User data not found in response.");
//         return;
//       }

//       login(response.data);
//       toast.success("Login successful");
//       navigate("/");
//     } catch (err) {
//       console.error("Login error:", err.response || err);
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10 space-y-6"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-gray-800">
//           Welcome Back
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           minLength={6}
//           className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-sm hover:shadow-md"
//         >
//           Login
//         </button>

//         <p className="text-sm text-center text-gray-500">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-blue-600 font-medium hover:underline cursor-pointer"
//           >
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
// import { auth, provider, signInWithPopup } from "../firebase.js"; // 🔁 adjust path as needed

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5004/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        toast.error("User data not found in response.");
        return;
      }

      login(response.data);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

// const handleGoogleLogin = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // ✅ Get the ID token from Firebase
//     const token = await user.getIdToken();
//     console.log("🔐 Firebase ID Token:", token);

//     // ✅ Send only the token to backend
//     const response = await axios.post("http://localhost:5004/api/auth/google-login", {
//       token, // only token
//     });

//     login(response.data); // Context login
//     toast.success("Google login successful");
//     navigate("/");
//   }catch (error) {
//   console.error("Google login error:", error.code, error.message); // <-- this line
//   toast.error(error.message || "Google Sign-In failed");
// }

// };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-sm hover:shadow-md"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>

      {/* 🔘 Google Sign-In Button */}
      {/* <div className="w-full max-w-md mt-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 rounded-md py-3 shadow-sm hover:shadow-md transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div> */}
    </div>
  );
};

export default LoginPage;
