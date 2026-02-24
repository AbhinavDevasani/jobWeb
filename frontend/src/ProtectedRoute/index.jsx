import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import Cookies from "js-cookie";
import AuthContext from '../Context/AuthContext';

const ProtectedRoute = ({ children, onlyRahul = false }) => {
  const token = Cookies.get("jwt_token");
  const { user, loading } = useContext(AuthContext);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (onlyRahul && user?.email !== "rahul@gmail.com") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
