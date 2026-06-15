import {
 useMutation,
 useQueryClient
}
from "@tanstack/react-query";

import {
 withdrawApplication
}
from "../api/applicationApi";
    
export const
useWithdrawApplication =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   withdrawApplication,

  onSuccess: () => {

   queryClient
   .invalidateQueries({
    queryKey:[
     "applications"
    ]
   });
  }
 });
};