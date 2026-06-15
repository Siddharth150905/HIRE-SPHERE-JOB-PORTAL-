import {
 useMutation,
 useQueryClient,
}
from "@tanstack/react-query";

import {
 deleteJob
}
from "../api/jobApi";

export const useDeleteJob =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   deleteJob,

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