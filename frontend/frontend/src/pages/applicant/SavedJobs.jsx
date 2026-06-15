import {
  Link
} from "react-router-dom";

import {
  useBookmarks
} from "../../hooks/useBookmarks";

export default function SavedJobs() {

  const {
    data,
    isLoading,
    isError,
  } = useBookmarks();

  if (isLoading) {

    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">
          Loading saved jobs...
        </h2>
      </div>
    );
  }

  if (isError) {

    return (
      <div className="p-6">
        <h2 className="text-red-600 font-semibold">
          Failed to load saved jobs
        </h2>
      </div>
    );
  }

  const jobs =
    data?.data?.savedJobs || [];

  return (

    <div className="space-y-6">

      <div>

        <h1
          className="
          text-3xl
          font-bold
          text-gray-900
          "
        >
          Saved Jobs
        </h1>

        <p
          className="
          text-gray-500
          mt-1
          "
        >
          Jobs you've bookmarked for later.
        </p>

      </div>

      {

        jobs.length === 0 ? (

          <div
            className="
            bg-white
            rounded-xl
            shadow-sm
            border
            p-8
            text-center
            "
          >

            <h3
              className="
              text-lg
              font-semibold
              text-gray-700
              "
            >
              No Saved Jobs
            </h3>

            <p
              className="
              text-gray-500
              mt-2
              "
            >
              Start saving jobs to view them here.
            </p>

            <Link
              to="/jobs"
              className="
              inline-block
              mt-4
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-blue-700
              transition
              "
            >
              Browse Jobs
            </Link>

          </div>

        ) : (

          <div
            className="
            grid
            md:grid-cols-2
            gap-6
            "
          >

            {

              jobs.map((job) => (

                <div
                  key={job._id}
                  className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  border
                  p-6
                  hover:shadow-md
                  transition
                  "
                >

                  <div
                    className="
                    flex
                    items-start
                    justify-between
                    mb-4
                    "
                  >

                    <div>

                      <h3
                        className="
                        text-xl
                        font-bold
                        text-gray-900
                        "
                      >
                        {job.title}
                      </h3>

                      <p
                        className="
                        text-gray-600
                        "
                      >
                        {job.company?.name}
                      </p>

                    </div>

                    {

                      job.company?.logo && (

                        <img
                          src={job.company.logo}
                          alt="company"
                          className="
                          w-12
                          h-12
                          rounded-lg
                          object-cover
                          "
                        />

                      )

                    }

                  </div>

                  <div
                    className="
                    space-y-2
                    text-gray-600
                    "
                  >

                    <p>
                      📍 {job.location}
                    </p>

                    <p>
                      💼 {job.jobType}
                    </p>

                    <p>
                      💰 ₹{job.salary?.toLocaleString()}
                    </p>

                  </div>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="
                    inline-block
                    mt-5
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                    transition
                    "
                  >
                    View Details
                  </Link>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );
}