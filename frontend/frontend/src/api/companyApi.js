import axiosInstance
from "./axios";

export const createCompany =
(formData) => {

 return axiosInstance.post(

  "/company",

  formData,

  {
   headers:{
    "Content-Type":
     "multipart/form-data",
   },
  }
 );
};

export const getCompany =
(id) => {

 return axiosInstance.get(
  `/company/${id}`
 );
};

export const updateCompany =
(id,formData) => {

 return axiosInstance.put(

  `/company/${id}`,

  formData,

  {
   headers:{
    "Content-Type":
     "multipart/form-data",
   },
  }
 );
};