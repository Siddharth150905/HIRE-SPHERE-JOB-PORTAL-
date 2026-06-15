import {
 useMutation,
 useQueryClient,
}
from "@tanstack/react-query";

import {
 applyToJob
}
from "../api/applicationApi";

export const useApplyJob =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   ({jobId,data}) =>
    applyToJob(
     jobId,
     data
    ),

  onSuccess: () => {

   queryClient
    .invalidateQueries({
      queryKey:[
       "applications"
      ]
    });
  },
 });
};