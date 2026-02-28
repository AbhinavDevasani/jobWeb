import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import AuthContext from '../Context/AuthContext'

import Footer from '../Footer'
import Navbar from '../Navbar'
function SingleJob() {
    const [singleJob, setSingleJob] = useState([])
    const [hasApplied, setHasApplied] = useState(false) 
    const { id } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        const getdata = async () => {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`)
            setSingleJob(data.data.data)

        }
        getdata()
    }, [])
    const { user } = useContext(AuthContext)

    
    useEffect(() => {
        const checkStatus = async () => {
            if (user?.email) {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/checkApplication/${id}?email=${user.email}`);
                    setHasApplied(res.data.applied);
                } catch (err) {
                    console.error("Error checking application status", err);
                }
            }
        };
        checkStatus();
    }, [id, user]);

    
    const goToListPage = () => {
        navigate("/jobs")
    }

    const deleteJob = async () => {
        const jobDelete = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`)
        console.log(jobDelete)
        alert("Job deleted successfuly")
        navigate("/jobs")
    }
   
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 space-y-6 mb-4">
                <h2 className="text-[30px] font-semibold text-gray-800 mb-4">Job Overview</h2>
                <div className='flex justify-between'>
                    <div className='flex' onClick={() => goToListPage()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        <p className='font-[600] cursor-pointer'>Back to Jobs</p>
                    </div>
                    {user?.email == "rahul@gmail.com" &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-600 cursor-pointer" onClick={() => deleteJob()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    }

                </div>
                {/* Job Overview Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="gap-4 text-gray-700">
                        <p className='text-[30px] font-[700]'>{singleJob.title}</p>
                        <div className='flex mt-2 mb-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                            <p className='text-[18px] ml-2 font-[500]'>{singleJob.company}</p>
                        </div>
                        <p className='border-1 sm:w-[5vw] text-center rounded-lg text-black text-[14px] font-[500] border-gray-300 w-[19vw]'> {singleJob.jobType}</p>
                        <div className='flex gap-10 mt-3'>
                            <div>
                                <p className='ml-6'>Location</p>
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <p className='font-[600]'>{singleJob.location}</p>
                                </div>
                            </div>
                            <div>
                                <p className='ml-6'>Salary</p>
                                <p className='font-[600]'>₹{singleJob.salary}/monthly</p>

                            </div>
                            {user?.email !== "rahul@gmail.com" &&
                                <button
                                    className={`${hasApplied ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'} p-1 rounded-md mt-2 text-white px-4`}
                                    onClick={() => !hasApplied && navigate(`/applyJob/${id}`)}
                                    disabled={hasApplied}
                                >
                                    {hasApplied ? "Applied" : "Apply Now"}
                                </button>
                            }
                        </div>

                    </div>
                </div>
                <div className='flex gap-3 sm:px-[0px] px-[20px]'>
                    {/* Job Description Card */}
                    <div className="bg-white shadow-md rounded-lg p-6 sm:w-[30vw] w-[40vw]">
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sm:size-6 size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                            <h2 className="sm:text-xl font-semibold text-gray-800 mb-4 text-[13px]  ">Job Description</h2>
                        </div>

                        <p className="text-gray-700 sm:leading-relaxed text-[12px] sm:text-[17px]">
                            {singleJob.description}
                        </p>
                    </div>
                    {/*Posted At card */}
                    <div className="bg-white shadow-md rounded-lg p-6 sm:w-[30vw] w-[40vw] ">
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:size-6 size-4 mt-[3px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            <h2 className="sm:text-xl font-semibold text-gray-800 mb-4 text-[13px]">Posted At</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {singleJob.postedAt
                                ? new Date(singleJob.postedAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })
                                : ""}
                        </p>

                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 sm:w-[30vw] w-[70vw] ml-5 sm:ml-[0px]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Contact Information
                    </h2>
                    {/* Email */}
                    <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="size-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 
                            1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 
                            0 19.5 4.5h-15a2.25 2.25 0 0 
                            0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 
                            1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 
                            1-2.36 0l-7.5-4.615a2.25 2.25 0 0 
                            1-1.07-1.916V6.75" />
                        </svg>
                        <p className="text-gray-700">{singleJob.email || "xyz@gmail.com"}</p>
                    </div>
                    {/* Phone */}
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="size-5 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 
                            15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 
                            1.125 0 0 0-1.173.417l-.97 1.293a.75.75 0 0 
                            1-1.21.38 12.035 12.035 0 0 
                            1-7.143-7.143.75.75 0 0 
                            1 .38-1.21l1.293-.97c.35-.263.5-.707.417-1.173L6.963 
                            3.102a1.125 1.125 0 0 
                            0-1.091-.852H4.5A2.25 2.25 0 0 0 
                            2.25 4.5v2.25z" />
                        </svg>
                        <p className="text-gray-700">{singleJob.phone || "103829312312"}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SingleJob
