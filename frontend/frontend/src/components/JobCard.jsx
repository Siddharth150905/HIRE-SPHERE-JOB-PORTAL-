import {
 Link
} from "react-router-dom";

export default function JobCard({
 job,
}) {

 return (

  <div
   className="
    bg-white
    border
    rounded-xl
    p-6
    shadow-sm
    hover:shadow-lg
    transition
   "
  >

   <div
    className="
     flex
     items-center
     gap-3
     mb-4
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
        w-12
        h-12
        rounded-full
        object-cover
       "
      />

     )

    }

    <div>

     <h3
      className="
       font-bold
       text-lg
      "
     >
      {job.title}
     </h3>

     <p
      className="
       text-gray-600
      "
     >
      {
       job.company?.name
      }
     </p>

    </div>

   </div>

   <p
    className="
     text-gray-500
     mb-2
    "
   >
    📍 {job.location}
   </p>

   <p
    className="
     text-gray-500
     mb-2
    "
   >
    💼 {job.jobType}
   </p>

   <p
    className="
     text-gray-500
     mb-4
    "
   >
    ⭐ {job.experienceLevel}
   </p>

   <p
    className="
     font-semibold
     mb-4
    "
   >
    ₹{
     job.salary?.toLocaleString()
    }
   </p>

   <Link

    to={
     `/jobs/${job._id}`
    }

    className="
     inline-block
     bg-blue-600
     text-white
     px-4
     py-2
     rounded-lg
     hover:bg-blue-700
    "
   >

    View Details

   </Link>

  </div>

 );
}