import {
 useParams
} from "react-router-dom";

import {
 useState
} from "react";

import {
 useQuery
} from "@tanstack/react-query";

import {
 getJobById
} from "../../api/jobApi";

import {
 useApplyJob
} from "../../hooks/useApplyJob";

import {
 useSaveJob
} from "../../hooks/useSaveJob";

export default function JobDetailsPage(){

 const { id } =
 useParams();

 const [
  coverLetter,
  setCoverLetter
 ] = useState("");

 const {
  data,
  isLoading,
  isError,
 } = useQuery({

  queryKey:[
   "job",
   id
  ],

  queryFn:() =>
   getJobById(id),
 });

 const {
  mutate:applyMutate,
  isPending:
   applying,
 } = useApplyJob();

 const {
  mutate:saveMutate,
  isPending:
   saving,
 } = useSaveJob();

 if(isLoading){

  return (

   <div
    className="
     max-w-5xl
     mx-auto
     py-10
     px-4
    "
   >

    <h2>
     Loading...
    </h2>

   </div>

  );
 }

 if(isError){

  return (

   <div
    className="
     max-w-5xl
     mx-auto
     py-10
     px-4
    "
   >

    <h2>
     Failed to load job
    </h2>

   </div>

  );
 }

 const job =
 data?.data?.job;

 if(!job){

  return (

   <div
    className="
     max-w-5xl
     mx-auto
     py-10
     px-4
    "
   >

    <h2>
     Job not found
    </h2>

   </div>

  );
 }

 return (

  <div
   className="
    max-w-5xl
    mx-auto
    py-10
    px-4
   "
  >

   <div
    className="
     bg-white
     border
     rounded-xl
     shadow-sm
     p-8
    "
   >

    <div
     className="
      flex
      items-center
      gap-4
      mb-6
     "
    >

     {

      job.company?.logo && (

       <img

        src={
         job.company.logo
        }

        alt="logo"

        className="
         w-16
         h-16
         rounded-full
         object-cover
        "
       />

      )

     }

     <div>

      <h1
       className="
        text-3xl
        font-bold
       "
      >
       {job.title}
      </h1>

      <p
       className="
        text-gray-600
       "
      >
       {job.company?.name}
      </p>

     </div>

    </div>

    <div
     className="
      grid
      md:grid-cols-2
      gap-4
      mb-6
     "
    >

     <p>
      📍 {job.location}
     </p>

     <p>
      💼 {job.jobType}
     </p>

     <p>
      ⭐ {job.experienceLevel}
     </p>

     <p>
      👥 Applications:
      {" "}
      {job.applicationsCount}
     </p>

     <p>
      💰 ₹
      {job.salary?.toLocaleString()}
     </p>

     <p>

      Status:

      {" "}

      <span
       className={
        job.status === "open"
        ? "text-green-600"
        : "text-red-600"
       }
      >

       {job.status}

      </span>

     </p>

    </div>

    <div
     className="
      mb-8
     "
    >

     <h2
      className="
       text-xl
       font-semibold
       mb-2
      "
     >
      Description
     </h2>

     <p
      className="
       text-gray-700
      "
     >
      {job.description}
     </p>

    </div>

    <div
     className="
      mb-8
     "
    >

     <h2
      className="
       text-xl
       font-semibold
       mb-3
      "
     >
      Requirements
     </h2>

     <div
      className="
       flex
       flex-wrap
       gap-2
      "
     >

      {

       job.requirements?.map(
        (req) => (

         <span

          key={req}

          className="
           bg-blue-100
           text-blue-700
           px-3
           py-1
           rounded-full
           text-sm
          "
         >

          {req}

         </span>

        )
       )

      }

     </div>

    </div>

    <div
     className="
      mb-6
     "
    >

     <h2
      className="
       text-xl
       font-semibold
       mb-2
      "
     >
      Cover Letter
     </h2>

     <textarea

      value={
       coverLetter
      }

      onChange={
       (e)=>
       setCoverLetter(
        e.target.value
       )
      }

      rows={6}

      className="
       w-full
       border
       rounded-lg
       p-3
      "

      placeholder=
      "Write your cover letter..."
     />

    </div>

    <div
     className="
      flex
      gap-4
     "
    >

     <button

      disabled={applying}

      onClick={() =>

       applyMutate({

        jobId:id,

        data:{
         coverLetter
        },
       })
      }

      className="
       bg-blue-600
       text-white
       px-6
       py-3
       rounded-lg
       hover:bg-blue-700
       disabled:opacity-50
      "
     >

      {

       applying
       ?
       "Applying..."
       :
       "Apply Now"

      }

     </button>

     <button

      disabled={saving}

      onClick={() =>
       saveMutate(id)
      }

      className="
       bg-gray-800
       text-white
       px-6
       py-3
       rounded-lg
       hover:bg-black
       disabled:opacity-50
      "
     >

      {

       saving
       ?
       "Saving..."
       :
       "Save Job"

      }

     </button>

    </div>

   </div>

  </div>

 );
}