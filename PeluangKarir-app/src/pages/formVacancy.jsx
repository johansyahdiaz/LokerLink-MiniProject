// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { provinces, jobCategories, experienceOptions, educationOptions } from "../utils/constants/constant";
import Navbar from "../components/navbar";
import { Toast } from "../utils/swalToast";
import { useNavigate } from "react-router-dom";
import { createJobVacancy, updateJobVacancy } from "../utils/apis/jobVacancy/api";
import { formVacancySchema } from "../utils/apis/jobVacancy/types";

function VacancyForm() {
  //   const [selectedId, setSelectedId] = useState(0);
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem("UserId");
  const storedCompanyName = localStorage.getItem("CompanyName");
  const storedCompanyEmail = localStorage.getItem("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formVacancySchema),
    defaultValues: {
      UserId: storedUserId,
      companyName: storedCompanyName,
      companyEmail: storedCompanyEmail,
      jobTitle: "",
      jobCategory: "",
      jobType: "",
      jobLocation: "",
      minSalary: 0,
      maxSalary: 0,
      experience: "",
      education: "",
      jobDescription: "",
      applicationDeadline: "",
      disabilitas: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted");
      console.log("Data yang dikirim ke server:", data);
      await createJobVacancy(data);
      Toast.fire({ icon: "success", title: "Success added new data" });
      navigate("/profile-dashboard");
    } catch (error) {
      Toast.fire({ icon: "error", title: error.message });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto p-6 border shadow-lg rounded-lg w-screen bg-white">
          <h2 className="text-2xl font-semibold mb-6">Post a Job</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium">
                Job Title
              </label>
              <input type="text" id="jobTitle" name="jobTitle" {...register("jobTitle")} className={`w-full px-4 py-2 border rounded-lg ${errors.jobTitle ? "border-red-500" : ""}`} />
              {errors.jobTitle && <span className="text-error">{errors.jobTitle.message}</span>}
            </div>

            <div>
              <label htmlFor="jobCategory" className="block text-sm font-medium">
                Job Category
              </label>
              <select id="jobCategory" name="jobCategory" {...register("jobCategory")} className={`w-full px-4 py-2 border rounded-lg ${errors.jobCategory ? "border-red-500" : ""}`}>
                <option value="">Select Category</option>
                {jobCategories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
              {errors.jobCategory && <span className="text-error">{errors.jobCategory.message}</span>}
            </div>

            <div>
              <label htmlFor="jobType" className="block text-sm font-medium">
                Job Type
              </label>
              <select id="jobType" name="jobType" {...register("jobType")} className={`w-full px-4 py-2 border rounded-lg ${errors.jobType ? "border-red-500" : ""}`}>
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.jobType && <span className="text-error">{errors.jobType.message}</span>}
            </div>

            <div>
              <label htmlFor="jobLocation" className="block text-sm font-medium">
                Job Location (Provinsi)
              </label>
              <select id="jobLocation" name="jobLocation" {...register("jobLocation")} className={`w-full px-4 py-2 border rounded-lg ${errors.jobLocation ? "border-red-500" : ""}`}>
                <option value="">Select Location</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.jobLocation && <span className="text-error">{errors.jobLocation.message}</span>}
            </div>

            <div>
              <label htmlFor="minSalary" className="block text-sm font-medium">
                Minimum Salary
              </label>
              <input type="number" id="minSalary" name="minSalary" {...register("minSalary")} className={`w-full px-4 py-2 border rounded-lg ${errors.minSalary ? "border-red-500" : ""}`} />
              {errors.minSalary && <span className="text-error">{errors.minSalary.message}</span>}
            </div>

            <div>
              <label htmlFor="maxSalary" className="block text-sm font-medium">
                Maximum Salary
              </label>
              <input type="number" id="maxSalary" name="maxSalary" {...register("maxSalary")} className={`w-full px-4 py-2 border rounded-lg ${errors.maxSalary ? "border-red-500" : ""}`} />
              {errors.maxSalary && <span className="text-error">{errors.maxSalary.message}</span>}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium">
                Experience
              </label>
              <select id="experience" name="experience" {...register("experience")} className={`w-full px-4 py-2 border rounded-lg ${errors.experience ? "border-red-500" : ""}`}>
                <option value="">Select Experience</option>
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              {errors.experience && <span className="text-error">{errors.experience.message}</span>}
            </div>

            <div>
              <label htmlFor="education" className="block text-sm font-medium">
                Education
              </label>
              <select id="education" name="education" {...register("education")} className={`w-full px-4 py-2 border rounded-lg ${errors.education ? "border-red-500" : ""}`}>
                <option value="">Select Education</option>
                {educationOptions.map((edu) => (
                  <option key={edu} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>
              {errors.education && <span className="text-error">{errors.education.message}</span>}
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium">
                Job Description
              </label>
              <textarea id="jobDescription" name="jobDescription" {...register("jobDescription")} rows="4" className={`w-full px-4 py-2 border rounded-lg ${errors.jobDescription ? "border-red-500" : ""}`} />
              {errors.jobDescription && <span className="text-error">{errors.jobDescription.message}</span>}
            </div>

            <div>
              <label htmlFor="applicationDeadline" className="block text-sm font-medium">
                Application Deadline
              </label>
              <input type="date" id="applicationDeadline" name="applicationDeadline" {...register("applicationDeadline")} className={`w-full px-4 py-2 border rounded-lg ${errors.applicationDeadline ? "border-red-500" : ""}`} />
              {errors.applicationDeadline && <span className="text-error">{errors.applicationDeadline.message}</span>}
            </div>

            <div>
              <input type="checkbox" id="disabilitas" name="disabilitas" {...register("disabilitas")} />
              <label htmlFor="disabilitas" className="text-sm font-medium ml-2">
                Disabilitas dapat mendaftar
              </label>
              {errors.disabilitas && <span className="text-error">{errors.disabilitas.message}</span>}
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full" disabled={isSubmitting}>
              Post Job
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default VacancyForm;
