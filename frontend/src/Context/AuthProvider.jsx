import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const API = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  API.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    if (token) {
      API.get("/users/current")
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = async (email, password) => {
            const res = await API.post("/users/login", { email, password });
            const accessToken = res.data.accessToken;

            localStorage.setItem("token", accessToken);
            setToken(accessToken);
            setUser(user)
            
            if (res.data.user) {
                setUser(res.data.user);
            } else {
               
                const userRes = await API.get("/users/current");
                setUser(userRes.data);
            }
        };

    const register = async (username, email, password) => {
        await API.post("/users/register", { username, email, password });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
