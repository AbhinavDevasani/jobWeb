import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import AuthContext from '../Context/AuthContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { SiGodaddy } from "react-icons/si";
import { SiExpedia } from "react-icons/si";
import { IoDocumentText } from "react-icons/io5";
import { FaGhost } from "react-icons/fa";
function JobHome() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs?page=1&limit=4`
        );
        setLatestJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching latest jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  const goToJobEdit = (id) => navigate(`/jobEdit/${id}`);
  const goToSingleView = (id) => navigate(`/jobs/${id}`);
  const goToJobs = () => navigate("/jobs")
  return (
    <div>
      <Navbar />
      <div className='flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-14 md:min-h-[80vh] bg-white'>
        <div className="flex flex-col justify-center text-center md:text-left items-center md:items-start w-full md:w-1/2 py-10 md:py-0">
          <p className='text-blue-600 font-semibold'>#1 Job Portal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Find Your Dream{" "}
            <span className="text-indigo-600">Job</span>
          </h1>


          <p className="text-lg text-gray-600 max-w-2xl">
            Discover thousands of part-time and full time opportunities across India.
            Secure your future with trusted employment.
          </p>
          <button onClick={goToJobs} className="bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 transition mt-4 w-fit">Explore Jobs</button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center py-10 md:py-0 hidden md:flex">
          <img src="https://www.sapphiresolutions.net/images/job_new_portfolio/job_portal_about.svg" className='w-full max-w-md object-contain' />
        </div>
      </div>
      <img src="https://res.cloudinary.com/dudjdf428/image/upload/v1772000989/ChatGPT_Image_Feb_24_2026_03_13_12_PM_1_xw0ume.png" className='w-full max-h-[50vh] object-cover' />
      <div className="w-full bg-blue-500 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-medium mb-12">
            Trusted by 100+ world's best companies
          </h2>


          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap md:flex-nowrap opacity-90">

            <SiGodaddy className="h-8 object-contain brightness-0 invert text-[35px]" />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg"
              alt="eBay"
              className="h-8 object-contain brightness-0 invert"
            />

            <SiExpedia className="h-8 object-contain brightness-0 invert text-[35px]" />

            <IoDocumentText className="h-8 object-contain brightness-0 invert text-[35px]" />

            <FaGhost className="h-8 object-contain brightness-0 invert text-[35px]" />

          </div>

        </div>

      </div>

      {/* Latest Jobs Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Latest Opportunities
        </h2>

        {loading ? (
          <div className="flex justify-center items-center w-full my-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className='flex flex-wrap gap-6 justify-center'>
            {latestJobs.map((item, id) => (
              <div key={id} className='bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full md:w-[48%] xl:w-[45%]'>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center justify-between w-full">
                    <p className='sm:text-xl font-semibold'>{item.title}</p>
                    {user?.email === "rahul@gmail.com" &&
                      <svg xmlns="http://www.w3.org/2000/svg" onClick={() => goToJobEdit(item._id)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:size-6 cursor-pointer size-5 text-gray-700 hover:text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    <p className='text-[16px] text-gray-700 font-medium ml-1'>{item.company}</p>
                  </div>
                  <p className="border-1 rounded-lg px-2 py-1 bg-green-100 border-green-300 text-green-700 text-xs font-medium">{item.jobType}</p>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{item.description}</p>
                <div className="flex mt-4 items-center justify-between">
                  <div className='flex items-center text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p className='text-sm'>{item.location}</p>
                  </div>
                  <p className='text-sm font-semibold text-gray-700'>₹{item.salary}/ monthly</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={() => goToSingleView(item._id)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm"
          >
            View More
          </button>
        </div>
      </div>
      <div className="w-full min-h-[60vh] py-16 flex flex-col items-center justify-center 
        bg-gradient-to-b from-blue-600 to-blue-500 text-center text-white px-4 relative overflow-hidden">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-8">
          Discover Your Next Career <br />
          Move with Ease
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto px-4 sm:px-0">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition" onClick={goToJobs}>
            Start job search
          </button>

          <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition" onClick={() => navigate("/about")}>
            Learn More
          </button>

        </div>
        <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full bottom-[-200px] pointer-events-none"></div>

      </div>
      <Footer />
    </div>
  )
}

export default JobHome
