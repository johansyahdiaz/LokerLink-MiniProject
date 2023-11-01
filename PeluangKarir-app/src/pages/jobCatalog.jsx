import React, { useState, useEffect } from "react";
import JobCard from "../components/jobCard";
import { getJobVacancy } from "../utils/apis/jobVacancy/api";
import { provinces, jobCategories, experienceOptions, educationOptions } from "../utils/constants/constant";
import Navbar from "../components/navbar";
import { Toast } from "../utils/swalToast";
import { Link, useLocation } from "react-router-dom";

function JobCatalog() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialSearchText = searchParams.get("searchText") || "";
  const locationFilter = searchParams.get("location") || "";
  const categoryFilter = searchParams.get("category") || "";

  const [jobVacancies, setJobVacancies] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    jobCategory: categoryFilter,
    jobType: "",
    jobLocation: locationFilter,
    salary: "",
    experience: "",
    education: "",
    disabilitas: false,
  });
  const [searchText, setSearchText] = useState(initialSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilters = () => {
    fetchData();
  };

  async function fetchData() {
    try {
      const result = await getJobVacancy({
        searchText,
        locationFilter: filters.jobLocation,
        jobCategory: filters.jobCategory,
        jobType: filters.jobType,
        salary: filters.salary,
        experience: filters.experience,
        education: filters.education,
        disabilitas: filters.disabilitas,
      });

      setJobVacancies(result);
    } catch (error) {
      Toast.fire(error.message);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getJobVacancy();
        setJobVacancies(result);
      } catch (error) {
        Toast.fire(error.message);
      }
    }

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredJobs = jobVacancies
    .filter((job) => {
      return (
        (!searchText || job.jobTitle.toLowerCase().includes(searchText.toLowerCase())) &&
        (!filters.jobCategory || job.jobCategory === filters.jobCategory) &&
        (!filters.jobType || job.jobType === filters.jobType) &&
        (!filters.jobLocation || job.jobLocation === filters.jobLocation) &&
        (!filters.experience || job.experience === filters.experience) &&
        (!filters.education || job.education === filters.education) &&
        (!filters.disabilitas || job.disabilitas)
      );
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Job Vacancy Catalog</h2>
          </div>
          <div>
            <div className="form-control">
              <div className="input-group">
                <input type="text" placeholder="Search job titles..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="input input-bordered" />
                <button className="btn btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-container">
          <button className="btn filter-toggle" onClick={toggleFilter}>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
          {isFilterOpen && (
            <div className="flex space-x-4 mb-4">
              <select value={filters.jobCategory} onChange={(e) => setFilters({ ...filters, jobCategory: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Select Category</option>
                {jobCategories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>

              <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>

              <select value={filters.jobLocation} onChange={(e) => setFilters({ ...filters, jobLocation: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Select Location</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>

              <select value={filters.salary} onChange={(e) => setFilters({ ...filters, salary: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Filter by Salary</option>
                {/* Add options for salary ranges */}
              </select>

              <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Select Experience</option>
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>

              <select value={filters.education} onChange={(e) => setFilters({ ...filters, education: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Select Education</option>
                {educationOptions.map((edu) => (
                  <option key={edu} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>

              <label>
                <input type="checkbox" checked={filters.disabilitas} onChange={(e) => setFilters({ ...filters, disabilitas: e.target.checked })} />
                Filter by Disabilitas
              </label>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredJobs.map((job) => (
            <Link key={job.jobVacancyId} to={`/job/${job.jobVacancyId}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>

        <div className="pagination">
          <div className="join grid grid-cols-2">
            <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous page
            </button>
            <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= jobVacancies.length}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCatalog;
