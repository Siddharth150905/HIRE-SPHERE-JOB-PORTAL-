import axiosInstance
from "./axios";

export const getNotifications =
() => {

 return axiosInstance.get(
  "/notifications"
 );
};

export const getUnreadCount =
() => {

 return axiosInstance.get(
  "/notifications/unread-count"
 );
};

export const markAsRead =
(id) => {

 return axiosInstance.patch(
  `/notifications/${id}/read`
 );
};

export const markAllAsRead =
() => {

 return axiosInstance.patch(
  "/notifications/read-all"
 );
};