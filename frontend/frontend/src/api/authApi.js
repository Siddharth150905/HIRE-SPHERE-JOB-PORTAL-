import axiosInstance
from "./axios";

export const loginUser =
(data) =>
 axiosInstance.post(
   "/auth/login",
   data
 );

export const registerUser =
(data) =>
 axiosInstance.post(
   "/auth/register",
   data
 );

export const logoutUser =
() =>
 axiosInstance.post(
   "/auth/logout"
 );

export const getProfile =
() =>
 axiosInstance.get(
   "/profile/me"
 );


 export const forgotPassword =
(data) => {

 return axiosInstance.post(
  "/auth/forgot-password",
  data
 );
};


export const resetPassword =
(token,data) => {

 return axiosInstance.put(
  `/auth/reset-password/${token}`,
  data
 );
};  


export const verifyEmail =
(token) => {

 return axiosInstance.get(
  `/auth/verify-email/${token}`
 );
};