import { useState } from "react";

import {
 useParams,
 Link,
 useNavigate,
}
from "react-router-dom";

import {
 useForm
}
from "react-hook-form";

import {
 resetPassword
}
from "../../api/authApi";

export default function
ResetPasswordPage() {

 const { token } =
  useParams();

 const navigate =
  useNavigate();

 const {
  register,
  handleSubmit,
  watch,
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

 const password =
  watch("password");

 const onSubmit =
 async (data) => {

  try {

   setLoading(true);

   setErrorMessage("");
   setSuccessMessage("");

   const response =
    await resetPassword(
      token,
      {
       password:
        data.password,
      }
    );

   setSuccessMessage(
    response.data.message ||
    "Password reset successfully"
   );

   setTimeout(() => {

    navigate(
      "/login"
    );

   }, 2000);

  } catch (error) {

   setErrorMessage(

    error.response?.data?.message ||

    "Password reset failed"
   );

  } finally {

   setLoading(false);
  }
 };

 return (

  <div>

   <h2
    className="
     text-3xl
     font-bold
     mb-2
    "
   >
    Reset Password
   </h2>

   <p
    className="
     text-gray-500
     mb-8
    "
   >
    Create a new password
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

   <form
    onSubmit={
     handleSubmit(
      onSubmit
     )
    }
   >

    <input
     type="password"
     placeholder="New Password"
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
        errors.password.message
       }
      </p>

     )

    }

    <input
     type="password"
     placeholder="Confirm Password"
     className="
      w-full
      border
      rounded-xl
      p-4
      mb-2
     "
     {...register(
      "confirmPassword",
      {
       required:
        "Confirm Password is required",

       validate:
        value =>
         value === password ||

         "Passwords do not match",
      }
     )}
    />

    {

     errors.confirmPassword && (

      <p
       className="
        text-red-500
        text-sm
        mb-4
       "
      >
       {
        errors.confirmPassword.message
       }
      </p>

     )

    }

    <button
     type="submit"
     disabled={loading}
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

      ? "Resetting..."

      : "Reset Password"

     }
    </button>

   </form>

   <p
    className="
     text-center
     mt-6
    "
   >

    Back to{" "}

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

  </div>
 );
}