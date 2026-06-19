import axiosInstance
from "./axios";

export const analyzeATS =
(
 jobId,
 file
)=>{

 const formData =
  new FormData();

 formData.append(
  "resume",
  file
 );

 return axiosInstance.post(

  `/ai/ats/${jobId}`,

  formData,

  {
   headers:{
    "Content-Type":
     "multipart/form-data"
   }
  }
 );
};