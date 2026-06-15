import {
 useForm
}
from "react-hook-form";

import {
 useCreateJob
}
from "../../hooks/useCreateJob";

export default function
CreateJob(){

 const {
  register,
  handleSubmit,
 } = useForm();

 const {
  mutate,
  isPending,
 } =
 useCreateJob();

 const onSubmit =
 (data) => {

  data.salary =
   Number(
    data.salary
   );

  data.requirements =
   data.requirements
   .split(",");

  mutate(data);
 };

 return (

  <form
   onSubmit={
    handleSubmit(
     onSubmit
    )
   }
  >

   <input
    placeholder="Title"
    {...register(
      "title"
    )}
   />

   <textarea
    placeholder=
    "Description"

    {...register(
      "description"
    )}
   />

   <input
    placeholder=
    "Requirements"

    {...register(
      "requirements"
    )}
   />

   <input
    type="number"

    placeholder=
    "Salary"

    {...register(
      "salary"
    )}
   />

   <input
    placeholder=
    "Location"

    {...register(
      "location"
    )}
   />

   <select
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
    disabled={
     isPending
    }
   >

    {
     isPending
     ?
     "Creating..."
     :
     "Create Job"
    }

   </button>

  </form>
 );
}