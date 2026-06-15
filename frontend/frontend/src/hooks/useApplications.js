import {
 useQuery
} from "@tanstack/react-query";

import {
 getMyApplications
} from "../api/applicationApi";

export const useApplications =
() => {

 return useQuery({

  queryKey: [
   "applications"
  ],

  queryFn:
   getMyApplications,

 });
};