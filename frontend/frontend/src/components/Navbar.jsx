import {
 Link
} from "react-router-dom";

import NotificationBell
from "../components/NotificationBell";

import {
 useAuth
} from "../context/AuthContext";

export default function Navbar() {

 const {
  user,
  logout,
 } = useAuth();

 return (

  <nav
   className="
    bg-white
    shadow-md
   "
  >

   <div
    className="
     max-w-7xl
     mx-auto
     px-6
     py-4
     flex
     justify-between
     items-center
    "
   >

    <Link
     to="/"
     className="
      text-2xl
      font-bold
      text-blue-600
     "
    >
     HIRE SPHERE
    </Link>


    


    <div
     className="
      flex
      items-center
      gap-4
     "
    >

     <Link
      to="/jobs"
      className="
       text-gray-700
       hover:text-blue-600
      "
     >
      Jobs
     </Link>

     {!user ? (

      <>

       <Link
        to="/login"
        className="
         text-gray-700
        "
       >
        Login
       </Link>

       <Link
        to="/register"
        className="
         bg-blue-600
         text-white
         px-4
         py-2
         rounded-lg
         hover:bg-blue-700
        "
       >
        Register
       </Link>

      </>

     ) : (

      <>

       <Link
        to={
         user.role ===
         "recruiter"
          ? "/recruiter/dashboard"
          : "/applicant/dashboard"
        }
        className="
         text-gray-700
        "
       >
        Dashboard
       </Link>

       <button
        onClick={logout}
        className="
         bg-red-500
         text-white
         px-4
         py-2
         rounded-lg
        "
       >
        Logout
       </button>

      </>

     )}

    </div>

   </div>

  </nav>
 );
}