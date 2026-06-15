import {
 useForm
}
from "react-hook-form";

import {
 createCompany
}
from "../../api/companyApi";

export default function
CreateCompany(){

 const {
  register,
  handleSubmit,
 } = useForm();

 const onSubmit =
 async(data) => {

  const formData =
   new FormData();

  formData.append(
   "name",
   data.name
  );

  formData.append(
   "description",
   data.description
  );

  formData.append(
   "website",
   data.website
  );

  if(data.logo?.[0]){

   formData.append(
    "logo",
    data.logo[0]
   );
  }

  try{

   await createCompany(
    formData
   );

   alert(
    "Company created"
   );

  }catch(error){

   console.log(error);
  }
 };

 return(

  <form
   onSubmit={
    handleSubmit(
     onSubmit
    )
   }
  >

   <input
    placeholder="Name"
    {...register("name")}
   />

   <input
    placeholder=
    "Website"
    {...register(
      "website"
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
    type="file"

    {...register(
      "logo"
    )}
   />

   <button
    type="submit"
   >
    Create Company
   </button>

  </form>
 );
}