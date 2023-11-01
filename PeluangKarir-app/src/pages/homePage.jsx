import { useState, useEffect } from "react"; // Perlu mengimpor `useEffect`
import Navbar from "../components/navbar";
import CategoryCard from "../components/categoryCard";
import { jobCategories, provinces } from "../utils/constants/constant.js";
import JobCard from "../components/jobCard"; // Import JobCard
import { getJobVacancy } from "../utils/apis/jobVacancy/api"; // Import fungsi getJobVacancy
import { Link } from "react-router-dom";
import { Toast } from "../utils/swalToast";

function Homepage() {
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]); // State untuk menyimpan jobCard terbaru

  useEffect(() => {
    // Menggunakan useEffect untuk mengambil 10 jobCard terbaru saat halaman dimuat
    async function fetchFeaturedJobs() {
      try {
        // Ganti "filters" dengan parameter yang sesuai untuk mendapatkan jobCard terbaru
        const result = await getJobVacancy({ limit: 10, sort: "desc" });
        setFeaturedJobs(result);
      } catch (error) {
        Toast.fire({ icon: "error", title: error.message });
      }
    }

    fetchFeaturedJobs();
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleSearch = () => {
    const searchQuery = searchText ? `searchText=${searchText}` : "";
    const locationQuery = selectedLocation ? `location=${selectedLocation}` : "";

    const queryParams = [searchQuery, locationQuery].filter(Boolean).join("&");
    window.location.href = `/job-catalog?${queryParams}`;
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="./hero_img.png" className="max-w-sm rounded-lg shadow-2xl" alt="Hero" />
          <div>
            <h1 className="text-5xl font-bold">Find a job that suits your interest & skills.</h1>
            <p className="py-6">
              Welcome to Pluang Career, the job search platform connecting you with outstanding career opportunities. Discover your dream job, explore diverse industries, and achieve success in a bright future with us. Join now to transform
              your career!
            </p>
            <div className="join">
              <div>
                <div>
                  <input className="input input-bordered join-item" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
              </div>
              <select className="select select-bordered join-item" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="">Select Location</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>

              <div className="indicator">
                <button className="btn btn-primary join-item" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="category-card mt-20 text-center">
        <h2 className="text-center text-2xl">Category</h2>
        <div className="category-card-container" style={{ padding: "0px 50px" }}>
          <CategoryCard categories={jobCategories} showMore={showMore} />
        </div>
        <button onClick={toggleShowMore} className="btn btn-primary mt-4 mx-auto ">
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      <div className="jobs-card mt-20">
        <h2 className="text-center text-2xl">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ padding: "0px 85px" }}>
          {featuredJobs.map((job) => (
            <JobCard key={job.jobVacancyId} job={job} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/job-catalog">
            <button className="btn btn-primary mt-4 mx-auto">{showMore ? "Show Less" : "Show More"}</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Homepage;
