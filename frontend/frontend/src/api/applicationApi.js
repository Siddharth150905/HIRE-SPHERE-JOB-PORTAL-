import axiosInstance
from "./axios";

export const getMyApplications =
() => {

 return axiosInstance.get(
  "/applications/my-applications"
 );
};


export const
getJobApplicants =
(jobId) => {

 return axiosInstance.get(
  `/applications/job/${jobId}`
 );
};


export const updateApplicationStatus =
 (
  applicationId,
  status
 ) => {

 return axiosInstance.patch(
  `/applications/${applicationId}/status`,
  { status }
 );
}; 


export const applyToJob =
(jobId,data) => {

 return axiosInstance.post(
  `/applications/${jobId}`,
  data
 );
};


export const saveJob =
(jobId) => {

 return axiosInstance.post(
  `/applications/${jobId}/save`
 );
};


export const unsaveJob =
(jobId) => {

 return axiosInstance.delete(
  `/applications/${jobId}/save`
 );
};


export const
withdrawApplication =
(id) => {

 return axiosInstance.delete(
  `/applications/${id}`
 );
};




export const getJobAnalytics =
(id) => {

 return axiosInstance.get(
  `/applications/${id}/analytics`
 );
};