import {
 useForm
} from "react-hook-form";

import {
 useParams,
 useNavigate
} from "react-router-dom";

import {
 useJob
} from "../../hooks/useJob";

import {
 useUpdateJob
} from "../../hooks/useUpdateJob";

export default function EditJob() {

 const { id } =
  useParams();

 const navigate =
  useNavigate();

 const {
  data,
  isLoading,
  isError,
 } = useJob(id);

 const {
  mutate,
  isPending,
 } = useUpdateJob();

 const job =
  data?.data?.job;

 const {
  register,
  handleSubmit,
 } = useForm({

  values: {

   title:
    job?.title || "",

   description:
    job?.description || "",

   requirements:
    job?.requirements
     ?.join(", ") || "",

   salary:
    job?.salary || "",

   location:
    job?.location || "",

   jobType:
    job?.jobType || "remote",

   experienceLevel:
    job?.experienceLevel
    || "intern",
  },
 });

 const onSubmit =
 (formData) => {

  const payload = {

   ...formData,

   salary:
    Number(
     formData.salary
    ),

   requirements:
    formData
     .requirements
     .split(",")
     .map(item =>
      item.trim()
     ),
  };

  mutate(
   {
    id,
    data: payload,
   },
   {
    onSuccess: () => {

     navigate(
      "/recruiter/jobs"
     );
    },
   }
  );
 };

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
    Failed to load job
   </h2>
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

   <h1
    className="
     text-3xl
     font-bold
     mb-6
    "
   >
    Edit Job
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
      "title"
     )}
    />

    <textarea
     rows="5"
     placeholder="Description"
     className="
      w-full
      border
      rounded-lg
      p-3
     "
     {...register(
      "description"
     )}
    />

    <input
     type="text"
     placeholder="Requirements"
     className="
      w-full
      border
      rounded-lg
      p-3
     "
     {...register(
      "requirements"
     )}
    />

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
      "salary"
     )}
    />

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
      "location"
     )}
    />

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
       : "Update Job"
     }

    </button>

   </form>

  </div>
 );
}