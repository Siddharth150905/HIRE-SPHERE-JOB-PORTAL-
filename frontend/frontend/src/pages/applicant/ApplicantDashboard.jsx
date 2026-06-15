import {
 Link,
} from "react-router-dom";

import {
 useProfile,
} from "../../hooks/useProfile";

import {
 useApplications,
} from "../../hooks/useApplications";

import {
 useBookmarks,
} from "../../hooks/useBookmarks";

export default function ApplicantDashboard() {

 const {
  data: profileData,
  isLoading: profileLoading,
  isError: profileError,
 } = useProfile();

 const {
  data: applicationData,
  isLoading: applicationsLoading,
  isError: applicationsError,
 } = useApplications();

 const {
  data: bookmarkData,
  isLoading: bookmarksLoading,
  isError: bookmarksError,
 } = useBookmarks();

 if (
  profileLoading ||
  applicationsLoading ||
  bookmarksLoading
 ) {
  return (

   <div
    className="
     min-h-screen
     flex
     items-center
     justify-center
    "
   >

    <h2
     className="
      text-xl
      font-semibold
     "
    >
     Loading Dashboard...
    </h2>

   </div>
  );
 }

 if (
  profileError ||
  applicationsError ||
  bookmarksError
 ) {
  return (

   <div
    className="
     min-h-screen
     flex
     items-center
     justify-center
    "
   >

    <h2
     className="
      text-red-500
      text-xl
      font-semibold
     "
    >
     Failed to load dashboard
    </h2>

   </div>
  );
 }

 const user =
  profileData?.data?.user;

 const applications =
  applicationData?.data?.applications
  || [];

 const savedJobs =
  bookmarkData?.data?.savedJobs
  || [];

 const recentApplications =
  applications.slice(0, 3);

 const completionFields = [

  user?.name,

  user?.profileImage,

  user?.skills?.length > 0,

  user?.experience,

  user?.resume,
 ];

 const completed =
  completionFields.filter(Boolean)
  .length;

 const profileCompletion =
  Math.round(
   (completed /
    completionFields.length)
   * 100
  );

 return (

  <div
   className="space-y-6"
  >

   <div
    className="
     max-w-7xl
     mx-auto
    "
   >

    {/* HEADER */}

    <div
     className="
      mb-8
     "
    >

     <h1
      className="
       text-3xl
       font-bold
       text-gray-900
      "
     >
      Welcome back,
      {" "}
      {user?.name}
      👋
     </h1>

     <p
      className="
       text-gray-600
       mt-2
      "
     >
      Track applications,
      manage your profile,
      and discover new opportunities.
     </p>

    </div>

    {/* STATS */}

    <div
     className="
      grid
      md:grid-cols-3
      gap-6
      mb-8
     "
    >

     <div
      className="
       bg-white
       p-6
       rounded-xl
       shadow
      "
     >
      <h3
       className="
        text-gray-500
       "
      >
       Applications
      </h3>

      <p
       className="
        text-3xl
        font-bold
        mt-2
       "
      >
       {applications.length}
      </p>
     </div>

     <div
      className="
       bg-white
       p-6
       rounded-xl
       shadow
      "
     >
      <h3
       className="
        text-gray-500
       "
      >
       Saved Jobs
      </h3>

      <p
       className="
        text-3xl
        font-bold
        mt-2
       "
      >
       {savedJobs.length}
      </p>
     </div>

     <div
      className="
       bg-white
       p-6
       rounded-xl
       shadow
      "
     >
      <h3
       className="
        text-gray-500
       "
      >
       Profile Completion
      </h3>

      <p
       className="
        text-3xl
        font-bold
        mt-2
       "
      >
       {profileCompletion}%
      </p>
     </div>

    </div>

    {/* QUICK ACTIONS */}

    <div
     className="
      bg-white
      p-6
      rounded-xl
      shadow
      mb-8
     "
    >

     <h2
      className="
       text-xl
       font-semibold
       mb-4
      "
     >
      Quick Actions
     </h2>

     <div
      className="
       flex
       flex-wrap
       gap-4
      "
     >

      <Link
       to="/jobs"
       className="
        bg-blue-600
        text-white
        px-5
        py-3
        rounded-lg
        hover:bg-blue-700
       "
      >
       Browse Jobs
      </Link>

      <Link
       to="/applicant/applications"
       className="
        bg-slate-800
        text-white
        px-5
        py-3
        rounded-lg
       "
      >
       My Applications
      </Link>

      <Link
       to="/applicant/saved-jobs"
       className="
        bg-slate-800
        text-white
        px-5
        py-3
        rounded-lg
       "
      >
       Saved Jobs
      </Link>

      <Link
       to="/applicant/profile/edit"
       className="
        bg-slate-800
        text-white
        px-5
        py-3
        rounded-lg
       "
      >
       Edit Profile
      </Link>

     </div>

    </div>

    {/* RECENT APPLICATIONS */}

    <div
     className="
      bg-white
      p-6
      rounded-xl
      shadow
     "
    >

     <h2
      className="
       text-xl
       font-semibold
       mb-4
      "
     >
      Recent Applications
     </h2>

     {

      recentApplications.length === 0

      ? (

       <div>

        <p
         className="
          text-gray-500
          mb-4
         "
        >
         You haven't applied to any jobs yet.
        </p>

        <Link
         to="/jobs"
         className="
          text-blue-600
          font-medium
         "
        >
         Browse Jobs
        </Link>

       </div>

      )

      : (

       <div
        className="
         space-y-4
        "
       >

        {

         recentApplications.map(
          (application) => (

           <div
            key={
             application._id
            }
            className="
             border
             rounded-lg
             p-4
            "
           >

            <h3
             className="
              font-semibold
             "
            >
             {
              application.job
              ?.title
             }
            </h3>

            <p
             className="
              text-gray-500
              text-sm
             "
            >
             {
              application.job
              ?.company?.name
             }
            </p>

            <p
             className="
              mt-2
              text-sm
             "
            >
             Status:
             {" "}
             <span
              className="
               font-medium
              "
             >
              {
               application.status
              }
             </span>
            </p>

           </div>

          )
         )

        }

       </div>

      )

     }

    </div>

   </div>

  </div>
 );
}