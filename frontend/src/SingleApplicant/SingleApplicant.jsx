import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";

function SingleApplicant() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const getApplicant = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/applicant/${id}`,
        );

        setApplicant(res.data.Result);
      } catch (err) {
        console.log(err);
      }
    };

    getApplicant();
  }, [id]);

  if (!applicant) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  console.log(applicant);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link
          to="/applicants"
          className="flex items-center gap-2 text-gray-600 hover:text-black font-medium"
        >
          <FaArrowLeft />
          Back to Applicants
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border-gray-200 border-2 flex flex-col items-center text-center">
          <div className="flex flex-col items-center w-full">
            <div className="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center text-4xl font-bold mx-auto">
              {applicant.name?.charAt(0)}
            </div>

            <h2 className="text-xl font-semibold mt-4">{applicant.name}</h2>
            <p className="text-gray-500">{applicant.jobId?.title}</p>
          </div>

          <div className="space-y-2 text-sm w-full">
            <p>
              <strong>Email:</strong> {applicant.email}
            </p>
            <p>
              <strong>Phone:</strong> {applicant.number}
            </p>
            <p>
              <strong>Location:</strong> {applicant.jobId?.location}
            </p>
          </div>

          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/${applicant.resume}`}
            target="_blank"
            className="block text-center bg-black text-white py-2 px-4 rounded-lg w-full mt-4"
          >
            Download Resume
          </a>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border-gray-200 border-2">
            <h3 className="font-semibold text-lg mb-2">Profile Summary</h3>
            <p className="text-gray-600">{applicant.profileId?.summary}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border-gray-200 border-2">
            <h3 className="font-semibold text-lg mb-3">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {applicant.profileId?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border-gray-200 border-2">
            <h3 className="font-semibold text-lg mb-3">Education</h3>

            {applicant.profileId?.education?.map((edu, i) => (
              <div key={i} className="border-b py-2 last:border-none">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-gray-500">{edu.institution}</p>
                <p className="text-sm text-gray-400">
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleApplicant;
