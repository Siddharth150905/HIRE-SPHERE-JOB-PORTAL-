import axios from "axios";
import { refreshToken } from "./refreshApi";

const axiosInstance =
 axios.create({

  baseURL:
   import.meta.env.VITE_API_URL,

  withCredentials:true,
});

axiosInstance.interceptors.request.use(

(config)=>{

 const token =
 localStorage.getItem(
  "accessToken"
 );

 if(token){

  config.headers.Authorization =
   `Bearer ${token}`;
 }

 return config;
});



axiosInstance.interceptors.response.use(

 (response)=>response,

 async (error)=>{

  const originalRequest =
   error.config;

  if(

   error.response?.status === 401

   &&

   !originalRequest._retry

  ){

   originalRequest._retry =
    true;

   try{

    const response =
      await refreshToken();

    const newToken =
      response.data.accessToken;

    localStorage.setItem(
      "accessToken",
      newToken
    );

    originalRequest.headers.Authorization =
      `Bearer ${newToken}`;

    return axiosInstance(
      originalRequest
    );

   }catch(err){

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";

    return Promise.reject(
      err
    );
   }
  }

  return Promise.reject(
    error
  );
 }
);

export default axiosInstance;