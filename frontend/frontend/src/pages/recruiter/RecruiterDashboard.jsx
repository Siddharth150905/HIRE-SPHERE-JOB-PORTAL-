import {
 Link
} from "react-router-dom";

import {
 useRecruiterStats
} from "../../hooks/useRecruiterStats";

import {
 useMyJobs
} from "../../hooks/useMyJobs";

export default function RecruiterDashboard() {

 const {
  data,
  isLoading,
  isError,
 } = useRecruiterStats();

 const {
  data: jobsData,
 } = useMyJobs();

 if (isLoading) {

  return (

   <div className="p-6">
    Loading...
   </div>

  );
 }

 if (isError) {

  return (

   <div className="p-6 text-red-500">
    Failed to load dashboard
   </div>

  );
 }

 const stats =
  data?.data?.stats;

 const jobs =
  jobsData?.data?.jobs || [];

 const recentJobs =
  jobs.slice(0, 5);

 return (

  <div className="space-y-8">

   {/* Header */}

   <div>

    <h1
     className="
      text-3xl
      font-bold
      text-gray-900
     "
    >
     Recruiter Dashboard
    </h1>

    <p
     className="
      text-gray-500
      mt-1
     "
    >
     Manage jobs and applicants
    </p>

   </div>

   {/* Stats */}

   <div
    className="
     grid
     grid-cols-1
     md:grid-cols-2
     xl:grid-cols-4
     gap-6
    "
   >

    <div
     className="
      bg-white
      rounded-xl
      p-6
      shadow
     "
    >
     <p className="text-gray-500">
      Total Jobs
     </p>

     <h2
      className="
       text-3xl
       font-bold
       mt-2
      "
     >
      {stats?.totalJobs}
     </h2>
    </div>

    <div
     className="
      bg-white
      rounded-xl
      p-6
      shadow
     "
    >
     <p className="text-gray-500">
      Open Jobs
     </p>

     <h2
      className="
       text-3xl
       font-bold
       mt-2
       text-green-600
      "
     >
      {stats?.openJobs}
     </h2>
    </div>

    <div
     className="
      bg-white
      rounded-xl
      p-6
      shadow
     "
    >
     <p className="text-gray-500">
      Closed Jobs
     </p>

     <h2
      className="
       text-3xl
       font-bold
       mt-2
       text-red-500
      "
     >
      {stats?.closedJobs}
     </h2>
    </div>

    <div
     className="
      bg-white
      rounded-xl
      p-6
      shadow
     "
    >
     <p className="text-gray-500">
      Applications
     </p>

     <h2
      className="
       text-3xl
       font-bold
       mt-2
       text-blue-600
      "
     >
      {stats?.totalApplications}
     </h2>
    </div>

   </div>

   {/* Quick Actions */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-6
    "
   >

    <h2
     className="
      text-xl
      font-semibold
      mb-4
     "
    >
     Quick Actions
    </h2>

    <div
     className="
      flex
      flex-wrap
      gap-4
     "
    >

     <Link
      to="/recruiter/jobs/create"
      className="
       bg-blue-600
       text-white
       px-5
       py-3
       rounded-lg
       hover:bg-blue-700
      "
     >
      Create Job
     </Link>

     <Link
      to="/recruiter/jobs"
      className="
       bg-gray-100
       px-5
       py-3
       rounded-lg
       hover:bg-gray-200
      "
     >
      Manage Jobs
     </Link>

     <Link
      to="/recruiter/company"
      className="
       bg-gray-100
       px-5
       py-3
       rounded-lg
       hover:bg-gray-200
      "
     >
      Company Profile
     </Link>

    </div>

   </div>

   {/* Recent Jobs */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-6
    "
   >

    <h2
     className="
      text-xl
      font-semibold
      mb-5
     "
    >
     Recent Jobs
    </h2>

    {

     recentJobs.length === 0 ? (

      <p className="text-gray-500">
       No jobs created yet
      </p>

     ) : (

      <div className="space-y-4">

       {

        recentJobs.map(
         (job) => (

          <div
           key={job._id}
           className="
            border
            rounded-lg
            p-4
           "
          >

           <h3
            className="
             font-semibold
             text-lg
            "
           >
            {job.title}
           </h3>

           <p
            className="
             text-gray-500
             text-sm
             mt-1
            "
           >
            {job.location}
           </p>

           <p
            className="
             mt-2
             text-sm
            "
           >
            Status:
            {" "}
            <span
             className={
              job.status === "open"
               ? "text-green-600"
               : "text-red-500"
             }
            >
             {job.status}
            </span>
           </p>

          </div>

         )
        )

       }

      </div>

     )

    }

   </div>

  </div>

 );
}