import {
 useMutation,
 useQueryClient
}
from "@tanstack/react-query";

import {
 updateRecruiterProfile
}
from "../api/profileApi";

export const
useUpdateRecruiterProfile =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   updateRecruiterProfile,

  onSuccess: () => {

   queryClient
   .invalidateQueries({

    queryKey:[
     "profile"
    ]

   });

  },
 });
};