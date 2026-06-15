import {
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";

import {
 updateApplicantProfile,
}
from "../api/profileApi";

export const
useUpdateProfile =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   updateApplicantProfile,

  onSuccess: () => {

   queryClient
    .invalidateQueries({
      queryKey:[
       "profile"
      ],
    });
  },
 });
};