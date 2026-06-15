import {
 useMyJobs
}
from "../../hooks/useMyJobs";

import {
 Link
}
from "react-router-dom";

export default function
MyJobs(){

 const {
  data,
  isLoading,
  isError,
 } =
 useMyJobs();

 if(isLoading){

  return (
   <h2>
    Loading...
   </h2>
  );
 }

 if(isError){

  return (
   <h2>
    Failed to load jobs
   </h2>
  );
 }

 const jobs =
  data?.data?.jobs || [];

 return (

  <div>

   <h1>
    My Jobs
   </h1>

   <Link
    to="/recruiter/jobs/create"
   >
    Create Job
   </Link>

   <hr />

   {
    jobs.length === 0 && (

     <p>
      No jobs found
     </p>

    )
   }

   {
    jobs.map((job) => (

     <div
      key={job._id}
     >

      <h3>
       {job.title}
      </h3>

      <p>
       {job.location}
      </p>

      <p>
       Status:
       {" "}
       {job.status}
      </p>

      <p>
       Applications:
       {" "}
       {job.applicationsCount}
      </p>

      <Link
       to={
        `/jobs/${job._id}`
       }
      >
       View
      </Link>

      {" | "}

      <Link
       to={
        `/recruiter/jobs/edit/${job._id}`
       }
      >
       Edit
      </Link>

      {" | "}

      <Link
       to={
        `/recruiter/jobs/${job._id}/applicants`
       }
      >
       Applicants
      </Link>

      {" | "}

      <Link
       to={
        `/recruiter/jobs/${job._id}/analytics`
       }
      >
       Analytics
      </Link>

      <hr />

     </div>
    ))
   }

  </div>
 );
}