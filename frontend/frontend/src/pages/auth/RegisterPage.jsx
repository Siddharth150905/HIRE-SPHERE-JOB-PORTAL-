import { useState } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { registerUser } from "../../api/authApi";

export default function RegisterPage() {

 const {
  register,
  handleSubmit,

  formState: {
   errors,
  },
 } = useForm();

 const [
  loading,
  setLoading,
 ] = useState(false);

 const [
  successMessage,
  setSuccessMessage,
 ] = useState("");

 const [
  errorMessage,
  setErrorMessage,
 ] = useState("");

 const onSubmit =
 async (data) => {

  try {

   setLoading(true);

   setErrorMessage("");

   setSuccessMessage("");

   const response =
    await registerUser(data);

   setSuccessMessage(

    response.data.message ||

    "Registration successful. Please verify your email."
   );

  } catch (error) {

   setErrorMessage(

    error.response?.data?.message ||

    "Registration failed"
   );

  } finally {

   setLoading(false);
  }
 };

 return (

  <form
   onSubmit={
    handleSubmit(
     onSubmit
    )
   }
   className="
    w-full
    max-w-md
    mx-auto
   "
  >

   <h2
    className="
     text-4xl
     font-bold
     mb-2
    "
   >
    Create Account
   </h2>

   <p
    className="
     text-gray-500
     mb-8
    "
   >
    Start your journey
   </p>

   {

    successMessage && (

     <div
      className="
       mb-4
       bg-green-100
       text-green-700
       p-3
       rounded-lg
      "
     >
      {successMessage}
     </div>

    )

   }

   {

    errorMessage && (

     <div
      className="
       mb-4
       bg-red-100
       text-red-700
       p-3
       rounded-lg
      "
     >
      {errorMessage}
     </div>

    )

   }

   <input
    type="text"

    placeholder="Full Name"

    className="
     w-full
     border
     rounded-xl
     p-4
     mb-2
    "

    {...register(
     "name",
     {
      required:
       "Name is required",
     }
    )}
   />

   {

    errors.name && (

     <p
      className="
       text-red-500
       text-sm
       mb-4
      "
     >
      {
       errors.name
        .message
      }
     </p>

    )

   }

   <input
    type="email"

    placeholder="Email"

    className="
     w-full
     border
     rounded-xl
     p-4
     mb-2
    "

    {...register(
     "email",
     {
      required:
       "Email is required",
     }
    )}
   />

   {

    errors.email && (

     <p
      className="
       text-red-500
       text-sm
       mb-4
      "
     >
      {
       errors.email
        .message
      }
     </p>

    )

   }

   <input
    type="password"

    placeholder="Password"

    className="
     w-full
     border
     rounded-xl
     p-4
     mb-2
    "

    {...register(
     "password",
     {
      required:
       "Password is required",

      minLength: {
       value: 6,

       message:
        "Password must be at least 6 characters",
      },
     }
    )}
   />

   {

    errors.password && (

     <p
      className="
       text-red-500
       text-sm
       mb-4
      "
     >
      {
       errors.password
        .message
      }
     </p>

    )

   }

   <select

    className="
     w-full
     border
     rounded-xl
     p-4
     mb-6
    "

    {...register(
     "role"
    )}
   >

    <option
     value="applicant"
    >
     Applicant
    </option>

    <option
     value="recruiter"
    >
     Recruiter
    </option>

   </select>

   <button

    type="submit"

    disabled={
     loading
    }

    className="
     w-full
     bg-blue-600
     text-white
     py-4
     rounded-xl
     font-semibold
     hover:bg-blue-700
     transition
    "
   >

    {

     loading

      ? "Registering..."

      : "Register"

    }

   </button>

   <p
    className="
     text-center
     mt-6
    "
   >

    Already have an account?

    {" "}

    <Link
     to="/login"

     className="
      text-blue-600
      font-medium
     "
    >
     Login
    </Link>

   </p>

  </form>
 );
}