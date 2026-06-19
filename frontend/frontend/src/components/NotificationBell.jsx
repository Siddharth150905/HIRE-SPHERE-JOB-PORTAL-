import {
 Bell
} from "lucide-react";

import {
 useNavigate
} from "react-router-dom";

import {
 useUnreadCount
} from "../hooks/useUnreadCount";

export default function
NotificationBell() {

 const navigate =
  useNavigate();

 const {
  data,
  isLoading,
 } =
  useUnreadCount();

 const count =
  data?.data?.count || 0;

 return (

  <div

 

   className="
    relative
    cursor-pointer
   "
  >

   <Bell size={22} />

   {

    !isLoading &&

    count > 0 && (

     <span
      className="
       absolute
       -top-2
       -right-2
       bg-red-500
       text-white
       text-xs
       rounded-full
       min-w-[18px]
       h-[18px]
       flex
       items-center
       justify-center
       px-1
      "
     >
      {count}
     </span>

    )
   }

  </div>
 );
}