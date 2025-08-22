import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
function SingleJob() {
    const [singleJob,setSingleJob]=useState([])
    const {id}=useParams()
    useEffect(()=>{
        const getdata=async()=>{
            const data=await axios.get(`http://localhost:8000/api/singleJob/${id}`)
            setSingleJob(data.data.data)
            
        }
        getdata()
    },[])
    console.log(singleJob)
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
              <p className="hidden sm:block w-[4vw]">Job List</p>
              <p className=' w-[5vw] cursor-pointer'>Job Form</p>
            </div>
          </div>
        </div>
      </nav>
           <div className="max-w-4xl mx-auto mt-10 space-y-6">
            <h2 className="text-[30px] font-semibold text-gray-800 mb-4">Job Overview</h2>
            {/* Job Overview Card */}
            <div className="bg-white shadow-md rounded-lg p-6">
                
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-medium">Title:</span> {singleJob.title}</p>
                <p><span className="font-medium">Company:</span> {singleJob.company}</p>
                <p><span className="font-medium">Type:</span> {singleJob.jobType}</p>
                <p><span className="font-medium">Location:</span> {singleJob.location}</p>
                <p><span className="font-medium">Salary:</span> {singleJob.salary}</p>
                </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-white shadow-md rounded-lg p-6 w-[30vw]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">
                {singleJob.description}
                </p>
            </div>
            </div>
        </div>
    )
}

export default SingleJob
