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

  const filteredJobs = Array.isArray(jobVacancies)
    ? jobVacancies
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
        .slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-6">List Lowongan Pekerjaan</h2>
          </div>
          <div>
            <div className="form-control">
              <div className="input-group">
                <input type="text" placeholder="Cari lowongan ......" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="input input-bordered" />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-container">
          <div className="px-5 py-2">
            <button className="btn filter-toggle" onClick={toggleFilter}>
              {isFilterOpen ? "Sembunyikan Filter" : "Tampilkan Filter"}
            </button>
          </div>

          {isFilterOpen && (
            <div className="flex space-x-4 mb-4 p-5 border-solid border-2">
              <div className="flex gap-2">
                <select
                  value={filters.jobCategory}
                  onChange={(e) => {
                    setFilters({ ...filters, jobCategory: e.target.value });
                    applyFilters(); // Panggil applyFilters saat filter berubah
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="">Pilih Kategori</option>
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
                  <option value="">Pilih Lokasi</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })} className="px-4 py-2 border rounded-lg">
                  <option value="">Pilih Pengalaman</option>
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>

                <select value={filters.education} onChange={(e) => setFilters({ ...filters, education: e.target.value })} className="px-4 py-2 border rounded-lg">
                  <option value="">Pilih Pendidikan</option>
                  {educationOptions.map((edu) => (
                    <option key={edu} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>

                <label>
                  <input type="checkbox" checked={filters.disabilitas} onChange={(e) => setFilters({ ...filters, disabilitas: e.target.checked })} />
                  Disabilitas dapat mendaftar
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[50%] py-8">
          {filteredJobs.map((job) => (
            <Link key={job.jobVacancyId} to={`/job/${job.jobVacancyId}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>

        <div className="pagination py-10">
          <div className="join grid grid-cols-2">
            <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Halaman Sebelumnya
            </button>
            <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= jobVacancies.length}>
              Halaman Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCatalog;
