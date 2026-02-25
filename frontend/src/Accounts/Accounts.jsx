import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Footer from "../Footer";
import { useNavigate } from "react-router";
import Navbar from '../Navbar';

const Accounts = () => {
  const { user, logout, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const goToHome = () => {
    navigate("/home")
  }
  const goToForm = () => {
    navigate("/jobs/new")
  }
  const goToListPage = () => {
    navigate("/jobs")
  }
  const goToLoginPage = () => {
    navigate("/")
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">You are not logged in.</p>
        <button className="bg-blue-500 text-white p-2" onClick={() => { goToLoginPage() }}>Go to Login Page</button>
      </div>
    );
  }
  console.log(user)
  return (
    <div>
      {/*Navbar */}
      <Navbar />
      {/*the accounts details card */}
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Account Details
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium text-gray-800">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Password</p>
              <p className="text-lg font-medium text-gray-800">*******</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accounts;
