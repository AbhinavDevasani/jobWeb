import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
function SingleJob() {
    const [singleJob,setSingleJob]=useState([])
    const {id}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        const getdata=async()=>{
            const data=await axios.get(`http://localhost:8000/api/jobs/${id}`)
            setSingleJob(data.data.data)
            
        }
        getdata()
    },[])

    const goToForm=()=>{
        navigate("/jobForm")
    }
    const goToListPage=()=>{
        navigate("/")
    }
    return (
        <div>
            <nav className="flex w-full px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh] ">
                
                <div className="flex flex-column  w-full ">
                <div className="w-full flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-briefcase w-6 h-6 text-white bg-blue-700 p-1 h-[5vh] w-[3vw] text-white rounded-xl">
                    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                    <p className='font-[700] text-[20px] mt-[2px] ml-2'>SARKAR JOBS</p>
                    <div className="flex gap-4 ml-6 mt-[5px] text-black ">
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" onClick={()=>goToListPage()}>Jobs</p>
                        </div>
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" onClick={()=>goToForm()}>Application</p>
                        </div>
                    </div>
                </div>
                </div>
            </nav>
           <div className="max-w-4xl mx-auto mt-10 space-y-6">
            <h2 className="text-[30px] font-semibold text-gray-800 mb-4">Job Overview</h2>
            <div className='flex' onClick={()=>goToListPage()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                <p className='font-[600] cursor-pointer'>Back to Jobs</p>
            </div>
            {/* Job Overview Card */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="gap-4 text-gray-700">
                    <p className='text-[30px] font-[700]'>{singleJob.title}</p>
                    <div className='flex mt-2 mb-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <p className='text-[18px] ml-2 font-[500]'>{singleJob.company}</p>
                    </div>
                    <p className='border-1 w-[5vw] text-center rounded-lg text-black text-[14px] font-[500] border-gray-300'> {singleJob.jobType}</p>
                    <div className='flex gap-10 mt-3'>
                        <div>
                            <p className='ml-6'>Location</p>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p className='font-[600]'>{singleJob.location}</p>
                            </div>
                        </div>
                        <div>
                            <p className='ml-6'>Salary</p>
                            <p className='font-[600]'>₹{singleJob.salary}/monthly</p>     
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-white shadow-md rounded-lg p-6 w-[30vw]">
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                {singleJob.description}
                </p>
            </div>
            </div>
        </div>
    )
}

export default SingleJob
