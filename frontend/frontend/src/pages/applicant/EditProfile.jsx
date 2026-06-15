import {
 useEffect,
 useState,
} from "react";

import {
 useForm,
} from "react-hook-form";

import {
 useProfile,
} from "../../hooks/useProfile";

import {
 useUpdateProfile,
} from "../../hooks/useUpdateProfile";

export default function EditProfile() {

 const {
  data,
  isLoading,
 } = useProfile();

 const {
  mutate,
  isPending,
 } = useUpdateProfile();

 const [
  successMessage,
  setSuccessMessage,
 ] = useState("");

 const user =
  data?.data?.user;

 const {
  register,
  handleSubmit,
  reset,
 } = useForm();

 useEffect(() => {

  if(user){

   reset({

    github:
     user.github || "",

    linkedin:
     user.linkedin || "",

    portfolio:
     user.portfolio || "",

    experience:
     user.experience || "",

    education:
     user.education || "",

    skills:
     user.skills?.join(", ")
      || "",
   });
  }

 }, [user, reset]);

 const onSubmit =
 (formValues) => {

  const formData =
   new FormData();

  Object.keys(
   formValues
  ).forEach(key => {

   if(

    key !==
    "profileImage"

    &&

    key !==
    "resume"

   ){

    formData.append(
     key,
     formValues[key]
    );
   }
  });

  if(
   formValues
   .profileImage?.[0]
  ){

   formData.append(
    "profileImage",
    formValues
    .profileImage[0]
   );
  }

  if(
   formValues
   .resume?.[0]
  ){

   formData.append(
    "resume",
    formValues
    .resume[0]
   );
  }

  mutate(
   formData,
   {
    onSuccess: () => {

     setSuccessMessage(
      "Profile updated successfully"
     );
    },
   }
  );
 };

 if(isLoading){

  return (

   <div
    className="
     bg-white
     rounded-xl
     p-6
     shadow
    "
   >
    Loading...
   </div>

  );
 }

 return (

  <div
   className="
    bg-white
    rounded-2xl
    shadow-md
    p-8
    max-w-4xl
   "
  >

   <h1
    className="
     text-3xl
     font-bold
     text-gray-900
     mb-2
    "
   >
    Edit Profile
   </h1>

   <p
    className="
     text-gray-500
     mb-8
    "
   >
    Keep your profile updated
    to attract recruiters.
   </p>

   {

    successMessage && (

     <div
      className="
       mb-6
       bg-green-100
       text-green-700
       p-4
       rounded-lg
      "
     >
      {successMessage}
     </div>

    )

   }

   <form
    onSubmit={
     handleSubmit(
      onSubmit
     )
    }
    className="
     space-y-6
    "
   >

    <div>

     <label
      className="
       block
       mb-2
       font-medium
      "
     >
      Skills
     </label>

     <input
      placeholder="
      Java, React, NodeJS
      "
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "skills"
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
      Experience
     </label>

     <input
      placeholder="
      Fresher
      "
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "experience"
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
      Education
     </label>

     <input
      placeholder="
      B.Tech CSE
      "
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "education"
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
      Github
     </label>

     <input
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "github"
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
      LinkedIn
     </label>

     <input
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "linkedin"
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
      Portfolio
     </label>

     <input
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "portfolio"
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

    <div>

     <label
      className="
       block
       mb-2
       font-medium
      "
     >
      Resume
     </label>

     <input
      type="file"
      {...register(
       "resume"
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
      transition
     "
    >

     {
      isPending
      ?
      "Saving..."
      :
      "Save Changes"
     }

    </button>

   </form>

  </div>
 );
}