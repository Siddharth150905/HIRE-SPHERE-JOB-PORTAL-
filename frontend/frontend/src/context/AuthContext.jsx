import {
 createContext,
 useContext,
 useState,
} from "react";

import { useEffect } from "react";

import toast
from "react-hot-toast";

import {
 socket
}
from "../socket/socket";

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

   useEffect(() => {

 if(user){

 if(!user) return;

 if(!socket.connected){

  socket.connect();
 }
  socket.emit(
   "register",
   user._id
  );

  socket.on(
   "new_application",
   (data) => {

  toast.success(
 `New application for ${data.jobTitle}`
);

console.log("Job applied");
   }
  );

  socket.on(
 "application_status_updated",
 (data) => {
  console.log("status updated");

toast.success(
 `Application moved to ${data.status}`
);

 }
);

 }

 return () => {

  socket.off(
   "new_application"
  );

  socket.off(
 "application_status_updated"
);

 };

}, [user]);

 const login = (
   userData,
   token
 ) => {

    if(
   !socket.connected
  ){

   socket.connect();

  }

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

    socket.disconnect();
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