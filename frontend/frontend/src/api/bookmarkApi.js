import axiosInstance
from "./axios";

export const getSavedJobs =
() => {

 return axiosInstance.get(
  "/applications/saved"
 );
};