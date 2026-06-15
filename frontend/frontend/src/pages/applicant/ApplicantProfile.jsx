import {
 Link,
} from "react-router-dom";

import {
 useProfile,
} from "../../hooks/useProfile";

export default function ApplicantProfile() {

 const {
  data,
  isLoading,
  isError,
 } = useProfile();

 if (isLoading) {

  return (

   <div
    className="
     flex
     justify-center
     items-center
     py-20
    "
   >

    <h2
     className="
      text-xl
      font-semibold
     "
    >
     Loading Profile...
    </h2>

   </div>

  );
 }

 if (isError) {

  return (

   <div
    className="
     flex
     justify-center
     items-center
     py-20
    "
   >

    <h2
     className="
      text-red-500
      text-xl
      font-semibold
     "
    >
     Failed to load profile
    </h2>

   </div>

  );
 }

 const user =
  data?.data?.user;

 const hasProfessionalLinks =

  user?.github ||

  user?.linkedin ||

  user?.portfolio;

 return (

  <div
   className="
    space-y-6
   "
  >

   {/* HEADER */}

   <div>

    <h1
     className="
      text-3xl
      font-bold
      text-gray-900
     "
    >
     My Profile
    </h1>

    <p
     className="
      text-gray-600
      mt-1
     "
    >
     Manage your professional profile
    </p>

   </div>

   {/* PROFILE CARD */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-8
    "
   >

    <div
     className="
      flex
      flex-col
      md:flex-row
      gap-8
      items-center
     "
    >

     <img
      src={
       user?.profileImage ||
       "https://via.placeholder.com/150"
      }
      alt="Profile"
      className="
       w-40
       h-40
       rounded-full
       object-cover
       border-4
       border-slate-200
      "
     />

     <div
      className="
       flex-1
      "
     >

      <h2
       className="
        text-2xl
        font-bold
       "
      >
       {user?.name}
      </h2>

      <p
       className="
        text-gray-600
        mt-2
       "
      >
       {user?.email}
      </p>

      <div
       className="
        flex
        flex-wrap
        gap-3
        mt-4
       "
      >

       <span
        className="
         px-3
         py-1
         bg-blue-100
         text-blue-700
         rounded-full
         text-sm
        "
       >
        {user?.role}
       </span>

       {

        user?.isVerified && (

         <span
          className="
           px-3
           py-1
           bg-green-100
           text-green-700
           rounded-full
           text-sm
          "
         >
          Verified
         </span>

        )

       }

      </div>

     </div>

    </div>

   </div>

   {/* PROFESSIONAL INFO */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-6
    "
   >

    <h2
     className="
      text-xl
      font-semibold
      mb-4
     "
    >
     Professional Information
    </h2>

    <div
     className="
      grid
      md:grid-cols-2
      gap-6
     "
    >

     <div>

      <p
       className="
        text-sm
        text-gray-500
       "
      >
       Experience
      </p>

      <p
       className="
        font-medium
        mt-1
       "
      >
       {
        user?.experience ||
        "Not added yet"
       }
      </p>

     </div>

     <div>

      <p
       className="
        text-sm
        text-gray-500
       "
      >
       Education
      </p>

      <p
       className="
        font-medium
        mt-1
       "
      >
       {
        user?.education ||
        "Not added yet"
       }
      </p>

     </div>

    </div>

   </div>

   {/* SKILLS */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-6
    "
   >

    <h2
     className="
      text-xl
      font-semibold
      mb-4
     "
    >
     Skills
    </h2>

    {

     user?.skills?.length > 0

     ? (

      <div
       className="
        flex
        flex-wrap
        gap-3
       "
      >

       {

        user.skills.map(
         (skill) => (

          <span
           key={skill}
           className="
            bg-slate-100
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
           "
          >
           {skill}
          </span>

         )
        )

       }

      </div>

     )

     : (

      <p
       className="
        text-gray-500
       "
      >
       No skills added yet.
      </p>

     )

    }

   </div>

   {/* PROFESSIONAL LINKS */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-6
    "
   >

    <h2
     className="
      text-xl
      font-semibold
      mb-4
     "
    >
     Professional Links
    </h2>

    {

     hasProfessionalLinks

     ? (

      <div
       className="
        flex
        flex-col
        gap-3
       "
      >

       {

        user?.github && (

         <a
          href={user.github}
          target="_blank"
          rel="noreferrer"
          className="
           text-blue-600
           hover:underline
          "
         >
          GitHub Profile
         </a>

        )

       }

       {

        user?.linkedin && (

         <a
          href={user.linkedin}
          target="_blank"
          rel="noreferrer"
          className="
           text-blue-600
           hover:underline
          "
         >
          LinkedIn Profile
         </a>

        )

       }

       {

        user?.portfolio && (

         <a
          href={user.portfolio}
          target="_blank"
          rel="noreferrer"
          className="
           text-blue-600
           hover:underline
          "
         >
          Portfolio Website
         </a>

        )

       }

      </div>

     )

     : (

      <p
       className="
        text-gray-500
       "
      >
       No professional links added yet.
      </p>

     )

    }

   </div>

   {/* RESUME */}

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-6
    "
   >

    <h2
     className="
      text-xl
      font-semibold
      mb-4
     "
    >
     Resume
    </h2>

    {

     user?.resume

     ? (

      <a
       href={user.resume}
       target="_blank"
       rel="noreferrer"
       className="
        inline-block
        bg-blue-600
        text-white
        px-5
        py-3
        rounded-lg
        hover:bg-blue-700
       "
      >
       View Resume
      </a>

     )

     : (

      <p
       className="
        text-gray-500
       "
      >
       Resume not uploaded.
      </p>

     )

    }

   </div>

   {/* ACTION BUTTON */}

   <div>

    <Link
     to="/applicant/profile/edit"
     className="
      inline-block
      bg-slate-800
      text-white
      px-6
      py-3
      rounded-lg
      hover:bg-slate-900
     "
    >
     Edit Profile
    </Link>

   </div>

  </div>

 );
}