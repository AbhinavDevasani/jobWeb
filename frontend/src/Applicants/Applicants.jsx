import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import AuthContext from '../Context/AuthContext'

import Footer from '../Footer'
function JobList() {
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(false)  // loader state
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getApplicants`)
        setApplicants(response.data)
        setLoading(false)
      } catch (err) {
        console.log("Error", err)
      }
    }
    getData()
  }, [])
  console.log(applicants)
  const { user } = useContext(AuthContext)
  const goToForm = () => {
    navigate("/jobs/new")
  }

  const goToHome = () => {
    navigate("/home")
  }

  const goToAccount = () => {
    navigate("/account")
  }
  const goToListPage = () => {
    navigate("/jobs")
  }
  return (
    <div>
      <nav className="flex w-full px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh] items-center justify-between bg-gray-100">
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
          <p className="font-[700] sm:text-[20px] ml-2 text-gray-800">SARKAR JOBS</p>


          <div className="flex gap-4 ml-6 text-black">
            <div className="flex items-center cursor-pointer" onClick={() => goToHome()}>
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
              <p className="hidden sm:block ml-1 text-gray-700 font-[600]" >Home</p>
            </div>

            <div
              className="flex items-center cursor-pointer"
              onClick={goToListPage}
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
            {user?.email === "rahul@gmail.com" && <div
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
            </div>}
            <div className="flex items-center cursor-pointer ml-2">
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
              <p className="hidden sm:block ml-1 text-gray-700 font-[600]">Applicants</p>
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

      {/* Applicants List */}
      {loading ? (
        <div className="flex justify-center items-center w-full my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : applicants.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">No applicants found</p>
      ) : (
        <div>
          <div className="grid grid-cols-6 gap-4 text-gray-600 font-medium p-6 ">
            <div>Applicant</div>
            <div>Contact</div>
            <div>Company</div>
            <div>Location</div>
            <div>Resume</div>
            <div>Description</div>
          </div>
          {applicants.map((item, id) => (
            <div key={id} className="p-6 bg-white rounded-lg shadow-md">

              <div className="mt-4 border-t border-gray-200 ">

                <div className="grid grid-cols-6 gap-5 py-3 border-t border-gray-100 items-center">
                  <h1 className="font-semibold text-gray-800">{item.name}</h1>
                  <div>
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <p>{item.email}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 shrink-0">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      <p>{item.number}</p>
                    </div>
                  </div>
                  <div className="text-gray-700 ml-5">{item.jobId.company}</div>
                  <div className='flex items-center space-x-2 mt-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p className="text-gray-700">{item.jobId.location}</p>
                  </div>
                  <div className='flex items-center space-x-2 mt-1'>
                    {item.resume ? (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/${item.resume.replace(/\\/g, "/")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400">No Resume</span>
                    )}
                  </div>
                  <div className='flex items-center space-x-2 mt-1'>
                    <p className="text-gray-700 overflow-auto h-[10vh]">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  )
}

export default JobList
