import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-[#0F172A] text-gray-300 py-10 px-6 ">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between sm:items-start gap-8">
    <div className="flex flex-col items-center gap-3">
      <div className="bg-blue-500 p-2 rounded-xl flex items-center justify-center sm:w-[3vw] w-[10vw]">
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
    <div className='flex flex-col flex-wrap gap-2'>
        <a className="text-sm text-gray-400" href='/home'>
            Home
        </a>

        <a className="text-sm text-gray-400" href='/jobs'>
            Jobs
        </a>
        <p className="text-sm text-gray-400">Application</p>
        <p className="text-sm text-gray-400">Applicants</p>
    </div>

    <div className="flex flex-col  text-center sm:text-left">
      <p className="text-sm text-gray-400">
        Corporate Part-time Jobs
      </p>
      <p className="mt-2 text-sm text-gray-400 max-w-md">
        Connect with opportunities across India. Find part-time jobs that fit your skills and schedule.
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

export default Footer
