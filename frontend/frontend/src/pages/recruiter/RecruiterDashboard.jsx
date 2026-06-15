import {
 Outlet,
 NavLink,
} from "react-router-dom";

export default function RecruiterLayout() {

 return (

  <div
   className="
    min-h-screen
    bg-slate-100
   "
  >

   <div
    className="
     max-w-7xl
     mx-auto
     px-4
     py-6
     grid
     md:grid-cols-[260px_1fr]
     gap-6
    "
   >

    {/* Sidebar */}

    <aside
     className="
      bg-white
      rounded-xl
      shadow-sm
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
      Recruiter Panel
     </h2>

     <nav
      className="
       flex
       flex-col
       gap-2
      "
     >

      <NavLink
       to="/recruiter/dashboard"
       className={({isActive}) =>
        `
        p-3
        rounded-lg
        ${
         isActive
         ? "bg-blue-600 text-white"
         : "hover:bg-slate-100"
        }
        `
       }
      >
       Dashboard
      </NavLink>

      <NavLink
       to="/recruiter/company"
       className={({isActive}) =>
        `
        p-3
        rounded-lg
        ${
         isActive
         ? "bg-blue-600 text-white"
         : "hover:bg-slate-100"
        }
        `
       }
      >
       Company Profile
      </NavLink>

      <NavLink
       to="/recruiter/jobs"
       className={({isActive}) =>
        `
        p-3
        rounded-lg
        ${
         isActive
         ? "bg-blue-600 text-white"
         : "hover:bg-slate-100"
        }
        `
       }
      >
       My Jobs
      </NavLink>

      <NavLink
       to="/recruiter/jobs/create"
       className={({isActive}) =>
        `
        p-3
        rounded-lg
        ${
         isActive
         ? "bg-blue-600 text-white"
         : "hover:bg-slate-100"
        }
        `
       }
      >
       Create Job
      </NavLink>

      <NavLink
       to="/recruiter/analytics"
       className={({isActive}) =>
        `
        p-3
        rounded-lg
        ${
         isActive
         ? "bg-blue-600 text-white"
         : "hover:bg-slate-100"
        }
        `
       }
      >
       Analytics
      </NavLink>

     </nav>

    </aside>

    {/* Content */}

    <main>

     <Outlet />

    </main>

   </div>

  </div>
 );
}