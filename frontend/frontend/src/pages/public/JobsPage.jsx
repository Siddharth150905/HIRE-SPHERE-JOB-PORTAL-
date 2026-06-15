import {
 useState
} from "react";

import {
 useJobs
} from "../../hooks/useJobs";

import JobCard
from "../../components/JobCard";

export default function JobsPage() {

 const [page,setPage] =
 useState(1);

 const [search,setSearch] =
 useState("");

 const [
  location,
  setLocation
 ] = useState("");

 const [
  jobType,
  setJobType
 ] = useState("");

 const [
  experienceLevel,
  setExperienceLevel
 ] = useState("");

 const [sort,setSort] =
 useState("");

 const {
  data,
  isLoading,
  isError,
 } = useJobs({

  page,

  keyword:
   search,

  location,

  jobType,

  experienceLevel,

  sort,
 });

 if(isLoading){

  return (

   <div
    className="
     max-w-7xl
     mx-auto
     px-4
     py-10
    "
   >

    <h2>
     Loading Jobs...
    </h2>

   </div>

  );
 }

 if(isError){

  return (

   <div
    className="
     max-w-7xl
     mx-auto
     px-4
     py-10
    "
   >

    <h2>
     Failed to load jobs
    </h2>

   </div>

  );
 }

 const jobs =
 data?.data?.jobs || [];

 const totalPages =
 data?.data?.totalPages || 1;

 const totalJobs =
 data?.data?.totalJobs || 0;

 return (

  <div
   className="
    max-w-7xl
    mx-auto
    px-4
    py-10
   "
  >

   <h1
    className="
     text-4xl
     font-bold
     mb-6
    "
   >
    Find Your Next Job
   </h1>

   <p
    className="
     text-gray-600
     mb-8
    "
   >
    {totalJobs} jobs available
   </p>

   <input
    type="text"
    placeholder="Search jobs..."
    value={search}
    onChange={(e)=>
     setSearch(
      e.target.value
     )
    }
    className="
     w-full
     border
     rounded-lg
     p-3
     mb-6
    "
   />

   <div
    className="
     grid
     md:grid-cols-4
     gap-4
     mb-8
    "
   >

    <select
     value={location}
     onChange={(e)=>
      setLocation(
       e.target.value
      )
     }
     className="
      border
      rounded-lg
      p-3
     "
    >
     <option value="">
      All Locations
     </option>

     <option value="Chennai">
      Chennai
     </option>

     <option value="Bangalore">
      Bangalore
     </option>

     <option value="Hyderabad">
      Hyderabad
     </option>

    </select>

    <select
     value={jobType}
     onChange={(e)=>
      setJobType(
       e.target.value
      )
     }
     className="
      border
      rounded-lg
      p-3
     "
    >
     <option value="">
      All Types
     </option>

     <option value="remote">
      Remote
     </option>

     <option value="hybrid">
      Hybrid
     </option>

     <option value="onsite">
      Onsite
     </option>

    </select>

    <select
     value={experienceLevel}
     onChange={(e)=>
      setExperienceLevel(
       e.target.value
      )
     }
     className="
      border
      rounded-lg
      p-3
     "
    >
     <option value="">
      All Levels
     </option>

     <option value="junior">
      Junior
     </option>

     <option value="mid">
      Mid
     </option>

     <option value="senior">
      Senior
     </option>

    </select>

    <select
     value={sort}
     onChange={(e)=>
      setSort(
       e.target.value
      )
     }
     className="
      border
      rounded-lg
      p-3
     "
    >
     <option value="">
      Newest
     </option>

     <option value="salary">
      Salary Low → High
     </option>

     <option value="-salary">
      Salary High → Low
     </option>

    </select>

   </div>

   {

    jobs.length === 0 && (

     <div
      className="
       text-center
       py-16
      "
     >

      <h2
       className="
        text-2xl
        font-semibold
       "
      >
       No Jobs Found
      </h2>

     </div>

    )

   }

   {

    jobs.length > 0 && (

     <div
      className="
       grid
       md:grid-cols-2
       lg:grid-cols-3
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

   <div
    className="
     flex
     justify-center
     items-center
     gap-4
     mt-10
    "
   >

    <button

     disabled={
      page === 1
     }

     onClick={() =>
      setPage(
       prev =>
       prev - 1
      )
     }

     className="
      px-4
      py-2
      bg-gray-200
      rounded
     "
    >

     Previous

    </button>

    <span>

     Page {page}

    </span>

    <button

     disabled={
      page ===
      totalPages
     }

     onClick={() =>
      setPage(
       prev =>
       prev + 1
      )
     }

     className="
      px-4
      py-2
      bg-gray-200
      rounded
     "
    >

     Next

    </button>

   </div>

  </div>

 );
}