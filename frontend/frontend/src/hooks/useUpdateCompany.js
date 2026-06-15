import {
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";

import {
 updateCompany,
} from "../api/companyApi";

export const useUpdateCompany =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   ({ id, formData }) =>
    updateCompany(
     id,
     formData
    ),

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