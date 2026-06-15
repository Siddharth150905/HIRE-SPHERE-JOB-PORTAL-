import {
 useForm
}
from "react-hook-form";

import {
 useNavigate
}
from "react-router-dom";

import {
 useProfile
}
from "../../hooks/useProfile";

import {
 useUpdateRecruiterProfile
}
from "../../hooks/useUpdateRecruiterProfile";

export default function
EditRecruiterProfile() {

 const navigate =
  useNavigate();

 const {
  data,
  isLoading,
 } =
 useProfile();

 const {
  mutate,
  isPending,
 } =
 useUpdateRecruiterProfile();

 const user =
  data?.data?.user;

 const {
  register,
  handleSubmit,
 } = useForm({

  values:{
   name:
    user?.name || "",
  },

 });

 if(isLoading){

  return (
   <h2>
    Loading...
   </h2>
  );
 }

 const onSubmit =
 (data) => {

  const formData =
   new FormData();

  formData.append(
   "name",
   data.name
  );

  if(
   data.profileImage?.[0]
  ){

   formData.append(
    "profileImage",
    data.profileImage[0]
   );
  }

  mutate(
   formData,
   {
    onSuccess:() => {

     navigate(
      "/recruiter/profile"
     );

    },
   }
  );
 };

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
     mb-6
    "
   >
    Edit Profile
   </h1>

   <form
    onSubmit={
     handleSubmit(
      onSubmit
     )
    }
    className="
     space-y-5
    "
   >

    <div>

     <input
      type="text"
      placeholder="Name"
      className="
       w-full
       border
       rounded-lg
       p-3
      "

      {...register(
       "name"
      )}
     />

    </div>

    <div>

     <label
      className="
       block
       mb-2
       font-medium
      "
     >
      Profile Image
     </label>

     <input
      type="file"

      {...register(
       "profileImage"
      )}
     />

    </div>

    <button
     type="submit"
     disabled={
      isPending
     }
     className="
      bg-blue-600
      text-white
      px-6
      py-3
      rounded-lg
      hover:bg-blue-700
     "
    >
     {
      isPending
       ? "Updating..."
       : "Update Profile"
     }
    </button>

   </form>

  </div>
 );
}