import { useState } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { forgotPassword } from "../../api/authApi";

export default function ForgotPasswordPage() {

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm();

 const [loading,setLoading] =
  useState(false);

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
    await forgotPassword(data);

   setSuccessMessage(
    response.data.message
   );

  } catch (error) {

   setErrorMessage(

    error.response?.data?.message ||

    "Failed to send reset link"
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
    Forgot Password
   </h2>

   <p
    className="
     text-gray-500
     mb-8
    "
   >
    Enter your email to receive
    a password reset link.
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
       {errors.email.message}
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
       ? "Sending..."
       : "Send Reset Link"
     }
    </button>

   </form>

   <p
    className="
     text-center
     mt-6
    "
   >
    Remember your password?{" "}

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