// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem("user");

//       // Safely handle invalid values
//       if (savedUser && savedUser !== "undefined") {
//         setUser(JSON.parse(savedUser));
//       } else {
//         localStorage.removeItem("user"); // Clean up bad value
//       }
//     } catch (error) {
//       console.error("Error parsing user from localStorage:", error);
//       localStorage.removeItem("user"); // Remove corrupted data
//     }
//   }, []);

//   const login = (userData) => {
//     try {
//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//     } catch (error) {
//       console.error("Failed to save user to localStorage:", error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage, if exists
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

