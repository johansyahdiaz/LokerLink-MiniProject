import { useState } from "react";
import Navbar from "../components/navbar";
import CategoryCard from "../components/categoryCard";
import categories from "../utils/constants/category";

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
                <option defaultValue>Pilih Lokasi</option>
                <option>Aceh</option>
                <option>Sumatera Utara</option>
                <option>Sumatera Barat</option>
                <option>Riau</option>
                <option>Jambi</option>
                <option>Sumatera Selatan</option>
                <option>Bengkulu</option>
                <option>Lampung</option>
                <option>Banten</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>DI Yogyakarta</option>
                <option>Jawa Timur</option>
                <option>Bali</option>
                <option>Nusa Tenggara Barat</option>
                <option>Nusa Tenggara Timur</option>
                <option>Kalimantan Barat</option>
                <option>Kalimantan Tengah</option>
                <option>Kalimantan Selatan</option>
                <option>Kalimantan Timur</option>
                <option>Kalimantan Utara</option>
                <option>Sulawesi Utara</option>
                <option>Gorontalo</option>
                <option>Sulawesi Tengah</option>
                <option>Sulawesi Selatan</option>
                <option>Sulawesi Tenggara</option>
                <option>Sulawesi Barat</option>
                <option>Maluku</option>
                <option>Maluku Utara</option>
                <option>Papua Barat</option>
                <option>Papua</option>
                <option>Lainnya</option>
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
          <CategoryCard categories={categories} showMore={showMore} />
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
