import {
 Link
} from "react-router-dom";

import {
 useAuth
} from "../../context/AuthContext";

import {
 useJobs
} from "../../hooks/useJobs";

import JobCard
from "../../components/JobCard";

export default function
HomePage() {

 const {
  user
 } = useAuth();

 const {
  data,
  isLoading,
 } = useJobs({
  limit: 6,
 });

 const jobs =
  data?.data?.jobs || [];

 return (

  <div>

   {/* HERO */}

   <section
    className="
     bg-gradient-to-r
     from-blue-600
     to-indigo-700
     text-white
     py-24
    "
   >

    <div
     className="
      max-w-7xl
      mx-auto
      px-6
     "
    >

     <h1
      className="
       text-5xl
       font-bold
       mb-6
      "
     >
      Find Your Dream Job
     </h1>

     <p
      className="
       text-xl
       mb-8
       max-w-2xl
      "
     >
      Discover opportunities from
      top companies and build
      your future.
     </p>

     {

      user && (

       <p
        className="
         mb-6
         text-lg
        "
       >
        Welcome back,
        {" "}
        {user.name}
        👋
       </p>

      )

     }

     <div
      className="
       flex
       gap-4
      "
     >

      <Link
       to="/jobs"
       className="
        bg-white
        text-blue-700
        px-6
        py-3
        rounded-lg
        font-semibold
       "
      >
       Browse Jobs
      </Link>

      {

       !user && (

        <Link
         to="/register"
         className="
          border
          border-white
          px-6
          py-3
          rounded-lg
          font-semibold
         "
        >
         Create Account
        </Link>

       )

      }

     </div>

    </div>

   </section>

   {/* STATS */}

   <section
    className="
     max-w-7xl
     mx-auto
     px-6
     py-16
    "
   >

    <div
     className="
      grid
      md:grid-cols-3
      gap-6
     "
    >

     <div
      className="
       bg-white
       p-8
       rounded-xl
       shadow
      "
     >
      <h2
       className="
        text-3xl
        font-bold
       "
      >
       1000+
      </h2>

      <p>
       Open Jobs
      </p>
     </div>

     <div
      className="
       bg-white
       p-8
       rounded-xl
       shadow
      "
     >
      <h2
       className="
        text-3xl
        font-bold
       "
      >
       500+
      </h2>

      <p>
       Companies
      </p>
     </div>

     <div
      className="
       bg-white
       p-8
       rounded-xl
       shadow
      "
     >
      <h2
       className="
        text-3xl
        font-bold
       "
      >
       10000+
      </h2>

      <p>
       Applicants
      </p>
     </div>

    </div>

   </section>

   {/* FEATURED JOBS */}

   <section
    className="
     max-w-7xl
     mx-auto
     px-6
     py-12
    "
   >

    <h2
     className="
      text-3xl
      font-bold
      mb-8
     "
    >
     Featured Jobs
    </h2>

    {

     isLoading
     ? (

      <p>
       Loading jobs...
      </p>

     )
     : (

      <div
       className="
        grid
        md:grid-cols-3
        gap-6
       "
      >

       {

        jobs.map(
         (job) => (

          <JobCard
           key={job._id}
           job={job}
          />

         )
        )

       }

      </div>

     )

    }

   </section>

   {/* WHY US */}

   <section
    className="
     bg-gray-100
     py-20
    "
   >

    <div
     className="
      max-w-7xl
      mx-auto
      px-6
      grid
      md:grid-cols-3
      gap-8
     "
    >

     <div>

      <h3
       className="
        text-xl
        font-bold
        mb-3
       "
      >
       Verified Companies
      </h3>

      <p>
       Work with trusted
       recruiters.
      </p>

     </div>

     <div>

      <h3
       className="
        text-xl
        font-bold
        mb-3
       "
      >
       Easy Applications
      </h3>

      <p>
       Apply in just a few clicks.
      </p>

     </div>

     <div>

      <h3
       className="
        text-xl
        font-bold
        mb-3
       "
      >
       Career Growth
      </h3>

      <p>
       Find jobs matching
       your skills.
      </p>

     </div>

    </div>

   </section>

  </div>

 );
}