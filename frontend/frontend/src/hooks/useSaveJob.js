import {
 useMutation,
 useQueryClient,
}
from "@tanstack/react-query";

import {
 saveJob
}
from "../api/applicationApi";

export const useSaveJob =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   saveJob,

  onSuccess: () => {

   queryClient
    .invalidateQueries({
      queryKey:[
       "saved-jobs"
      ]
    });
  },
 });
};