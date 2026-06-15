import {
 useParams
} from "react-router-dom";

import {
 useJobAnalytics
} from "../../hooks/useJobAnalytics";

export default function JobAnalytics() {

 const { id } =
  useParams();

 const {
  data,
  isLoading,
  isError,
 } =
 useJobAnalytics(id);

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
    Failed to load analytics
   </h2>
  );
 }

 const analytics =
  data?.data?.analytics;

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
     mb-8
    "
   >
    Job Analytics
   </h1>

   <div
    className="
     grid
     grid-cols-1
     md:grid-cols-2
     lg:grid-cols-4
     gap-4
     mb-8
    "
   >

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>Total Applications</h3>

     <p
      className="
       text-3xl
       font-bold
      "
     >
      {analytics?.applications}
     </p>
    </div>

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>Applied</h3>

     <p
      className="
       text-3xl
       font-bold
      "
     >
      {analytics?.applied}
     </p>
    </div>

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>Under Review</h3>

     <p
      className="
       text-3xl
       font-bold
      "
     >
      {analytics?.under_review}
     </p>
    </div>

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>Shortlisted</h3>

     <p
      className="
       text-3xl
       font-bold
      "
     >
      {analytics?.shortlisted}
     </p>
    </div>

   </div>

   <div
    className="
     grid
     grid-cols-1
     md:grid-cols-3
     gap-4
    "
   >

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>
      Interview Scheduled
     </h3>

     <p
      className="
       text-3xl
       font-bold
      "
     >
      {
       analytics
       ?.interview_scheduled
      }
     </p>
    </div>

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>
      Selected
     </h3>

     <p
      className="
       text-3xl
       font-bold
       text-green-600
      "
     >
      {analytics?.selected}
     </p>
    </div>

    <div
     className="
      p-5
      rounded-xl
      border
     "
    >
     <h3>
      Rejected
     </h3>

     <p
      className="
       text-3xl
       font-bold
       text-red-600
      "
     >
      {analytics?.rejected}
     </p>
    </div>

   </div>

   <div
    className="
     mt-8
     p-5
     rounded-xl
     border
    "
   >

    <h3
     className="
      font-semibold
      mb-2
     "
    >
     Job Status
    </h3>

    <p
     className="
      text-lg
      capitalize
     "
    >
     {analytics?.status}
    </p>

   </div>

  </div>
 );
}