import axiosInstance from "./../../utils/axios";

export const fetchJobs = async () => {
  const res = await axiosInstance.get("/jobs");
  return res.data;
};

export const addJob = async (data) => {
  const res = await axiosInstance.post("/jobs", data);
  return res.data;
};

export const editJob = async (id, data) => {
  const res = await axiosInstance.put(`/jobs/${id}`, data);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await axiosInstance.delete(`/jobs/${id}`);
  return res.data;
};
