import {
 useParams
}
from "react-router-dom";

import {
 useJobAnalytics
}
from "../../hooks/useJobAnalytics";

export default function
JobAnalytics(){

 const {
  id
 } =
 useParams();

 const {
  data,
  isLoading,
  isError,
 } =
 useJobAnalytics(id);

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
    Failed to load analytics
   </h2>
  );
 }

 const analytics =
  data?.data?.analytics;

 return (

  <div>

   <h1>
    Job Analytics
   </h1>

   <hr />

   <h2>
    Total Applications:
    {" "}
    {analytics?.applications}
   </h2>

   <h3>
    Applied:
    {" "}
    {analytics?.applied}
   </h3>

   <h3>
    Under Review:
    {" "}
    {analytics?.under_review}
   </h3>

   <h3>
    Shortlisted:
    {" "}
    {analytics?.shortlisted}
   </h3>

   <h3>
    Interview Scheduled:
    {" "}
    {analytics?.interview_scheduled}
   </h3>

   <h3>
    Selected:
    {" "}
    {analytics?.selected}
   </h3>

   <h3>
    Rejected:
    {" "}
    {analytics?.rejected}
   </h3>

   <hr />

   <h2>
    Job Status:
    {" "}
    {analytics?.status}
   </h2>

  </div>
 );
}