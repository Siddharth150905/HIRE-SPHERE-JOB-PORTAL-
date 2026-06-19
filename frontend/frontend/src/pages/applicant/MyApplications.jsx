
import {
 useApplications
} from "../../hooks/useApplications";

import {
 useWithdrawApplication
} from "../../hooks/useWithdrawApplication";

export default function MyApplications() {

 const {
  data,
  isLoading,
  isError,
 } = useApplications();

 const {
  mutate,
  isPending,
 } = useWithdrawApplication();

 if (isLoading) {

  return (

   <div className="p-8">

    <h2 className="text-xl font-semibold">
     Loading Applications...
    </h2>

   </div>
  );
 }

 if (isError) {

  return (

   <div className="p-8">

    <h2 className="text-xl text-red-600">
     Failed to load applications
    </h2>

   </div>
  );
 }

 const applications =
  data?.data?.applications || [];

 const getStatusColor = (status) => {

  switch (status) {

   case "applied":
    return "bg-blue-100 text-blue-700";

   case "under_review":
    return "bg-yellow-100 text-yellow-700";

   case "shortlisted":
    return "bg-green-100 text-green-700";

   case "interview_scheduled":
    return "bg-purple-100 text-purple-700";

   case "selected":
    return "bg-emerald-100 text-emerald-700";

   case "rejected":
    return "bg-red-100 text-red-700";

   default:
    return "bg-gray-100 text-gray-700";
  }
 };

 return (

  <div className="max-w-7xl mx-auto p-6">

   <div className="mb-8">

    <h1 className="text-3xl font-bold text-gray-900">
     My Applications
    </h1>

    <p className="text-gray-600 mt-2">
     Track all jobs you have applied for
    </p>

   </div>

   {

    applications.length === 0 && (

     <div
      className="
       bg-white
       rounded-2xl
       shadow-sm
       border
       border-gray-200
       p-10
       text-center
      "
     >

      <h2 className="text-xl font-semibold mb-2">
       No Applications Yet
      </h2>

      <p className="text-gray-500">
       Start applying for jobs to see them here.
      </p>

     </div>

    )
   }

   <div className="space-y-5">

    {

     applications.map((application) => (

      <div

       key={application._id}

       className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        p-6
        hover:shadow-md
        transition
       "
      >

       <div
        className="
         flex
         flex-col
         md:flex-row
         md:items-center
         md:justify-between
         gap-6
        "
       >

        <div
         className="
          flex
          items-start
          gap-4
         "
        >

         <img
          src={
           application.job?.company?.logo
          }
          alt="company"
          className="
           w-16
           h-16
           rounded-xl
           object-cover
           border
          "
         />

         <div>

          <h2
           className="
            text-xl
            font-bold
            text-gray-900
           "
          >
           {application.job?.title}
          </h2>

          <p className="text-gray-600">
           {application.job?.company?.name}
          </p>

          <div
           className="
            flex
            flex-wrap
            gap-3
            mt-3
            text-sm
            text-gray-500
           "
          >

           <span>
            📍 {application.job?.location}
           </span>

           <span>
            💼 {application.job?.jobType}
           </span>

           <span>
            ₹
            {application.job?.salary?.toLocaleString()}
           </span>

          </div>

          <p
           className="
            mt-3
            text-sm
            text-gray-500
           "
          >
           Applied on{" "}
           {
            new Date(
             application.createdAt
            ).toLocaleDateString()
           }
          </p>

          {
           application.status ===
           "interview_scheduled" && (

            <div
             className="
              mt-5
              bg-purple-50
              border
              border-purple-200
              rounded-xl
              p-4
             "
            >

             <h3
              className="
               font-semibold
               text-purple-700
               mb-3
              "
             >
              Interview Scheduled
             </h3>

             <div
              className="
               space-y-2
               text-sm
              "
             >

              <p>

               <strong>
                Date:
               </strong>

               {" "}

               {
                application.interviewDate
                 ? new Date(
                    application.interviewDate
                   ).toLocaleString()
                 : "Not Available"
               }

              </p>

              <p>

               <strong>
                Meeting Link:
               </strong>

               {" "}

               {
                application.interviewLink
                 ? (

                  <a

                   href={
                    application.interviewLink
                   }

                   target="_blank"

                   rel="noreferrer"

                   className="
                    text-blue-600
                    hover:underline
                   "
                  >

                   Join Interview

                  </a>

                 )
                 : "Not Available"
               }

              </p>

              {
               application.interviewNotes && (

                <p>

                 <strong>
                  Notes:
                 </strong>

                 {" "}

                 {
                  application.interviewNotes
                 }

                </p>

               )
              }

             </div>

            </div>

           )
          }

         </div>

        </div>

        <div
         className="
          flex
          flex-col
          items-start
          md:items-end
          gap-3
         "
        >

         <span
          className={`
           px-4
           py-2
           rounded-full
           text-sm
           font-medium
           ${getStatusColor(
            application.status
           )}
          `}
         >

          {
           application.status
            .replaceAll("_", " ")
          }

         </span>

         {

          application.status ===
          "applied" && (

           <button

            disabled={isPending}

            onClick={() => {

             const confirmWithdraw =
              window.confirm(
               "Withdraw this application?"
              );

             if (
              confirmWithdraw
             ) {

              mutate(
               application._id
              );
             }
            }}

            className="
             bg-red-500
             hover:bg-red-600
             text-white
             px-5
             py-2
             rounded-lg
             font-medium
             transition
            "
           >

            {
             isPending
              ? "Withdrawing..."
              : "Withdraw"
            }

           </button>

          )
         }

        </div>

       </div>

      </div>

     ))
    }

   </div>

  </div>
 );
}

