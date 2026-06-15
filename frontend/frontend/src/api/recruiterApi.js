import axiosInstance from "./axios";

export const getRecruiterStats = () => {

 return axiosInstance.get(
  "/applications/recruiter/stats"
 );
};