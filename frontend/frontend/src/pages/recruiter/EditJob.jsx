import {
 useParams
}
from "react-router-dom";

import {
 useEffect
}
from "react";

import {
 useForm
}
from "react-hook-form";

import {
 getJobById,
 updateJob
}
from "../../api/jobApi";

export default function
EditJob(){

 const {
  id
 } =
 useParams();

 const {
  register,
  handleSubmit,
  reset,
 } = useForm();

 useEffect(() => {

  const fetchJob =
  async () => {

   const response =
    await getJobById(
      id
    );

   reset(
    response.data.job
   );
  };

  fetchJob();

 },[
  id,
  reset
 ]);

 const onSubmit =
 async(data) => {

  await updateJob(
   id,
   data
  );
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
    {...register(
      "title"
    )}
   />

   <textarea
    {...register(
      "description"
    )}
   />

   <button
    type="submit"
   >
    Update Job
   </button>

  </form>
 );
}