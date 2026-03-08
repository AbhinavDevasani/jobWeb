import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

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
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Applicant Details</h1>
          <Link className="text-gray-600 hover:text-black text-lg" to={'/applicants'}>← Back to Applicants</Link>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold">{applicant.name}</h2>

          <div className="mt-3 text-gray-600 space-y-1">
            <p>{applicant.email}</p>
            <p>{applicant.number}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Job Applied</h3>

          <p className="text-lg font-medium">{applicant.jobId?.title}</p>

          <p className="text-gray-500">
            {applicant.jobId?.company} • {applicant.jobId?.location}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Applied on {new Date(applicant.appliedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {applicant.profileId?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Education</h3>

            {applicant.profileId?.education?.map((edu, index) => (
              <div key={index} className="border-b py-2 last:border-none">
                <p className="font-medium">{edu.degree}</p>

                <p className="text-gray-600">{edu.institution}</p>

                <p className="text-sm text-gray-400">
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Profile Summary</h3>

            <p className="text-gray-600">{applicant.profileId?.summary}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Application Message</h3>

            <p className="text-gray-600">{applicant.description}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Resume</h3>

          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/${applicant.resume}`}
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            View Resume
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleApplicant;
