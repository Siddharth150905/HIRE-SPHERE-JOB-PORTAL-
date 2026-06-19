import { useEffect } from "react";

import {
useMutation,
useQueryClient,
} from "@tanstack/react-query";

import {
useNotifications
} from "../../hooks/useNotifications";

import {
markAllAsRead
} from "../../api/notificationApi";

export default function Notifications() {

const {
data,
isLoading,
} = useNotifications();

const queryClient =
useQueryClient();

const markAllMutation =
useMutation({

mutationFn:
markAllAsRead,

onSuccess: () => {


queryClient.invalidateQueries({
 queryKey:["notifications"],
});

queryClient.invalidateQueries({
 queryKey:["unread-count"],
});


},
});

useEffect(() => {

markAllMutation.mutate();

}, []);

if(isLoading){

return (

   <h2>
    Loading...
   </h2>
  );
 }

const notifications =
data?.data?.notifications
|| [];

return (

  <div
   className="
    bg-white
    p-8
    rounded-xl
    shadow
   "
  >

   <h1
    className="
     text-2xl
     font-bold
     mb-6
    "
   >
    Notifications
   </h1>

{

notifications.length === 0 ? (

 <p
  className="
   text-gray-500
  "
 >
  No notifications yet.
 </p>

) : (

 notifications.map(
  (notification) => (

   <div

    key={
     notification._id
    }

    className={`
     border-b
     py-4
     ${
      !notification.isRead
       ? "bg-blue-50"
       : ""
     }
    `}
   >

    <h3
     className="
      font-semibold
     "
    >
     {
      notification.title
     }
    </h3>

    <p>
     {
      notification.message
     }
    </p>

    <p
     className="
      text-sm
      text-gray-500
     "
    >
     {
      new Date(
       notification.createdAt
      ).toLocaleString()
     }
    </p>

   </div>

  )
 )

)


}

  </div>
 );
}
