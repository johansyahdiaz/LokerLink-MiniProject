import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footerbar";
import CategoryCard from "../components/categoryCard";
import { jobCategories, provinces } from "../utils/constants/constant.js";
import JobCard from "../components/jobCard";
import { getJobVacancy } from "../utils/apis/jobVacancy/api";
import { Link } from "react-router-dom";
import { Toast } from "../utils/swalToast";

function Homepage() {
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    async function fetchFeaturedJobs() {
      try {
        const result = await getJobVacancy({ limit: 12, sort: "desc" });
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
            <h1 className="text-5xl font-bold">Temukan pekerjaan yang sesuai dengan minat & keahlian Anda.</h1>
            <p className="py-6">
              Selamat datang di Pluang Karir, platform pencarian kerja yang menghubungkan Anda dengan peluang karir yang luar biasa. Temukan pekerjaan impian Anda, jelajahi beragam industri, dan raih kesuksesan di masa depan yang cerah
              bersama kami. Bergabunglah sekarang untuk mengubah karir Anda!
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
          {Array.isArray(featuredJobs) ? featuredJobs.map((job) => <JobCard key={job.jobVacancyId} job={job} />) : <p>No featured jobs available</p>}
        </div>

        <div className="text-center py-5">
          <Link to="/job-catalog">
            <button className="btn btn-primary mt-4 mx-auto">{showMore ? "Show Less" : "Show More"}</button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Homepage;
