import { useState, useEffect } from "react";
import JobCard from "../components/jobCard";
import Navbar from "../components/navbar";
import { Toast } from "../utils/swalToast";
import { Link, useLocation } from "react-router-dom";
import { getFilteredJobVacancies } from "../utils/apis/jobVacancy/api";
import { jobCategories } from "../utils/constants/constant";

function JobCatalog() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialSearchText = searchParams.get("searchText") || "";
  const categoryFilter = searchParams.get("category") || "";

  const [jobVacancies, setJobVacancies] = useState([]);
  const [filters, setFilters] = useState({
    jobCategory: categoryFilter,
  });
  const [searchText, setSearchText] = useState(initialSearchText);

  const applyFilters = () => {
    fetchData(filters);
  };

  const resetFilters = () => {
    setFilters({
      jobCategory: "",
    });
    setSearchText("");
    fetchData();
  };

  async function fetchData(filters = {}) {
    try {
      const result = await getFilteredJobVacancies(filters);
      setJobVacancies(result);
    } catch (error) {
      Toast.fire(error.message);
    }
  }

  useEffect(() => {
    if (!jobVacancies.length) {
      fetchData(filters);
    }
  }, [filters]);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-6">List Lowongan Pekerjaan</h2>
          </div>
        </div>

        <div className="filter-container">
          <div className="px-5 py-2"></div>

          <div className="flex space-x-4 mb-4 p-5 border-solid border-2">
            <div>
              <select value={filters.jobCategory} onChange={(e) => setFilters({ ...filters, jobCategory: e.target.value })} className="px-4 py-2 border rounded-lg">
                <option value="">Pilih Kategori</option>
                {jobCategories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="btn btn-primary apply-filter" onClick={applyFilters}>
                Aplikasi Filter
              </button>
            </div>
            <div>
              <button className="btn reset-filter" onClick={resetFilters}>
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[50%] py-8">
          {jobVacancies.map((job) => (
            <Link key={job.jobVacancyId} to={`/job/${job.jobVacancyId}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default JobCatalog;
