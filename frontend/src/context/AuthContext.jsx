// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from token
useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Fetch full user from backend
        const res = await API.get("/users/me");

        setUser({
          id: res.data._id,
          name: res.data.name,
          role: res.data.role
        });

      } catch (err) {
        console.log("Session expired");
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  };

  loadUser();
}, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);

    setUser({
      id: data.user.id,
      name: data.user.name,
      role: data.user.role
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  //  Prevent UI flicker before loading
  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};