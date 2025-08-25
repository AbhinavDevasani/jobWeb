import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const url = "https://jobweb-1.onrender.com/api";0
  // Load user on mount if cookie exists
  useEffect(() => {
    const fetchCurrentUser = async () => {
        const token = Cookies.get("jwt_token");
        if (!token) return;
        try {
            const response = await fetch(`${url}/users/current`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
        } 
        catch (error) {
        console.error("Error fetching current user:", error);   
        }
    };
        fetchCurrentUser();
    }, []);
  const login = async (email, password) => {
    const res = await fetch(`${url}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Store token in cookie
    Cookies.set("jwt_token", data.accessToken, { expires: 30 });

    // Set user state
    setUser(data.user);

  };
  
  const register = async (username, email, password) => {
    const res = await fetch(`${url}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  };

  const logout = () => {
    Cookies.remove("jwt_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
