import {
 useQuery
} from "@tanstack/react-query";

import {
 getJobById
} from "../api/jobApi";

export const useJob =
(id) => {

 return useQuery({

  queryKey: [
   "job",
   id
  ],

  queryFn: () =>
   getJobById(id),

  enabled: !!id,
 });
};