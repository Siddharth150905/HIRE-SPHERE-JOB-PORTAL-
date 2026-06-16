require("dotenv").config();
const app=require("../src/app.js");
const connectDB=require("../src/config/db.js");
const {
 connectRedis
} = require(
"../src/config/redis.js"
);

const PORT =
 process.env.PORT || 5000;

const startServer =
 async () => {

  try {

   await connectDB();

   await connectRedis();

   app.listen(
    PORT,
    () => {

     console.log(
      `Server running on PORT ${PORT}`
     );

    }
   );

  } catch(error){

   console.error(
    "Startup Error:",
    error
   );

   process.exit(1);
  }
 };

startServer();