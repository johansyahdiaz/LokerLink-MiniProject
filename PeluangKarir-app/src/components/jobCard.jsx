import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job, onBookmarkClick }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg  ">
      <div className="flex">
        <div className="min-w-[70%]">
          <Link to={`/job-details/${job.jobVacancyId}`}>
            <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
            <p className="text-sm text-gray-600 mb-2">{job.jobType}</p>
            <p className="text-base font-semibold text-primary">${job.salary}</p>
            <p className="text-sm text-gray-600">{job.companyName}</p>
            <p className="text-sm text-gray-600">{job.jobLocation}</p>
          </Link>
        </div>
        <div className="min-w-[30%] flex justify-end items-end h-40 p-4 relative">
          <button onClick={() => onBookmarkClick(job)} className="mt-4 btn btn-secondary absolute bottom-4 right-4">
            <i className="fa-regular fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
