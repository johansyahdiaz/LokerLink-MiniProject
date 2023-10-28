import { useState } from "react";
import Navbar from "../components/navbar";
import CategoryCard from "../components/categoryCard";
import { jobCategories, provinces } from "../utils/constants/constant.js";

function Homepage() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
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
                  <input className="input input-bordered join-item" placeholder="Search" />
                </div>
              </div>
              <select className="select select-bordered join-item">
                <option value="">Select Location</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>

              <div className="indicator">
                <button className="btn btn-primary join-item">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="category-card mt-20 text-center">
        <h2 className="text-center text-2xl">Category</h2>
        <div className="category-card-container">
          <CategoryCard categories={jobCategories} showMore={showMore} />
        </div>
        <button onClick={toggleShowMore} className="btn btn-primary mt-4 mx-auto ">
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      <div className="jobs-card mt-20 text-center">
        <h2 className="text-center text-2xl">Featured Jobs</h2>
      </div>
    </>
  );
}

export default Homepage;
