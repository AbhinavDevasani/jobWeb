import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
function JobHome() {



  return (
    <div>
      <Navbar />
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

      <Footer />
    </div>
  )
}

export default JobHome
