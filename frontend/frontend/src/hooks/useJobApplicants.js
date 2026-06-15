import {
 useQuery
}
from "@tanstack/react-query";

import {
 getJobApplicants
}
from "../api/applicationApi";

export const useJobApplicants =
(jobId) => {

 return useQuery({

  queryKey:[
   "job-applicants",
   jobId
  ],

  queryFn:() =>
   getJobApplicants(jobId),

  enabled:
   !!jobId,
 });
};