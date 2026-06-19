import {
 useState
}
from "react";

import {
 useScheduleInterview
}
from "../../hooks/useScheduleInterview";

export default function
ScheduleInterviewModal({

 application,
 onClose,

}) {

 const {
  mutate,
  isPending,
 } =
 useScheduleInterview();

 const [
  interviewDate,

  setInterviewDate

 ] = useState("");

 const [
  interviewLink,

  setInterviewLink

 ] = useState("");

 const [
  interviewNotes,

  setInterviewNotes

 ] = useState("");

 const handleSubmit =
 (e) => {

  e.preventDefault();

  mutate(

   {

    applicationId:
     application._id,

    data: {

     interviewDate: new Date(
    interviewDate
   ).toISOString(),


     interviewLink,

     interviewNotes,

    },

   },

   {

    onSuccess: () => {

     onClose();

    },

   }

  );

 };

 return (

  <div
   className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
   "
  >

   <div
    className="
     bg-white
     rounded-xl
     p-6
     w-full
     max-w-lg
    "
   >

    <h2
     className="
      text-2xl
      font-bold
      mb-5
     "
    >
     Schedule Interview
    </h2>

    <form
     onSubmit={handleSubmit}
     className="
      space-y-4
     "
    >

     <div>

      <label>
       Interview Date
      </label>

      <input
       type="datetime-local"

       value={
        interviewDate
       }

       onChange={(e)=>

        setInterviewDate(
         e.target.value
        )

       }

       className="
        w-full
        border
        rounded-lg
        p-2
       "
       required
      />

     </div>

     <div>

      <label>
       Meeting Link
      </label>

      <input
       type="url"

       value={
        interviewLink
       }

       onChange={(e)=>

        setInterviewLink(
         e.target.value
        )

       }

       className="
        w-full
        border
        rounded-lg
        p-2
       "
       required
      />

     </div>

     <div>

      <label>
       Notes
      </label>

      <textarea

       value={
        interviewNotes
       }

       onChange={(e)=>

        setInterviewNotes(
         e.target.value
        )

       }

       className="
        w-full
        border
        rounded-lg
        p-2
       "

       rows="4"

      />

     </div>

     <div
      className="
       flex
       justify-end
       gap-3
      "
     >

      <button

       type="button"

       onClick={
        onClose
       }

       className="
        px-4
        py-2
        border
        rounded-lg
       "
      >
       Cancel
      </button>

      <button

       type="submit"

       disabled={
        isPending
       }

       className="
        bg-green-600
        text-white
        px-4
        py-2
        rounded-lg
       "
      >
       {
        isPending
        ? "Scheduling..."
        : "Schedule"
       }
      </button>

     </div>

    </form>

   </div>

  </div>

 );
}