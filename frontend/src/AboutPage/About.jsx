import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function About() {
    return (
        <div>
            <Navbar />
            <div className="w-full bg-blue-500 py-20 px-6 sm:px-12 text-center text-white">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                    About <span className="text-indigo-900 border-b-4 border-indigo-900">Sarkar Jobs</span>
                </h1>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto opacity-90">
                    We are dedicated to connecting talented professionals with India's best organizations.
                    Our mission is to simplify the job search process, ensuring transparency, trust,
                    and opportunity for every career stage.
                </p>
            </div>
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0v.75H4.5v-.75Z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">1M+ Users</h3>
                        <p className="text-gray-600">Empowering millions of job seekers to find their perfect role with confidence and ease.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Top Companies</h3>
                        <p className="text-gray-600">Trusted by the world's leading organizations to source the best and brightest talent.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Growth</h3>
                        <p className="text-gray-600">Accelerating careers with tools and insights designed to help you land offers faster.</p>
                    </div>

                </div>
            </div>
            <div className="w-full bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="https://img.freepik.com/free-vector/team-goals-concept-illustration_114360-5157.jpg"
                            alt="Our Team Vision"
                            className="w-full rounded-2xl shadow-lg object-cover"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Bridging the Gap Between Talent and Opportunity</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded with the vision to democratize the job market, Sarkar Jobs was built to serve as a reliable bridge between ambitious professionals and forward-thinking companies. We realized that traditional hiring processes were often opaque and inefficient.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Today, our platform leverages cutting-edge technology and human-centric design to ensure that your resume reaches the right desks, and your potential is recognized. Whether you're looking for an entry-level position or a leadership role, we are with you every step of the way.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;
