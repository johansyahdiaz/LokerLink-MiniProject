import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import parse from "html-react-parser";
import { getDetailJobVacancy } from "../utils/apis/jobVacancy/api";
import { Toast } from "../utils/swalToast";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";

function JobDetailPage() {
  const { jobVacancyId } = useParams();
  const [jobData, setJobData] = useState({});
  const [jobDescriptionHtml, setJobDescriptionHtml] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getDetailJobVacancy(jobVacancyId);
        setJobData(result);

        const delta = result.jobDescription.ops;

        let cfg = {};

        let converter = new QuillDeltaToHtmlConverter(delta, cfg);

        const quillHtml = converter.convert();

        setJobDescriptionHtml(quillHtml);
      } catch (error) {
        Toast.fire({ icon: "error", title: error.message });
      }
    }

    fetchData();
  }, [jobVacancyId]);

  return (
    <>
      <Navbar></Navbar>
      <div className="job-detail-container p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{jobData.jobTitle}</h1>
        <p className="text-lg">Company: {jobData.companyName}</p>
        <p className="text-lg">Application Deadline: {jobData.applicationDeadline}</p>
        <p className="text-lg">Job Category: {jobData.jobCategory}</p>
        <p className="text-lg">Job Type: {jobData.jobType}</p>
        <p className="text-lg">Location: {jobData.jobLocation}</p>
        <p className="text-lg">Experience: {jobData.experience}</p>
        <p className="text-lg">Education: {jobData.education}</p>
        <div className="job-description text-lg mt-4">{parse(jobDescriptionHtml)}</div>
      </div>
    </>
  );
}

export default JobDetailPage;
