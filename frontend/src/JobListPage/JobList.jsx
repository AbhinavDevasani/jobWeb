import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function JobList() {
  const navigate = useNavigate()
   const [jobList, setJobList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState("")   // search state

  // Fetch jobs whenever currentPage or search changes
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/jobs?page=${currentPage}&limit=6&search=${search}`
        )
        const data = await response.data
        setJobList(data.jobs)
        setTotalPages(data.totalPages)
        console.log(data.jobs)
      } catch (err) {
        console.log("Error", err)
      }
    }
    getData()
  }, [currentPage, search])

  const goToForm = () => {
    navigate("/jobs/new")
  }
  const goToJobEdit=(id)=>{
    navigate(`/jobEdit/${id}`)
  }
  const goToHome=()=>{
    navigate("/")
  }
  const goToSingleView=(id)=>{
    navigate(`/jobs/${id}`)
  }
  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1) // reset to first page whenever searching
  }

  return (
    <div>
      <nav className="flex w-full px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh]">
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" onClick={()=>goToHome()}>Home</p>
                </div>
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" >Jobs</p>
                </div>
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" onClick={()=>goToForm()}>Application</p>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/*Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={handleSearch}
          className="border px-3 py-2 rounded-md w-[50%] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Job List */}
      <div className='flex flex-wrap gap-4 justify-center'>
        {jobList.map((item,id) => {
          return (
            
                <div key={id} className='bg-white p-6 my-4 rounded-lg shadow-md border border-gray-200 w-[30vw]'>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center justify-between w-[100vw]">
                    <p className='text-xl font-semibold'>{item.title}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>goToJobEdit(item._id)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-[3px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <p className='text-[19px]  text-gray-700 font-[500] ml-1'>{item.company}</p>
                    </div>
                    <p className="border-1 rounded-lg text-[10px] p-1 w-[4vw] text-center bg-green-200 border-green-300 text-green-700">{item.jobType}</p>
                </div>
                <p className="mt-4 text-gray-700">{item.description}</p>
                <div className="flex mt-3 justify-between">
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p>{item.location}</p>
                    </div>
                    <p>₹{item.salary}/ monthly</p>
                </div>
                <button className="bg-blue-500 text-white p-2 rounded-md mt-2 flex justify-self-end cursor-pointer" onClick={()=>goToSingleView(item._id)}>View Details</button>
                </div>
            
          )
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
      {/*Footer */}
      <footer className="bg-[#0F172A] text-gray-300 py-10 px-6 flex flex-col justify-center align-center mt-10">
      <div className="max-w-7xl mx-auto gap-8 ">

        {/* Left Section - Logo + About */}
        <div className='flex flex-col items-center justify-center'>
          <div className=" gap-2 mb-3 flex flex-col  items-center justify-center">
            {/* Icon */}
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
              SarkarJobsIndia
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Government Part-time Jobs
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Connect with government opportunities across India. Find part-time jobs that fit your skills and schedule.
          </p>
        </div>

        
        
      </div>

      {/* Bottom border */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2025 SarkarJobsIndia. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default JobList
