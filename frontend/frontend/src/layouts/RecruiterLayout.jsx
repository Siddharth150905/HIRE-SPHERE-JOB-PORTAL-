import {
 Outlet,
 NavLink,
} from "react-router-dom";
import NotificationBell from "../components/NotificationBell.jsx";
import { Link } from "react-router-dom";

import {
 useAuth,
} from "../context/AuthContext";

export default function RecruiterLayout() {

 const {
  logout,
 } = useAuth();

 const navClass =
 ({ isActive }) =>

  isActive
   ? `
      bg-blue-100
      text-blue-700
      font-semibold
      px-4
      py-3
      rounded-lg
      block
     `
   : `
      text-gray-700
      hover:bg-gray-100
      px-4
      py-3
      rounded-lg
      block
     `;

 return (

  <div
   className="
    min-h-screen
    bg-slate-100
    flex
   "
  >

   {/* Sidebar */}

   <aside
    className="
     w-72
     bg-white
     border-r
     border-gray-200
     p-6
    "
   >

    <h1
     className="
      text-2xl
      font-bold
      text-blue-600
      mb-8
     "
    >
     Recruiter
    </h1>

    
      <div
 className="
  flex
  items-center
  gap-4
 "
>
<Link to="/recruiter/notifications">
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
      to="/recruiter/dashboard"
      end
      className={navClass}
     >
      Dashboard
     </NavLink>

     <NavLink
      to="/recruiter/profile"
      end
      className={navClass}
     >
      My Profile
     </NavLink>

     <NavLink
      to="/recruiter/company"
      end
      className={navClass}
     >
      Company Profile
     </NavLink>

     <NavLink
      to="/recruiter/jobs"
      end
      className={navClass}
     >
      My Jobs
     </NavLink>

     <NavLink
      to="/recruiter/jobs/create"
      className={navClass}
     >
      Create Job
     </NavLink>

    </nav>

    <button
     onClick={logout}
     className="
      mt-10
      w-full
      bg-red-500
      text-white
      py-3
      rounded-lg
      hover:bg-red-600
     "
    >
     Logout
    </button>

   </aside>

   {/* Main Content */}

   <main
    className="
     flex-1
     p-8
    "
   >
    <Outlet />
   </main>

  </div>
 );
}