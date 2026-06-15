import {
 useParams
} from "react-router-dom";

import {
 useJobApplicants
}
from "../../hooks/useJobApplicants";

import {
 useUpdateApplicationStatus
}
from "../../hooks/useUpdateApplicationStatus";

export default function
JobApplicants(){

 const {
  jobId
 } = useParams();

 const {
  data,
  isLoading,
  isError,
 } =
 useJobApplicants(jobId);

 const updateStatus =
 useUpdateApplicationStatus();

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
    Failed to load applicants
   </h2>
  );
 }

 const applications =
 data?.data?.applications
 || [];

 return (

  <div>

   <h1>
    Applicants
   </h1>

   {

    applications.length === 0 && (

     <p>
      No applicants yet
     </p>
    )
   }

   {

    applications.map(
     (application) => (

      <div
       key={
        application._id
       }
      >

       <h3>
        Applicant:
        {
          application.applicant.name
        }
       </h3>

       <p>

        Email:

        {" "}

        {
         application
         ?.applicant
         ?.email
        }

       </p>

       <p>

        Experience:

        {" "}

        {
         application
         ?.applicant
         ?.experience
        }

       </p>

       <p>

        Skills:

        {" "}

        {
         application
         ?.applicant
         ?.skills?.join(
          ", "
         )
        }

       </p>

       <p>

        Status:

        {" "}

        {
         application.status
        }

       </p>

       <p>

        Cover Letter:

        {" "}

        {
         application
         ?.coverLetter
        }

       </p>

       <a
        href={
         application
         ?.resumeSnapshot
        }
        target="_blank"
        rel="noreferrer"
       >
        View Resume
       </a>

       <br />
       <br />

       <select

        value={
         application.status
        }

        onChange={(e)=>

         updateStatus.mutate({

          applicationId:
           application._id,

          status:
           e.target.value,
         })
        }
       >

        <option value="applied">
         Applied
        </option>

        <option value="under_review">
         Under Review
        </option>

        <option value="shortlisted">
         Shortlisted
        </option>

        <option value="interview_scheduled">
         Interview Scheduled
        </option>

        <option value="selected">
         Selected
        </option>

        <option value="rejected">
         Rejected
        </option>

       </select>

       <hr />

      </div>
     )
    )
   }

  </div>
 );
}