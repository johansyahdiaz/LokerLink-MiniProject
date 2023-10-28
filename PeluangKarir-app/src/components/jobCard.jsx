import React from "react";

function JobCard({ job, onBookmarkClick }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
      <p className="text-sm text-gray-600 mb-2">{job.jobType}</p>
      <p className="text-base font-semibold text-primary">${job.salary}</p>
      <p className="text-sm text-gray-600">{job.companyName}</p>
      <p className="text-sm text-gray-600">{job.jobLocation}</p>
      <button onClick={() => onBookmarkClick(job)} className="mt-4 btn btn-secondary">
        Bookmark
      </button>
    </div>
  );
}

export default JobCard;
