import {
 useEffect,
 useState,
} from "react";

import {
 useParams,
 Link,
} from "react-router-dom";

import {
 verifyEmail,
} from "../../api/authApi";

export default function
VerifyEmailPage() {

 const { token } =
  useParams();

 const [
  loading,
  setLoading,
 ] = useState(true);

 const [
  success,
  setSuccess,
 ] = useState(false);

 const [
  message,
  setMessage,
 ] = useState("");

 useEffect(() => {

  const verify =
  async () => {

   try {

    const response =
     await verifyEmail(
      token
     );

    setSuccess(true);

    setMessage(
     response.data.message ||
     "Email verified successfully"
    );

   } catch (error) {

    setSuccess(false);

    setMessage(
     error.response?.data
      ?.message ||
     "Verification failed"
    );

   } finally {

    setLoading(false);
   }
  };

  verify();

 }, [token]);

 return (

  <div
   className="
    flex
    flex-col
    justify-center
    h-full
   "
  >

   <h2
    className="
     text-3xl
     font-bold
     mb-6
     text-center
    "
   >
    Email Verification
   </h2>

   {loading ? (

    <div
     className="
      bg-blue-100
      text-blue-700
      p-4
      rounded-lg
      text-center
     "
    >
     Verifying your email...
    </div>

   ) : (

    <>

     <div
      className={`
       p-4
       rounded-lg
       text-center
       mb-6
       ${
        success
        ? `
          bg-green-100
          text-green-700
         `
        : `
          bg-red-100
          text-red-700
         `
       }
      `}
     >
      {message}
     </div>

     <Link
      to="/login"
      className="
       w-full
       bg-blue-600
       text-white
       py-3
       rounded-xl
       font-semibold
       text-center
       hover:bg-blue-700
       transition
      "
     >
      Go To Login
     </Link>

    </>

   )}

  </div>
 );
}