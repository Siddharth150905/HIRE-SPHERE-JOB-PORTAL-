const Notification =
 require(
  "../models/Notification"
 );

exports.getNotifications =
 async (
  req,
  res,
  next
 ) => {

  try {

   const notifications =
    await Notification
     .find({

      user:
       req.user.userId,

     })
     .sort({
      createdAt:-1,
     });

   res.status(200).json({

    success:true,

    notifications,
   });

  } catch(error){

   next(error);
  }
 };



 exports.markAsRead =
async (
 req,
 res,
 next
) => {

 try {

  const notification =
   await Notification.findOneAndUpdate(

    {
     _id:
      req.params.id,

     user:
      req.user.userId,
    },

    {
     isRead:true,
    },

    {
     new:true,
    }
   );

  if(!notification){

   return res.status(404).json({

    success:false,

    message:
     "Notification not found",
   });
  }

  res.status(200).json({

   success:true,

   notification,
  });

 } catch(error){

  next(error);
 }
};

exports.markAllAsRead =
async (
 req,
 res,
 next
) => {

 try {

  await Notification.updateMany(

   {
    user:
     req.user.userId,

    isRead:false,
   },

   {
    isRead:true,
   }
  );

  res.status(200).json({

   success:true,

   message:
    "All notifications marked as read",
  });

 } catch(error){

  next(error);
 }
};


exports.getUnreadCount =
async (
 req,
 res,
 next
) => {

 try {

  const count =
   await Notification.countDocuments({

    user:
     req.user.userId,

    isRead:false,
   });

  res.status(200).json({

   success:true,

   count,
  });

 } catch(error){

  next(error);
 }
};