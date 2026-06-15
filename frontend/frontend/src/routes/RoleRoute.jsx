import {
 Navigate,
 Outlet,
} from "react-router-dom";

export default function
RoleRoute({

 allowedRoles,

}) {

 const user =
 JSON.parse(
  localStorage.getItem(
   "user"
  )
 );

 if(

  !user ||

  !allowedRoles.includes(
    user.role
  )

 ){

  return (
   <Navigate
    to="/"
    replace
   />
  );
 }

 return <Outlet />;
}