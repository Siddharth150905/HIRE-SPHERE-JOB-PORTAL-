import {
 Outlet,
 NavLink,
} from "react-router-dom";
import NotificationBell from "@/components/NotificationBell";

import {
 useAuth,
} from "../context/AuthContext";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function ApplicantLayout() {

 const {
  logout,
 } = useAuth();

 const navClass =
 ({ isActive }) =>

  `
   block
   px-4
   py-3
   rounded-lg
   transition
   ${
    isActive
     ? "bg-blue-600 text-white"
     : "text-gray-700 hover:bg-slate-100"
   }
  `;

 return (

  <div
   className="
    min-h-screen
    bg-slate-100
   "
  >

   <Navbar />

   <div
    className="
     max-w-7xl
     mx-auto
     p-6
     grid
     md:grid-cols-[260px_1fr]
     gap-6
    "
   >

    {/* SIDEBAR */}

    <aside
     className="
      bg-white
      rounded-xl
      shadow
      p-4
      h-fit
     "
    >

     <h2
      className="
       text-xl
       font-bold
       mb-6
      "
     >
      Applicant Panel
     </h2>

     
      <div
 className="
  flex
  items-center
  gap-4
 "
>
<Link to="/applicant/notifications">
 <NotificationBell />
</Link>

</div>

     <nav
      className="
       flex
       flex-col
       gap-2
      "
     >



      <NavLink
       to="/applicant/dashboard"
       className={navClass}
      >
       Dashboard
      </NavLink>

      <NavLink
       to="/applicant/profile"
       className={navClass}
      >
       Profile
      </NavLink>

      <NavLink
       to="/applicant/applications"
       className={navClass}
      >
       Applications
      </NavLink>

      <NavLink
       to="/applicant/saved-jobs"
       className={navClass}
      >
       Saved Jobs
      </NavLink>

      <NavLink
       to="/jobs"
       className={navClass}
      >
       Browse Jobs
      </NavLink>

      <button
       onClick={logout}
       className="
        mt-4
        bg-red-500
        text-white
        py-3
        rounded-lg
        hover:bg-red-600
       "
      >
       Logout
      </button>

     </nav>

    </aside>

    {/* PAGE CONTENT */}

    <main>

     <Outlet />

    </main>

   </div>

  </div>
 );
}