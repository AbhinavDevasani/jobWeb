import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const url = `${import.meta.env.VITE_BACKEND_URL}/api`;
   const [loading, setLoading] = useState(true)  // loader state
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = Cookies.get("jwt_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${url}/users/current`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.warn("Server returned:", response.status);
          setUser(null);
          return;
        }

        const text = await response.text();
        if (!text) {
          setUser(null);
          setLoading(false)
          return;
        }

        const data = JSON.parse(text);
        setUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null);
      }
      finally{
        setLoading(false)
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

    Cookies.set("jwt_token", data.accessToken, { expires: 30 });
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
    <AuthContext.Provider value={{ user, login, register, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
