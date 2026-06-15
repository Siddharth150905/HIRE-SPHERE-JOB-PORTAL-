import {
 useForm
} from "react-hook-form";

import {
 useNavigate
} from "react-router-dom";

import {
 useProfile
} from "../../hooks/useProfile";

import {
 useUpdateCompany
} from "../../hooks/useUpdateCompany";

export default function EditCompany() {

 const navigate =
  useNavigate();

 const {
  data,
  isLoading,
 } = useProfile();

 const {
  mutate,
  isPending,
 } =
 useUpdateCompany();

 if (isLoading) {

  return (
   <h2>
    Loading...
   </h2>
  );
 }

 const company =
  data?.data?.user?.company;

 const {
  register,
  handleSubmit,
  formState:{
   errors,
  },
 } = useForm({

  values:{

   name:
    company?.name || "",

   description:
    company?.description || "",

   website:
    company?.website || "",
  },
 });

 const onSubmit =
 (formValues) => {

  const formData =
   new FormData();

  formData.append(
   "name",
   formValues.name
  );

  formData.append(
   "description",
   formValues.description
  );

  formData.append(
   "website",
   formValues.website
  );

  if (
   formValues.logo?.[0]
  ) {

   formData.append(
    "logo",
    formValues.logo[0]
   );
  }

  mutate(

   {
    id: company._id,
    formData,
   },

   {
    onSuccess: () => {

     navigate(
      "/recruiter/company"
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
    Edit Company
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
      placeholder="Company Name"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "name",
       {
        required:
         "Company name is required",
       }
      )}
     />

     {errors.name && (

      <p
       className="
        text-red-500
        text-sm
        mt-1
       "
      >
       {
        errors.name
         .message
       }
      </p>

     )}

    </div>

    <div>

     <textarea
      rows="5"
      placeholder="Company Description"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "description",
       {
        required:
         "Description is required",
       }
      )}
     />

     {errors.description && (

      <p
       className="
        text-red-500
        text-sm
        mt-1
       "
      >
       {
        errors.description
         .message
       }
      </p>

     )}

    </div>

    <div>

     <input
      type="text"
      placeholder="Website URL"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "website"
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
      Update Logo
     </label>

     <input
      type="file"
      {...register(
       "logo"
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
       : "Update Company"
     }
    </button>

   </form>

  </div>
 );
}