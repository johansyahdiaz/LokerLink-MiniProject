import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Dashboard() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [companyName, setCompanyName] = useState("Nama Perusahaan Anda");
  const [companyDescription, setCompanyDescription] = useState("Deskripsi perusahaan Anda.");

  const [jobs, setJobs] = useState([
    { id: 1, title: "Lowongan Pekerjaan 1", location: "Jakarta", type: "Full-time" },
    { id: 2, title: "Lowongan Pekerjaan 2", location: "Surabaya", type: "Part-time" },
  ]);

  const handleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Implement logic to save the edited profile data
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-10">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Profile Perusahaan</h2>

          {isEditingProfile ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium">
                  Nama Perusahaan
                </label>
                <input type="text" id="companyName" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>

              <div>
                <label htmlFor="companyDescription" className="block text-sm font-medium">
                  Deskripsi Perusahaan
                </label>
                <textarea id="companyDescription" name="companyDescription" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} rows="4" className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>Nama Perusahaan:</strong> {companyName}
              </p>
              <p>
                <strong>Deskripsi Perusahaan:</strong> {companyDescription}
              </p>
            </div>
          )}

          <div className="mt-6">
            {isEditingProfile ? (
              <button onClick={handleSaveProfile} className="btn btn-primary">
                Save
              </button>
            ) : (
              <button onClick={handleEditProfile} className="btn btn-secondary">
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">Lowongan Pekerjaan</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>
                    <Link to={`/edit-job/${job.id}`} className="btn btn-primary mr-2">
                      Edit
                    </Link>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <Link to="/vacancy-form" className="btn btn-primary">
              Create Job
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
