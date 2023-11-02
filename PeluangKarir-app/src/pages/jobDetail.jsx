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
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            {jobData.jobTitle}-{jobData.companyName}
          </h1>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className=" border border-collapse border-transparent">
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-semibold">Kategori Pekerjaan:</td>
                  <td className="px-4 py-2">{jobData.jobCategory}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Tipe Kontrak Pekerjaan:</td>
                  <td className="px-4 py-2">{jobData.jobType}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Jenjang Pendidikan Minimum:</td>
                  <td className="px-4 py-2">{jobData.education}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Pengalaman Minimum:</td>
                  <td className="px-4 py-2">{jobData.experience}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Lokasi:</td>
                  <td className="px-4 py-2">{jobData.jobLocation}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Gaji:</td>
                  <td className="px-4 py-2">
                    Rp.{jobData.minSalary} - Rp.{jobData.maxSalary}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Application Deadline:</td>
                  <td className="px-4 py-2">{jobData.applicationDeadline}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-3">
            <div>
              <h1 className="text-xl font-bold mb-4 text-center">Deskripsi Lowongan</h1>
            </div>
            {parse(jobDescriptionHtml)}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 p-2 bg-white z-10 text-center">
        <button onClick={() => (window.location.href = `mailto:${jobData.companyEmail}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Apply Lamaran
        </button>
      </div>
    </>
  );
}

export default JobDetailPage;
