import axiosInstance
from "./axios";

export const createJob =
(data) => {

 return axiosInstance.post(
  "/jobs",
  data
 );
};

export const getMyJobs =
() => {

 return axiosInstance.get(
  "/jobs/my-jobs"
 );
};

export const getJobById =
(id) => {

 return axiosInstance.get(
  `/jobs/${id}`
 );
};

export const updateJob =
(id,data) => {

 return axiosInstance.put(
  `/jobs/${id}`,
  data
 );
};

export const deleteJob =
(id) => {

 return axiosInstance.delete(
  `/jobs/${id}`
 );
};

export const updateJobStatus =
(id,status) => {

 return axiosInstance.patch(
  `/jobs/${id}/status`,
  { status }
 );
};


export const getJobs =
(params = {}) => {

 return axiosInstance.get(
  "/jobs",
  {
   params
  }
 );
};