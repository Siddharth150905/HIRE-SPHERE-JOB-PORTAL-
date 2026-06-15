import {
 useProfile
} from "../../hooks/useProfile";

import {
 Link
} from "react-router-dom";

export default function CompanyProfile() {

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
    Failed to load company
   </h2>
  );
 }

 const company =
  data?.data?.user?.company;

 if (!company) {
  return (

   <div
    className="
     bg-white
     rounded-xl
     shadow
     p-8
    "
   >

    <h1
     className="
      text-3xl
      font-bold
      mb-4
     "
    >
     Company Profile
    </h1>

    <p
     className="
      text-gray-600
      mb-6
     "
    >
     No company created yet.
    </p>

    <Link
     to="/recruiter/company/create"
     className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
     "
    >
     Create Company
    </Link>

   </div>
  );
 }

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
     src={company.logo}
     alt={company.name}
     className="
      w-24
      h-24
      rounded-xl
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
      {company.name}
     </h1>

     <p
      className="
       text-gray-500
      "
     >
      Recruiter Company
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
      Description
     </h3>

     <p>
      {company.description}
     </p>

    </div>

    <div>

     <h3
      className="
       font-semibold
      "
     >
      Website
     </h3>

     <a
      href={company.website}
      target="_blank"
      rel="noreferrer"
      className="
       text-blue-600
      "
     >
      {company.website}
     </a>

    </div>

    <div>

     <h3
      className="
       font-semibold
      "
     >
      Recruiter
     </h3>

     <p>
      {data?.data?.user?.name}
     </p>

    </div>

   </div>

   <div
    className="
     mt-8
    "
   >

    <Link
     to={
      `/recruiter/company/edit/${company._id}`
     }
     className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-blue-700
     "
    >
     Edit Company
    </Link>

   </div>

  </div>
 );
}