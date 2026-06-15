import {
 useForm
} from "react-hook-form";

import {
 useNavigate
} from "react-router-dom";

import {
 useCreateJob
} from "../../hooks/useCreateJob";

export default function CreateJob() {

 const navigate =
  useNavigate();

 const {
  register,
  handleSubmit,
  formState: {
   errors,
  },
 } = useForm();

 const {
  mutate,
  isPending,
 } =
 useCreateJob();

 const onSubmit =
 (data) => {

  const formattedData = {

   ...data,

   salary:
    Number(
     data.salary
    ),

   requirements:
    data.requirements
    .split(",")
    .map(
     item =>
      item.trim()
    )
    .filter(Boolean),
  };

  mutate(
   formattedData,
   {
    onSuccess: () => {

     navigate(
      "/recruiter/jobs"
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
    Create Job
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
      placeholder="Job Title"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "title",
       {
        required:
         "Title is required",

        minLength: {
         value: 3,
         message:
          "Minimum 3 characters",
        },
       }
      )}
     />

     {errors.title && (

      <p
       className="
        text-red-500
        text-sm
        mt-1
       "
      >
       {
        errors.title
         .message
       }
      </p>

     )}

    </div>

    <div>

     <textarea
      rows="6"
      placeholder="Job Description"
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

        minLength: {
         value: 20,
         message:
          "Description must be at least 20 characters",
        },
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
      placeholder="Requirements (comma separated)"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "requirements",
       {
        required:
         "Requirements are required",
       }
      )}
     />

    </div>

    <div>

     <input
      type="number"
      placeholder="Salary"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "salary",
       {
        required:
         "Salary is required",

        min: {
         value: 1,
         message:
          "Salary must be positive",
        },
       }
      )}
     />

     {errors.salary && (

      <p
       className="
        text-red-500
        text-sm
        mt-1
       "
      >
       {
        errors.salary
         .message
       }
      </p>

     )}

    </div>

    <div>

     <input
      type="text"
      placeholder="Location"
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "location",
       {
        required:
         "Location is required",
       }
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
      Job Type
     </label>

     <select
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "jobType"
      )}
     >

      <option value="remote">
       Remote
      </option>

      <option value="onsite">
       Onsite
      </option>

      <option value="hybrid">
       Hybrid
      </option>

     </select>

    </div>

    <div>

     <label
      className="
       block
       mb-2
       font-medium
      "
     >
      Experience Level
     </label>

     <select
      className="
       w-full
       border
       rounded-lg
       p-3
      "
      {...register(
       "experienceLevel"
      )}
     >

      <option value="intern">
       Intern
      </option>

      <option value="junior">
       Junior
      </option>

      <option value="mid">
       Mid
      </option>

      <option value="senior">
       Senior
      </option>

     </select>

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
      disabled:opacity-50
     "
    >

     {
      isPending
       ? "Creating..."
       : "Create Job"
     }

    </button>

   </form>

  </div>
 );
}