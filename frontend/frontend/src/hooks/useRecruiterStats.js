import {
 useQuery
}
from "@tanstack/react-query";

import {
 getRecruiterStats
}
from "../api/recruiterApi";

export const useRecruiterStats =
() => {

 return useQuery({

  queryKey: [
   "recruiter-stats"
  ],

  queryFn:
   getRecruiterStats,
 });
};