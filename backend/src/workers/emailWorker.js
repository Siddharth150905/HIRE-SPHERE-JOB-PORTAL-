const {
 Worker
} = require("bullmq");

const sendEmail =
 require(
  "../utils/sendEmail1"
 );


const worker =
 new Worker(

  "emailQueue",

  async(job) => {

     const {
    to,
    subject,
    html,
   } = job.data;

   await sendEmail({

    to,
    subject,
    html,
   });

   console.log(
    "EMAIL JOB SENT",
   
   );

  },

  {
   connection:{
    host:"127.0.0.1",
    port:6379,
   },
  }

 );

worker.on(
 "completed",
 (job) => {

  console.log(
   `Job ${job.id} completed`
  );

 }
);

worker.on(
 "failed",
 (job,error) => {

  console.log(
   error
  );

 }
);