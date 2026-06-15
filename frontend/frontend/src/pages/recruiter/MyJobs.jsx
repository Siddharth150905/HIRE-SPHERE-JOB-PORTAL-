import {
 useMyJobs
} from "../../hooks/useMyJobs";

import {
 Link
} from "react-router-dom";

export default function MyJobs() {

 const {
  data,
  isLoading,
  isError,
 } = useMyJobs();

 if (isLoading) {

  return (
   <div className="text-center py-10">
    Loading jobs...
   </div>
  );
 }

 if (isError) {

  return (
   <div className="text-center py-10 text-red-500">
    Failed to load jobs
   </div>
  );
 }

 const jobs =
  data?.data?.jobs || [];

 return (

  <div className="space-y-6">

   <div
    className="
     flex
     justify-between
     items-center
    "
   >

    <h1
     className="
      text-3xl
      font-bold
     "
    >
     My Jobs
    </h1>

    <Link
     to="/recruiter/jobs/create"
     className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-blue-700
     "
    >
     Create Job
    </Link>

   </div>

   {jobs.length === 0 && (

    <div
     className="
      bg-white
      rounded-xl
      shadow
      p-10
      text-center
     "
    >
     <h2
      className="
       text-xl
       font-semibold
       mb-2
      "
     >
      No Jobs Posted Yet
     </h2>

     <p
      className="
       text-gray-500
       mb-4
      "
     >
      Create your first job posting.
     </p>

     <Link
      to="/recruiter/jobs/create"
      className="
       bg-blue-600
       text-white
       px-4
       py-2
       rounded-lg
      "
     >
      Create Job
     </Link>

    </div>
   )}

   {jobs.map((job) => (

    <div
     key={job._id}
     className="
      bg-white
      rounded-xl
      shadow
      p-6
     "
    >

     <div
      className="
       flex
       justify-between
       items-start
      "
     >

      <div
       className="
        flex
        gap-4
       "
      >

       <img
        src={job.company?.logo}
        alt={job.company?.name}
        className="
         w-14
         h-14
         rounded-lg
         object-cover
        "
       />

       <div>

        <h2
         className="
          text-xl
          font-bold
         "
        >
         {job.title}
        </h2>

        <p
         className="
          text-gray-600
         "
        >
         {job.company?.name}
        </p>

       </div>

      </div>

      <span
       className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${
         job.status === "open"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
        }
       `}
      >
       {job.status}
      </span>

     </div>

     <div
      className="
       mt-4
       grid
       md:grid-cols-4
       gap-4
       text-sm
       text-gray-600
      "
     >

      <div>
       📍 {job.location}
      </div>

      <div>
       💼 {job.jobType}
      </div>

      <div>
       🚀 {job.experienceLevel}
      </div>

      <div>
       👥 {job.applicationsCount} Applicants
      </div>

     </div>

     <div
      className="
       mt-3
       text-sm
       text-gray-500
      "
     >
      Salary:
      {" "}
      ₹
      {job.salary?.toLocaleString()}
     </div>

     <div
      className="
       mt-2
       text-sm
       text-gray-500
      "
     >
      Posted:
      {" "}
      {new Date(
       job.createdAt
      ).toLocaleDateString()}
     </div>

     <div
      className="
       flex
       flex-wrap
       gap-3
       mt-6
      "
     >

      <Link
       to={`/jobs/${job._id}`}
       className="
        bg-gray-100
        px-4
        py-2
        rounded-lg
       "
      >
       View
      </Link>

      <Link
       to={`/recruiter/jobs/edit/${job._id}`}
       className="
        bg-yellow-100
        text-yellow-700
        px-4
        py-2
        rounded-lg
       "
      >
       Edit
      </Link>

      <Link
       to={`/recruiter/jobs/${job._id}/applicants`}
       className="
        bg-blue-100
        text-blue-700
        px-4
        py-2
        rounded-lg
       "
      >
       Applicants
      </Link>

      <Link
       to={`/recruiter/jobs/${job._id}/analytics`}
       className="
        bg-purple-100
        text-purple-700
        px-4
        py-2
        rounded-lg
       "
      >
       Analytics
      </Link>

     </div>

    </div>

   ))}

  </div>
 );
}