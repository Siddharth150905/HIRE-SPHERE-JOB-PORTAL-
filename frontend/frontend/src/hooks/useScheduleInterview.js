import {
 useMutation,
 useQueryClient
}
from "@tanstack/react-query";

import toast
from "react-hot-toast";

import {
 scheduleInterview
}
from "../api/applicationApi";

export const
useScheduleInterview =
() => {

 const queryClient =
  useQueryClient();

 return useMutation({

  mutationFn:
   ({
    applicationId,
    data
   }) =>
    scheduleInterview(
     applicationId,
     data
    ),

  onSuccess: () => {

   toast.success(
    "Interview Scheduled"
   );

   queryClient.invalidateQueries({
    queryKey:[
     "job-applicants"
    ]
   });

  },

  onError: (error) => {

   toast.error(
    error?.response?.data?.message
    ||
    "Failed to schedule interview"
   );

  },

 });

};