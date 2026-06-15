import axios from "axios";

export const refreshToken =
() => {

 return axios.post(

  `${import.meta.env.VITE_API_URL}/auth/refresh-token`,

  {},

  {
   withCredentials:true,
  }
 );
};