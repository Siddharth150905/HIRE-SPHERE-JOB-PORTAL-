import {
 useMutation,
 useQueryClient,
}
from "@tanstack/react-query";

import {
 unsaveJob
}
from "../api/applicationApi";

export const useUnsaveJob =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   unsaveJob,

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