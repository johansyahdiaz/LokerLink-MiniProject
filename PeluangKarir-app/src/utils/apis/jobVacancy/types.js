import * as z from "zod";

export const formVacancySchema = z.object({
  jobTitle: z.string().min(1, { message: "Please enter a valid Job Title" }),
  jobCategory: z.string().min(1, { message: "Please enter a valid Job Category" }),
  jobType: z.string().min(1, { message: "Please enter a valid Job Type" }),
  jobLocation: z.string().min(1, { message: "Please enter a valid Job Location" }),
  minSalary: z.string().min(1, { message: "Please enter a valid minSalary" }),
  maxSalary: z.string().min(1, { message: "Please enter a valid MaxSalary" }),
  experience: z.string().min(1, { message: "Please enter a valid experience" }),
  education: z.string().min(1, { message: "Please enter a valid education" }),
  applicationDeadline: z.string().min(1, { message: "Please enter a valid application deadline" }),
  // jobDescription: z.string().min(1, { message: "Please enter a job description" }),
  disabilitas: z.boolean({ invalid_type_error: "Disabilities must be a boolean" }),
});
