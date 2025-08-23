import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router";

const Accounts = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const goToHome=()=>{
    navigate("/")
  }
  const goToForm=()=>{
    navigate("/jobs/new")
  }
  const goToListPage=()=>{
    navigate("/jobs")
  }
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">You are not logged in.</p>
      </div>
    );
  }
  return (
    <div>
        {/*Navbar */}
         <nav className="flex w-full px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh] items-center justify-between">
            
            <div className="flex items-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-briefcase w-6 h-6 text-white bg-blue-700 p-1 rounded-xl"
                >
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </svg>
                <p className="font-[700] text-[20px] ml-2 text-gray-800">SARKAR JOBS</p>

               
                <div className="flex gap-4 ml-6 text-black">
                <div className="flex items-center cursor-pointer">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-700"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                    </svg>
                    <p className="hidden sm:block ml-1 text-gray-700 font-[600]" onClick={()=>goToHome()}>Home</p>
                </div>

                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => goToListPage()}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-700"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                    </svg>
                    <p className="hidden sm:block ml-1 text-gray-700 font-[600]">Jobs</p>
                </div>

                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => goToForm()}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-700"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                    </svg>
                    <p className="hidden sm:block ml-1 text-gray-700 font-[600]">
                    Application
                    </p>
                </div>
                </div>
            </div>

            
            <div
                className="flex items-center gap-2 cursor-pointer"
                
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0v.75H4.5v-.75Z"
                />
                </svg>
                <p className="hidden sm:block text-gray-700 font-[600]">Account</p>
            </div>
        </nav>
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
                <p className="text-lg font-medium text-gray-800">********</p>
            </div>
            </div>

            <button
            onClick={handleLogout}
            className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
            Logout
            </button>
        </div>
        </div>
    </div>
  );
};

export default Accounts;
