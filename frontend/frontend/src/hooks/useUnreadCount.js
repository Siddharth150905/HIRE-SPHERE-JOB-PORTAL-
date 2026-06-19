import {
 useQuery
}
from "@tanstack/react-query";

import {
 getUnreadCount
}
from "../api/notificationApi";

export const useUnreadCount =
() => {

 return useQuery({

  queryKey:[
   "unread-count"
  ],

  queryFn:
   getUnreadCount,

  refetchInterval:
   5000,
 });
};