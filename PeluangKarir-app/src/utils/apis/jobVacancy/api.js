import axiosWithConfig from "../axiosWithConfig";

export const createJobVacancy = async (data) => {
  const storedUserId = localStorage.getItem("UserId");
  const storedCompanyName = localStorage.getItem("companyName");
  const storedCompanyEmail = localStorage.getItem("email");

  try {
    data.UserId = storedUserId;
    data.companyName = storedCompanyName;
    data.companyEmail = storedCompanyEmail;

    const response = await axiosWithConfig.post("/Job", data);

    return response.data;
  } catch (error) {
    throw Error("Failed to create a Job Vacancy");
  }
};

export const updateJobVacancy = async (data) => {
  const { jobVacancyId } = data;
  try {
    const response = await axiosWithConfig.put(`/Job/${jobVacancyId}`, data);

    return response.data;
  } catch (error) {
    throw Error("Failed to update a Form Job Vacancy");
  }
};

export const getJobVacancy = async () => {
  try {
    const response = await axiosWithConfig.get("/Job");

    return response.data;
  } catch (error) {
    throw Error("Failed to get Job Vacancy");
  }
};

export const getSpesificJobVacancy = async () => {
  try {
    const storedUserId = localStorage.getItem("UserId");

    if (!storedUserId) {
      throw Error("User ID is not available in localStorage");
    }

    const response = await axiosWithConfig.get("/Job", {
      params: { UserId: storedUserId },
    });

    return response.data;
  } catch (error) {
    throw Error("Failed to get Job Vacancy");
  }
};

export const deleteJobVacancy = async (jobVacancyId) => {
  try {
    const response = await axiosWithConfig.delete(`/Job/${jobVacancyId}`);

    return response.data;
  } catch (error) {
    throw Error("Failed to delete a product");
  }
};

export const getDetailJobVacancy = async (jobVacancyId) => {
  try {
    const response = await axiosWithConfig.get(`/Job/${jobVacancyId}`);

    return response.data;
  } catch (error) {
    throw Error("Failed to get a Job Vacancy");
  }
};

export const getJobVacancyById = async (jobVacancyId) => {
  try {
    const response = await axiosWithConfig.get(`/Job/${jobVacancyId}`);
    return response.data;
  } catch (error) {
    throw Error("Failed to get specific Job Vacancy");
  }
};

export const getFilteredJobVacancies = async (filters) => {
  try {
    const response = await axiosWithConfig.get("/Job", {
      params: filters,
    });

    return response.data;
  } catch (error) {
    throw Error("Failed to get filtered Job Vacancy");
  }
};
