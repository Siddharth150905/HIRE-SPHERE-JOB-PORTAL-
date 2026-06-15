import {
 useQuery
}
from "@tanstack/react-query";

import {
 getJobAnalytics
}
from "../api/applicationApi";

export const
useJobAnalytics =
(id) => {

 return useQuery({

  queryKey:[
   "job-analytics",
   id
  ],

  queryFn:() =>
   getJobAnalytics(id),

  enabled: !!id,
 });
};