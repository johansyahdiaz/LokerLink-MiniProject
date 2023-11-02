import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Toast } from "../utils/swalToast";
import { getSpesificJobVacancy, deleteJobVacancy } from "../utils/apis/jobVacancy/api";

function Dashboard() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [companyName, setCompanyName] = useState("Nama Perusahaan Anda");
  const [companyDescription, setCompanyDescription] = useState("Deskripsi perusahaan Anda.");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const result = await getSpesificJobVacancy();
      setJobs(result);
    } catch (error) {
      Toast.fire(error.message);
    }
  }

  useEffect(() => {
    fetchData();

    const storedCompanyName = localStorage.getItem("companyName");
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }

    const storedCompanyDescription = localStorage.getItem("companyDescription");
    if (storedCompanyDescription) {
      setCompanyDescription(storedCompanyDescription);
    }
  }, []);

  const handleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("companyDescription", companyDescription);
  };

  const handleDelete = async (jobVacancyId) => {
    try {
      await deleteJobVacancy(jobVacancyId);
      Toast.fire({ icon: "success", title: "Successfully deleted product" });
      fetchData();
    } catch (error) {
      Toast.fire({ icon: "error", title: error.message });
    }
  };

  const handleEdit = (jobVacancyId) => {
    navigate(`/vacancy-form/${jobVacancyId}`);
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
              <button onClick={handleEditProfile} className="btn btn-primary">
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
                <th>Application Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.jobVacancyId}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobLocation}</td>
                  <td>{job.jobType}</td>
                  <td>{job.applicationDeadline}</td>
                  <td>
                    <button onClick={() => handleEdit(job.jobVacancyId)} className="btn btn-primary mr-2">
                      Edit
                    </button>

                    <button onClick={() => handleDelete(job.jobVacancyId)} className="btn btn-error">
                      Delete
                    </button>
                    <Link to={`/job-details/${job.jobVacancyId}`} className="btn btn-secondary ml-2">
                      View Job Vacancy
                    </Link>
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
