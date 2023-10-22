import React, { useState } from "react";

function VacancyForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const provinces = [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Barat",
    "Riau",
    "Jambi",
    "Sumatera Selatan",
    "Bengkulu",
    "Lampung",
    "Banten",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Bali",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Kalimantan Barat",
    "Kalimantan Tengah",
    "Kalimantan Selatan",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Sulawesi Utara",
    "Gorontalo",
    "Sulawesi Tengah",
    "Sulawesi Selatan",
    "Sulawesi Tenggara",
    "Sulawesi Barat",
    "Maluku",
    "Maluku Utara",
    "Papua Barat",
    "Papua",
    "Lainnya",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses data pekerjaan yang telah diisi
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Post a Job</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium">
              Job Title
            </label>
            <input type="text" id="jobTitle" name="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium">
              Job Description
            </label>
            <textarea id="jobDescription" name="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows="4" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label htmlFor="jobLocation" className="block text-sm font-medium">
              Job Location (Provinsi)
            </label>
            <select id="jobLocation" name="jobLocation" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select Location</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="jobType" className="block text-sm font-medium">
              Job Type
            </label>
            <input type="text" id="jobType" name="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label htmlFor="jobSalary" className="block text-sm font-medium">
              Salary
            </label>
            <input type="text" id="jobSalary" name="jobSalary" value={jobSalary} onChange={(e) => setJobSalary(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium">
              Application Deadline
            </label>
            <input type="date" id="applicationDeadline" name="applicationDeadline" value={applicationDeadline} onChange={(e) => setApplicationDeadline(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="btn btn-primary">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default VacancyForm;
