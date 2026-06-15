import {
 useQuery
}
from "@tanstack/react-query";

import {
 getMyJobs
}
from "../api/jobApi";

export const useMyJobs =
() => {

 return useQuery({

  queryKey:[
   "my-jobs"
  ],

  queryFn:
   getMyJobs,
 });
};