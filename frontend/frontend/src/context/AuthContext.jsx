import {
 createContext,
 useContext,
 useState,
} from "react";

import { logoutUser } from "@/api/authApi";
const AuthContext =
 createContext();

export const AuthProvider =
({ children }) => {

 const [user,setUser] =
   useState(() => {

    const storedUser =
      localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

 const [accessToken,
   setAccessToken] =
   useState(
    localStorage.getItem(
      "accessToken"
    ) || null
   );

 const login = (
   userData,
   token
 ) => {

   setUser(userData);

   setAccessToken(token);

   localStorage.setItem(
     "accessToken",
     token
   );

   localStorage.setItem(
    "user",JSON.stringify(userData)
   )
 };

const logout = async () => {

 try {

  await logoutUser();

 } catch (error) {

  console.log(
   "Logout API failed",
   error
  );

 } finally {

  setUser(null);

  setAccessToken(null);

  localStorage.removeItem(
   "user"
  );

  localStorage.removeItem(
   "accessToken"
  );
 }
};

 return (

  <AuthContext.Provider
   value={{

    user,
    accessToken,

    login,
    logout,

    setUser,
    setAccessToken,
   }}
  >

   {children}

  </AuthContext.Provider>
 );
};

export const useAuth =
() => useContext(AuthContext);