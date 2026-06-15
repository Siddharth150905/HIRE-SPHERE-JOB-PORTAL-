import {
 useQuery
} from "@tanstack/react-query";

import {
 getSavedJobs
} from "../api/bookmarkApi";

export const useBookmarks =
() => {

 return useQuery({

  queryKey: [
   "saved-jobs"
  ],

  queryFn:
   getSavedJobs,

 });
};