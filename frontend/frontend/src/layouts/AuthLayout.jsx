import {
 Outlet
} from "react-router-dom";

export default function AuthLayout() {

 return (

  <div
   className="
    min-h-screen
    bg-slate-100
    flex
    items-center
    justify-center
    px-4
   "
  >

   <div
    className="
     w-full
     max-w-5xl
     bg-white
     rounded-2xl
     shadow-lg
     overflow-hidden
     grid
     md:grid-cols-2
    "
   >

    <div
     className="
      hidden
      md:flex
      bg-blue-600
      text-white
      p-10
      flex-col
      justify-center
     "
    >

     <h1
      className="
       text-4xl
       font-bold
       mb-4
      "
     >
      Job Portal
     </h1>

     <p
      className="
       text-lg
      "
     >
      Find opportunities,
      manage applications,
      and grow your career.
     </p>

    </div>

    <div
     className="
      p-8
      md:p-12
     "
    >

     <Outlet />

    </div>

   </div>

  </div>
 );
}