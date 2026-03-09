import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import AuthContext from '../Context/AuthContext'

import Footer from '../Footer'
import Navbar from '../Navbar'
import { Link } from 'react-router'
function JobList() {
  const navigate = useNavigate()
  const [jobList, setJobList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")   // search state
  const [loading, setLoading] = useState(false)  // loader state
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // reset to first page when typing new search
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs?page=${currentPage}&limit=9&search=${debouncedSearch}`
        )
        const data = await response.data

        setJobList(data.jobs)
        setTotalPages(data.totalPages)
        setLoading(false)
      } catch (err) {
        console.log("Error", err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [currentPage, debouncedSearch])
  const { user } = useContext(AuthContext)

  const goToJobEdit = (id) => {
    navigate(`/jobEdit/${id}`)
  }

  const goToSingleView = (id) => {
    navigate(`/jobs/${id}`)
  }
  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1) // reset to first page whenever searching
  }

  return (
    <div>
      <Navbar />
      {/*Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={handleSearch}
          className="border px-3 py-2 rounded-md w-[90%] md:w-[50%] lg:w-[30%] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Job List */}
      {loading ? (
        <div className="flex justify-center items-center w-full my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>) : (
        <div className='flex flex-wrap gap-4 justify-center md:justify-start px-4 md:px-10'>
          {jobList.map((item, id) => {
            return (

              <div key={id} className='bg-white p-4 sm:p-6 my-4 rounded-lg shadow-md border border-gray-200 w-full sm:w-[45%] lg:w-[30%]'>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center justify-between w-full">
                    <p className='sm:text-xl font-semibold'>{item.title}</p>
                    {user?.email === "rahul@gmail.com" &&
                      <svg xmlns="http://www.w3.org/2000/svg" onClick={() => goToJobEdit(item._id)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:size-6 cursor-pointer size-5 text-gray-700 hover:text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>}

                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 sm:size-6 text-gray-500 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    <p className='text-[16px] sm:text-[19px] text-gray-700 font-[500]'>{item.company}</p>
                  </div>
                  <p className="border-1 rounded-lg px-2 py-1 bg-green-100 border-green-300 text-green-700 text-[10px] sm:text-[12px] font-medium w-fit">{item.jobType}</p>
                </div>
                <p className="mt-4 text-gray-600 line-clamp-3">{item.description}</p>
                <div className="flex mt-3 justify-between items-center">
                  <div className='flex items-center text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:size-5 size-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p className='text-[13px] sm:text-[14px]'>{item.location}</p>
                  </div>
                  <p className='text-[14px] sm:text-[15px] font-semibold text-gray-700'>₹{item.salary}/ monthly</p>
                </div>
                <button className="bg-blue-500 text-white p-2 rounded-md mt-2 flex justify-self-end cursor-pointer hover:bg-blue-600" onClick={() => goToSingleView(item._id)}>View Details</button>
              </div>

            )
          })}
        </div>
      )
      }
      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 mb-3">
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
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 "
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default JobList
