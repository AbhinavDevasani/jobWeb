import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useContext } from 'react'
import AuthContext from './Context/AuthContext'
function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    
    const goToListPage = () => {
        navigate("/jobs")
    }
    const goToForm = () => {
        navigate("/jobs/new")
    }
    const goToAccount = () => {
        navigate("/account")
    }
    const goToHome = () => {
        navigate("/home")
    }
    const { user } = useContext(AuthContext)
    
    const isActive = (path) => {
        return location.pathname === path
    }
    return (
        <div>
            <nav className="flex w-full px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh] items-center justify-between shadow-md">

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
                        <div 
                            className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${isActive('/home') ? 'bg-blue-600 text-white' : 'text-gray-700'}`} 
                            onClick={goToHome}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            <p className="hidden sm:block ml-1 font-[600]">Home</p>
                        </div>

                        <div
                            className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${isActive('/jobs') ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                            onClick={() => goToListPage()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                            <p className="hidden sm:block ml-1 font-[600]">Jobs</p>
                        </div>

                        <div 
                            className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${isActive('/about') ? 'bg-blue-600 text-white' : 'text-gray-700'}`} 
                            onClick={() => navigate("/about")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <p className="hidden sm:block ml-1 font-[600]">About Us</p>
                        </div>

                        {user?.email === "rahul@gmail.com" &&
                            <div 
                                className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${isActive('/jobs/new') ? 'bg-blue-600 text-white' : 'text-gray-700'}`} 
                                onClick={() => goToForm()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                    />
                                </svg>
                                <p className="hidden sm:block ml-1 font-[600]">
                                    Application
                                </p>
                            </div>}
                        {user?.email === "rahul@gmail.com" && 
                            <div 
                                className={`flex items-center cursor-pointer px-3 py-2 rounded-lg transition ${isActive('/applicants') ? 'bg-blue-600 text-white' : 'text-gray-700'}`} 
                                onClick={() => navigate("/applicants")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-user-icon lucide-file-user size-5"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M16 22a4 4 0 0 0-8 0"/><circle cx="12" cy="15" r="3"/></svg>
                                <p className="hidden sm:block ml-1 font-[600]">Applicants</p>
                            </div>}

                    </div>
                </div>


                <div
                    className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition ${isActive('/account') ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
                    onClick={() => goToAccount()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0v.75H4.5v-.75Z"
                        />
                    </svg>
                    <p className="hidden sm:block font-[600]">Account</p>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
