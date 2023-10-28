import React, { useState, useEffect } from "react";
import JobCard from "../components/jobCard";
import { getJobVacancy } from "../utils/apis/jobVacancy/api";

function JobCatalog() {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [filters, setFilters] = useState({
    jobCategory: "",
    jobType: "",
    jobLocation: "",
    salary: "",
    experience: "",
    education: "",
    disabilitas: false,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getJobVacancy();
        setJobVacancies(result);
      } catch (error) {
        // Handle error
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Job Vacancy Catalog</h2>

      <div className="flex space-x-4 mb-4">
        <input type="text" placeholder="Search job titles..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-1/2 px-4 py-2 border rounded-lg" />

        <select value={filters.jobCategory} onChange={(e) => setFilters({ ...filters, jobCategory: e.target.value })} className="px-4 py-2 border rounded-lg">
          <option value="">Filter by Job Category</option>
          {/* Add options for job categories */}
        </select>

        <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })} className="px-4 py-2 border rounded-lg">
          <option value="">Filter by Job Type</option>
          {/* Add options for job types */}
        </select>

        <select value={filters.jobLocation} onChange={(e) => setFilters({ ...filters, jobLocation: e.target.value })} className="px-4 py-2 border rounded-lg">
          <option value="">Filter by Job Location</option>
          {/* Add options for job locations */}
        </select>

        <select value={filters.salary} onChange={(e) => setFilters({ ...filters, salary: e.target.value })} className="px-4 py-2 border rounded-lg">
          <option value="">Filter by Salary</option>
          {/* Add options for salary ranges */}
        </select>

        <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })} className="px-4 py-2 border rounded-lg">
          <option value="">Filter by Experience</option>
          {/* Add options for experience levels */}
        </select>

        <select value={filters.education} onChange={(e) => setFilters({ ...filters, education: e.target.value })} className="px-4 py-2 border rounded-lg">
          <option value="">Filter by Education</option>
          {/* Add options for education levels */}
        </select>

        <label>
          <input type="checkbox" checked={filters.disabilitas} onChange={(e) => setFilters({ ...filters, disabilitas: e.target.checked })} />
          Filter by Disabilitas
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobVacancies
          .filter((job) => {
            if (filters.jobCategory && job.jobCategory !== filters.jobCategory) {
              return false;
            }
            if (filters.jobType && job.jobType !== filters.jobType) {
              return false;
            }
            if (filters.jobLocation && job.jobLocation !== filters.jobLocation) {
              return false;
            }
            if (filters.salary && job.salary !== filters.salary) {
              return false;
            }
            if (filters.experience && job.experience !== filters.experience) {
              return false;
            }
            if (filters.education && job.education !== filters.education) {
              return false;
            }
            if (filters.disabilitas && !job.disabilitas) {
              return false;
            }
            if (searchText && !job.jobTitle.toLowerCase().includes(searchText.toLowerCase())) {
              return false;
            }
            return true;
          })
          .map((job) => (
            <JobCard key={job.jobVacancyId} job={job} />
          ))}
      </div>
    </div>
  );
}

export default JobCatalog;
