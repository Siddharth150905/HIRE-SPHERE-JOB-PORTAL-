const express=require("express");
const router=express.Router();
router.get(
 "/redis-test",
 async (req,res) => {

  const {
   redisClient
  } = require(
   "../config/redis"
  );

  await redisClient.set(
   "test",
   "hello"
  );

  const value =
   await redisClient.get(
    "test"
   );

  res.json({
   value
  });
 });


 module.exports=router;