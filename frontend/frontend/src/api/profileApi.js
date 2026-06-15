import axiosInstance
from "./axios";

export const getProfile =
() => {

 return axiosInstance.get(
  "/profile/me"
 );
};


export const updateApplicantProfile =
(formData) => {

 return axiosInstance.put(
  "/profile/applicant",
  formData,
  {
   headers:{
    "Content-Type":
     "multipart/form-data",
   },
  }
 );
};