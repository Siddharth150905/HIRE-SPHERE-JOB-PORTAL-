    import {
    useQuery
    }
    from "@tanstack/react-query";

    import {
    getJobs
    }
    from "../api/jobApi";

    export const useJobs =
    (
    params = {}
    ) => {

    return useQuery({

    queryKey: [
    "jobs",
    params
    ],

    queryFn: () =>
    getJobs(params),
    });
    };