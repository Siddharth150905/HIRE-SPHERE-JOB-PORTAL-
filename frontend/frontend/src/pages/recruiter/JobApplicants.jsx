import {
 useState
}
from "react";

import {
 useParams
}
from "react-router-dom";

import {
 useJobApplicants
}
from "../../hooks/useJobApplicants";

import {
 useUpdateApplicationStatus
}
from "../../hooks/useUpdateApplicationStatus";

import ScheduleInterviewModal
from "../../components/recruiter/ScheduleInterviewModal";

export default function JobApplicants() {

 const { id } =
  useParams();

 const {
  data,
  isLoading,
  isError,
 } = useJobApplicants(id);

 const {
  mutate,
  isPending,
 } =
  useUpdateApplicationStatus();

 const [
  selectedApplication,
  setSelectedApplication
 ] = useState(null);

 const workflow = {

  applied: [
   "under_review",
   "rejected",
  ],

  under_review: [
   "shortlisted",
   "rejected",
  ],

  shortlisted: [
   "rejected",
  ],

  interview_scheduled: [
   "selected",
   "rejected",
  ],

  selected: [],

  rejected: [],
 };

 if (isLoading) {

  return (
   <h2>
    Loading...
   </h2>
  );
 }

 if (isError) {

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

  <div
   className="
    bg-white
    rounded-xl
    shadow
    p-8
   "
  >

   <h1
    className="
     text-3xl
     font-bold
     mb-2
    "
   >
    Job Applicants
   </h1>

   <p
    className="
     text-gray-500
     mb-8
    "
   >
    Total Applicants:
    {" "}
    {applications.length}
   </p>

   {
    applications.length === 0 && (

     <p>
      No applicants found
     </p>

    )
   }

   {
    applications.map(
     (application) => {

      const currentStatus =
       application.status;

      const nextStatuses =
       workflow[currentStatus]
       || [];

      return (

       <div
        key={
         application._id
        }
        className="
         border
         rounded-xl
         p-6
         mb-6
        "
       >

        <div
         className="
          flex
          justify-between
          items-start
         "
        >

         <div>

          <h2
           className="
            text-xl
            font-semibold
           "
          >
           {
            application
            ?.applicant
            ?.name
           }
          </h2>

          <p
           className="
            text-gray-600
           "
          >
           {
            application
            ?.applicant
            ?.email
           }
          </p>

         </div>

         <span
          className="
           px-3
           py-1
           rounded-full
           bg-blue-100
           text-blue-700
           text-sm
          "
         >
          {currentStatus}
         </span>

        </div>

        <div
         className="
          mt-4
         "
        >

         <p>

          <strong>
           Experience:
          </strong>

          {" "}

          {
           application
           ?.applicant
           ?.experience
           || "N/A"
          }

         </p>

        </div>

        <div
         className="
          mt-4
         "
        >

         <h3
          className="
           font-medium
           mb-2
          "
         >
          Skills
         </h3>

         <div
          className="
           flex
           flex-wrap
           gap-2
          "
         >

          {
           application
           ?.applicant
           ?.skills
           ?.length > 0

            ? (

             application
              .applicant
              .skills
              .map(
               (skill) => (

                <span
                 key={skill}
                 className="
                  bg-gray-100
                  px-3
                  py-1
                  rounded-full
                  text-sm
                 "
                >
                 {skill}
                </span>

               )
              )

            )

            : (

             <span>
              No skills added
             </span>

            )
          }

         </div>

        </div>

        {
         application
         ?.coverLetter && (

          <div
           className="
            mt-4
           "
          >

           <h3
            className="
             font-medium
             mb-2
            "
           >
            Cover Letter
           </h3>

           <p
            className="
             text-gray-700
            "
           >
            {
             application
             .coverLetter
            }
           </p>

          </div>

         )
        }

        {
         application
         ?.applicant
         ?.resume && (

          <div
           className="
            mt-4
           "
          >

           <a
            href={
             application
             .applicant
             .resume
            }
            target="_blank"
            rel="noreferrer"
            className="
             text-blue-600
             hover:underline
            "
           >
            View Resume
           </a>

          </div>

         )
        }

        {
         nextStatuses.length > 0 && (

          <div
           className="
            mt-5
           "
          >

           <select

            defaultValue=""

            disabled={
             isPending
            }

            onChange={(e)=>{

             if(
              !e.target.value
             ) return;

             mutate({

              applicationId:
               application._id,

              status:
               e.target.value,
             });

            }}

            className="
             border
             rounded-lg
             p-2
            "
           >

            <option value="">
             Move To...
            </option>

            {
             nextStatuses.map(
              (status) => (

               <option
                key={status}
                value={status}
               >
                {status}
               </option>

              )
             )
            }

           </select>

          </div>

         )
        }

        {
         currentStatus ===
         "shortlisted" && (

          <div
           className="
            mt-4
           "
          >

           <button

            onClick={() => {

             setSelectedApplication(
              application
             );

            }}

            className="
             bg-green-600
             text-white
             px-4
             py-2
             rounded-lg
             hover:bg-green-700
            "
           >

            Schedule Interview

           </button>

          </div>

         )
        }

       </div>

      );
     }
    )
   }

   {
    selectedApplication && (

     <ScheduleInterviewModal

      application={
       selectedApplication
      }

      onClose={() => {

       setSelectedApplication(
        null
       );

      }}

     />

    )
   }

  </div>
 );
}

