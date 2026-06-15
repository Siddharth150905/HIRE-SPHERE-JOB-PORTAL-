import {
 useMutation,
 useQueryClient,
} from "@tanstack/react-query";

import {
 createCompany,
} from "../api/companyApi";

export const useCreateCompany =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   createCompany,

  onSuccess: () => {

   queryClient.invalidateQueries({
    queryKey:["profile"],
   });

  },
 });
};