import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import Navbar from "../Navbar";
import Footer from "../Footer";

function SingleApplicant() {

  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {

    const getApplicant = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/applicant/${id}`
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
  console.log(applicant)
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white shadow-lg rounded-xl p-6">

          {/* Applicant Info */}
          <h2 className="text-2xl font-bold">
            {applicant.name}
          </h2>

          <p className="text-gray-600">{applicant.email}</p>
          <p className="text-gray-600">{applicant.number}</p>

          <hr className="my-4"/>

          {/* Job Info */}
          <h3 className="text-lg font-semibold">Job Applied</h3>

          <p>{applicant.jobId?.title}</p>
          <p className="text-gray-500">
            {applicant.jobId?.company} • {applicant.jobId?.location}
          </p>

          <hr className="my-4"/>

          {/* Skills */}
          <h3 className="text-lg font-semibold">Skills</h3>

          <div className="flex gap-2 flex-wrap mt-2">
            {applicant.profileId?.skills?.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <hr className="my-4"/>

          {/* Description */}
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-600">
            {applicant.description}
          </p>

          <hr className="my-4"/>

          {/* Resume */}
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/${applicant.resume}`}
            target="_blank"
            className="bg-black text-white px-4 py-2 rounded-md"
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