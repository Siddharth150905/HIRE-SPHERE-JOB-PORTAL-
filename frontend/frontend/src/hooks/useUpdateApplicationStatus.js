import {
 useMutation,
 useQueryClient
}
from "@tanstack/react-query";

import {
 updateApplicationStatus
}
from "../api/applicationApi";

export const
useUpdateApplicationStatus =
() => {

 const queryClient =
 useQueryClient();

 return useMutation({

  mutationFn:
  ({
   applicationId,
   status
  }) =>

   updateApplicationStatus(
    applicationId,
    status
   ),

  onSuccess:() => {

   queryClient.invalidateQueries({
    queryKey:[
     "job-applicants"
    ]
   });
  },
 });
};