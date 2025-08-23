import React from 'react'
import { useNavigate } from 'react-router'
function JobHome() {
    const navigate=useNavigate()
    const goToListPage=()=>{
        navigate("/jobs")
    }
    const goToForm=()=>{
        navigate("/jobs/new")
    }
    const goToAccount=()=>{
        navigate("/account")
    }
  return (
    <div>
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
                <div className="flex items-center ">
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
                    <p className="hidden sm:block ml-1 text-gray-700 font-[600]">Home</p>
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
                onClick={() => goToAccount()}
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

        <div className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-purple-50 px-4 text-center">
            

           
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Find Your Dream{" "}
                <span className="text-indigo-600">Job</span>
            </h1>

            
            <p className="text-lg text-gray-600 max-w-2xl">
                Discover thousands of part-time and full time opportunities across India.  
                Secure your future with trusted employment.
            </p>
        </div>
        <footer className="bg-[#0F172A] text-gray-300 py-10 px-6 flex flex-col justify-center align-center ">
            <div className="max-w-7xl mx-auto gap-8 ">

              
                <div className='flex flex-col items-center justify-center'>
                <div className=" gap-2 mb-3 flex flex-col  items-center justify-center">
                   
                    <div className="bg-blue-500 p-2 rounded-xl flex items-center justify-center w-[3vw]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.63a2.25 2.25 0 01-2.247 2.12H6.622a2.25 2.25 0 01-2.247-2.12L3.75 7.5m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0H3.75"
                        />
                    </svg>
                    </div>

                    <h2 className="text-white font-semibold text-lg">
                    SarkarJobs
                    </h2>
                </div>
                <p className="text-sm text-gray-400">
                    Corporate Part-time Jobs
                </p>
                <p className="mt-2 text-sm text-gray-400">
                    Connect with  opportunities across India. Find part-time jobs that fit your skills and schedule.
                </p>
                </div>

                
                
            </div>

            
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                © 2025 SarkarJobs. All rights reserved.
            </div>
        </footer>
    </div>
  )
}

export default JobHome
