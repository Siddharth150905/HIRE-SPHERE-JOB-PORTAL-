import {
 useMutation,
 useQueryClient
} from "@tanstack/react-query";

import {
 updateJob
} from "../api/jobApi";

export const useUpdateJob =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   ({ id, data }) =>
    updateJob(id, data),

  onSuccess:
   (_, variables) => {

    queryClient
     .invalidateQueries({
      queryKey:[
       "my-jobs"
      ]
     });

    queryClient
     .invalidateQueries({
      queryKey:[
       "job",
       variables.id
      ]
     });
   },
 });
};