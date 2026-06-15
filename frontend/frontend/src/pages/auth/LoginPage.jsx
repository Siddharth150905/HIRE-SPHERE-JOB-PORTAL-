import {
 useState
} from "react";

import {
 Navigate,
 Link,
 useNavigate
} from "react-router-dom";

import {
 useForm
} from "react-hook-form";

import {
 loginUser
} from "../../api/authApi";

import {
 useAuth
} from "../../context/AuthContext";

export default function
LoginPage(){

 const navigate =
  useNavigate();

 const {
  user,
  login
 } = useAuth();

 const {
  register,
  handleSubmit,
  formState:{
   errors
  }
 } = useForm();

 const [
  loading,
  setLoading
 ] = useState(false);

 const [
  errorMessage,
  setErrorMessage
 ] = useState("");

 if(user){

  return (
   <Navigate
    to={`/${user.role}/dashboard`}
    replace
   />
  );
 }

 const onSubmit =
 async (data)=>{

  try{

   setLoading(true);

   setErrorMessage("");

   const response =
    await loginUser(data);

   login(
    response.data.user,
    response.data.accessToken
   );

   const role =
    response.data.user.role;

   navigate(
    `/${role}/dashboard`
   );

  }catch(error){

   setErrorMessage(

    error.response?.data
     ?.message ||

    "Login failed"

   );

  }finally{

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
    Login
   </h2>

   <p
    className="
     text-gray-500
     mb-6
    "
   >
    Welcome back
   </p>

   <form
    onSubmit={
     handleSubmit(
      onSubmit
     )
    }
    className="
     space-y-4
    "
   >

    <div>

     <input

      type="email"

      placeholder="Email"

      className="
       w-full
       border
       rounded-lg
       p-3
      "

      {...register(
       "email",
       {
        required:
         "Email is required",

        pattern:{
         value:
          /^\S+@\S+\.\S+$/,

         message:
          "Invalid email",
        },
       }
      )}
     />

     {
      errors.email && (

       <p
        className="
         text-red-500
         text-sm
        "
       >
        {
         errors.email.message
        }
       </p>

      )
     }

    </div>

    <div>

     <input

      type="password"

      placeholder="Password"

      className="
       w-full
       border
       rounded-lg
       p-3
      "

      {...register(
       "password",
       {
        required:
         "Password is required",
       }
      )}
     />

    </div>

    <div
     className="
      flex
      justify-end
     "
    >

     <Link
      to="/forgot-password"
      className="
       text-blue-600
       text-sm
      "
     >
      Forgot Password?
     </Link>

    </div>

    {

     errorMessage && (

      <p
       className="
        text-red-500
        text-sm
       "
      >
       {errorMessage}
      </p>

     )

    }

    <button

     disabled={loading}

     className="
      w-full
      bg-blue-600
      text-white
      py-3
      rounded-lg
      hover:bg-blue-700
     "
    >

     {
      loading
      ?
      "Logging In..."
      :
      "Login"
     }

    </button>

   </form>

   <p
    className="
     mt-6
     text-center
    "
   >

    Don't have an account?

    {" "}

    <Link
     to="/register"
     className="
      text-blue-600
      font-medium
     "
    >
     Register
    </Link>

   </p>

  </div>
 );
}