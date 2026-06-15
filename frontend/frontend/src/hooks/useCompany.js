import {
 useQuery
} from "@tanstack/react-query";

import {
 getCompany
} from "../api/companyApi";

export const useCompany =
(id) => {

 return useQuery({

  queryKey: [
   "company",
   id
  ],

  queryFn: () =>
   getCompany(id),

  enabled: !!id,
 });
};