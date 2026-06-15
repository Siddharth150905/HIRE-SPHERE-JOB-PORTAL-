import {
 useMutation,
 useQueryClient,
}
from "@tanstack/react-query";

import {
 updateJobStatus
}
from "../api/jobApi";

export const
useUpdateJobStatus =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   ({id,status}) =>
     updateJobStatus(
      id,
      status
     ),

  onSuccess: () => {

   queryClient
    .invalidateQueries({
      queryKey:[
       "my-jobs"
      ]
    });
  },
 });
};