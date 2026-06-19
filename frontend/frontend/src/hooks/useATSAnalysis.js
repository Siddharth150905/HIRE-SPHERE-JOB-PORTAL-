import {
 useMutation
}
from "@tanstack/react-query";

import {
 analyzeATS
}
from "../api/aiApi";

export const useATSAnalysis =
()=>{

 return useMutation({

  mutationFn:
   ({
    jobId,
    file
   })=>

    analyzeATS(
     jobId,
     file
    )
 });
};