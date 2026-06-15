import {
 useProfile
}
from "../../hooks/useProfile";

import {
 Link
}
from "react-router-dom";

export default function
RecruiterProfile() {

 const {
  data,
  isLoading,
  isError,
 } = useProfile();

 if (isLoading) {

  return (
   <h2>
    Loading...
   </h2>
  );
 }

 if (isError) {

  return (
   <h2>
    Failed to load profile
   </h2>
  );
 }

 const user =
  data?.data?.user;

 return (

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
     items-center
     gap-6
     mb-6
    "
   >

    <img
 src={
  user?.profileImage ||
  "https://via.placeholder.com/150"
 }
 alt="profile"
 className="
  w-24
  h-24
  rounded-full
  object-cover
 "
/>

    <div>

     <h1
      className="
       text-3xl
       font-bold
      "
     >
      {user?.name}
     </h1>

     <p
      className="
       text-gray-500
      "
     >
      {user?.email}
     </p>

    </div>

   </div>

   <div
    className="
     space-y-4
    "
   >

    <div>

     <h3
      className="
       font-semibold
      "
     >
      Role
     </h3>

     <p>
      {user?.role}
     </p>

    </div>

    <div>

     <h3
      className="
       font-semibold
      "
     >
      Company
     </h3>

     <p>
      {
       user?.company?.name
       ||
       "No Company"
      }
     </p>

    </div>

   </div>

   <div
    className="
     mt-8
    "
   >

    <Link
     to="/recruiter/profile/edit"
     className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-blue-700
     "
    >
     Edit Profile
    </Link>

   </div>

  </div>
 );
}