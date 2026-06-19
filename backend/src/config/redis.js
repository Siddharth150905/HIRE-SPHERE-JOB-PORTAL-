const { createClient } =
 require("redis");

const redisClient =
 createClient({

  url:
   process.env.REDIS_URL,
 });

redisClient.on(
 "error",
 (err) => {

  console.log(
   "Redis Error:",
   err
  );

 }
);

const connectRedis =
 async () => {

  try {

   await redisClient.connect();

   console.log(
    "Redis Connected"
   );

  } catch(error){

   console.error(
    error
   );
  }
 };



 const clearJobsCache =
 async () => {

  const keys =
   await redisClient.keys(
    "jobs:*"
   );

  if(keys.length){

   await redisClient.del(
    keys
   );
   console.log(
    "Jobs cache cleared"
   );
  }
 };

module.exports = {
 redisClient,
 connectRedis,
 clearJobsCache
};