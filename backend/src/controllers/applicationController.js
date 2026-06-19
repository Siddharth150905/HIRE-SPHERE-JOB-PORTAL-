const Application =
require("../models/Application.js");

const emailQueue =
require("../queues/emailQueue.js");

const Job =
require("../models/Job.js");

const User =
require("../models/User.js");
const Notification=require("../models/Notification.js");

const {
  applyJobSchema,
  scheduleInterviewSchema,
} = require(
  "../validators/applicationValidation.js"
);

const {redisClient}=require("../config/redis.js");

const WORKFLOW =
require(
 "../utils/applicationWorkflow.js"
);


const APPLICATION_STATUS=require("../constants/applicationStatus.js");

exports.applyToJob =
async (
  req,
  res,
  next
) => {


  try {

 

    const validatedData =
      applyJobSchema.parse(
        req.body
      );

    const applicant =
      await User.findById(
        req.user.userId
      );


    if (!applicant) {
      return res.status(404).json({
        success:false,
        message:
        "User not found",
      });
    }

    
if (applicant.role !== "applicant") {
  return res.status(403).json({
    success: false,
    message: "Only applicants can apply",
  });
}

    const job =
      await Job.findById(
        req.params.jobId
      ).populate(
  "createdBy",
  "email name"
 );;

    if (!job) {
      return res.status(404).json({
        success:false,
        message:
        "Job not found",
      });
    }


    if (
 job.createdBy._id.toString()
 === req.user.userId
) {
 return res.status(400).json({
   success:false,
   message:
   "Cannot apply to your own job",
 });
}

    if (
      job.status !== "open"
    ) {
      return res.status(400).json({
        success:false,
        message:
        "Job is closed",
      });
    }

    const existingApplication =
      await Application.findOne({
        applicant:
          applicant._id,

        job:
          job._id,
      });

    if (
      existingApplication
    ) {
      return res.status(400).json({
        success:false,
        message:
        "Already applied",
      });
    }

    if (!applicant.resume) {
  return res.status(400).json({
    success: false,
    message:
      "Please upload resume before applying",
  });
}

    const application =
      await Application.create({

        applicant:
          applicant._id,

        job:
          job._id,

        coverLetter:
          validatedData.coverLetter,

        resumeSnapshot:
          applicant.resume,
      });

    await Job.findByIdAndUpdate(
  job._id,
  {
    $inc: {
      applicationsCount: 1,
    },
  }
);

    await job.save();

    await emailQueue.add(

 "applicationEmail",

 {

  to:"sid363268@gmail.com",
  //  job.createdBy.email,

  subject:
   "New Job Application",

  html:
   `
   <h2>
    New Application
   </h2>

   <p>
    Someone applied for
    ${job.title}
   </p>
   `,
 }
);
    await redisClient.del(
 "trending-jobs"
);


const {
 getSocketId
} = require(
 "../socket/socketManager"
);

const io =
 req.app.get("io");

const recruiterSocketId =
 getSocketId(
  job.createdBy._id.toString()
 );

if(recruiterSocketId){

  console.log(
 "Recruiter ID:",
 job.createdBy._id.toString()
);

console.log(
 "Recruiter Socket:",
 recruiterSocketId
);

 io.to(
  recruiterSocketId
 ).emit(
  "new_application",
  {
   jobId: job._id,
   jobTitle: job.title,
   applicantId:
    req.user.userId,
   message:
    `New application for ${job.title}`,
  }
 );

}

const Notification =
 require(
  "../models/Notification"
 );

await Notification.create({

 user:
  job.createdBy._id,

 title:
  "New Application",

 message:
  `${applicant.name} applied for ${job.title}`,

 type:
  "application",
});

    res.status(201).json({
      success:true,
      message:
      "Application submitted",
      application,
    });

  } catch(error){
    next(error);
  }
};


exports.getMyApplications =
async (
  req,
  res,
  next
) => {

  try {

    const applications =
      await Application.find({

        applicant:
          req.user.userId,

      })

      .populate({
        path:"job",

        populate:{
          path:"company",
          select:
          "name logo",
        },
      })

      .sort({
        createdAt:-1,
      });

    res.status(200).json({
      success:true,
      applications,
    });

  } catch(error){
    next(error);
  }
};


exports.withdrawApplication =
async (
  req,
  res,
  next
) => {

  try {

    const application =
      await Application.findById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success:false,
        message:
        "Application not found",
      });
    }

    if (
      application
      .applicant
      .toString()
      !== req.user.userId
    ) {
      return res.status(403).json({
        success:false,
        message:
        "Unauthorized",
      });
    }

    if (
 application.status !== "applied"
) {

 return res.status(400).json({
  success:false,
  message:
   "Cannot withdraw application at this stage",
 });

}

    const job =
      await Job.findById(
        application.job
      );

    if (
      job &&
      job.applicationsCount > 0
    ) {
      await Job.findByIdAndUpdate(
  application.job,
  {
    $inc: {
      applicationsCount: -1,
    },
  }
);

      await job.save();
    }

    await application.deleteOne();

    res.status(200).json({
      success:true,
      message:
      "Application withdrawn",
    });

  } catch(error){
    next(error);
  }
};



exports.saveJob =
async (
  req,
  res,
  next
) => {

  try {

    const user =
      await User.findById(
        req.user.userId
      );

    const job =
      await Job.findById(
        req.params.jobId
      );

    if (!job) {
      return res.status(404).json({
        success:false,
        message:
        "Job not found",
      });
    }

 const alreadySaved =
user.savedJobs.some(
  (savedJobId) =>
    savedJobId.toString() ===
    job._id.toString()
);

    if (alreadySaved) {
      return res.status(400).json({
        success:false,
        message:
        "Job already saved",
      });
    }

    user.savedJobs.push(
      job._id
    );

    await user.save();

    res.status(200).json({
      success:true,
      message:
      "Job saved",
    });

  } catch(error){
    next(error);
  }
};



exports.unsaveJob =
async (
  req,
  res,
  next
) => {

  try {

    const user =
      await User.findById(
        req.user.userId
      );

    user.savedJobs =
      user.savedJobs.filter(
        (jobId) =>
          jobId.toString()
          !==
          req.params.jobId
      );

    await user.save();

    res.status(200).json({
      success:true,
      message:
      "Job removed from saved jobs",
    });

  } catch(error){
    next(error);
  }
};



exports.getJobApplicants =
async (
  req,
  res,
  next
) => {

  try {

    const job =
      await Job.findById(
        req.params.jobId
      );

    if (!job) {
      return res.status(404).json({
        success:false,
        message:
        "Job not found",
      });
    }

    if (
      job.createdBy.toString()
      !== req.user.userId
    ) {
      return res.status(403).json({
        success:false,
        message:
        "Unauthorized",
      });
    }

    const applications =
      await Application.find({
        job: job._id,
      })

      .populate(
        "applicant",
        `
        name
        email
        resume
        skills
        experience
        `
      )

      .sort({
        createdAt:-1,
      });

    res.status(200).json({
      success:true,
      count:
        applications.length,
      applications,
    });

  } catch(error){
    next(error);
  }
};



exports.getApplicationById =
async (
  req,
  res,
  next
) => {

  try {

    const application =
      await Application
      .findById(
        req.params.id
      )
      .populate(
        "applicant",
         `
  firstName
  lastName
  email
  profileImage
  resume
  skills
  experience
  education
  portfolioLinks
  github
  linkedin
  `
      )
      .populate(
        {

        path: "job",
          populate:{
    path:"company",
    select:
    "name logo website",
  },
        }

      );

    if (!application) {
      return res.status(404).json({
        success:false,
        message:
        "Application not found",
      });
    }

    if (
      application.job.createdBy
      .toString()
      !== req.user.userId
    ) {
      return res.status(403).json({
        success:false,
        message:
        "Unauthorized",
      });
    }

    res.status(200).json({
      success:true,
      application,
    });

  } catch(error){
    next(error);
  }
};


exports.updateApplicationStatus =
async (
  req,
  res,
  next
) => {

  try {

    const application =
      await Application
      .findById(
        req.params.id
      )
      .populate("job")
       .populate(
  "applicant",
  "name email"
 );

    if (!application) {
      return res.status(404).json({
        success:false,
        message:
        "Application not found",
      });
    }

    if (
      application.job.createdBy
      .toString()
      !== req.user.userId
    ) {
      return res.status(403).json({
        success:false,
        message:
        "Unauthorized",
      });
    }

    const allowedStatuses =
      Object.values(
        APPLICATION_STATUS
      );

    if (
      !allowedStatuses.includes(
        req.body.status
      )
    ) {
      return res.status(400).json({
        success:false,
        message:
        "Invalid status",
      });
    }



    const currentStatus =
application.status;

const nextStatus =
req.body.status;

const allowedNextStates =
WORKFLOW[currentStatus];

if (
 !allowedNextStates.includes(
   nextStatus
 )
) {
 return res.status(400).json({
   success:false,
   message:
   `Cannot move from ${currentStatus} to ${nextStatus}`
 });
}

    application.status =
      req.body.status;

    await application.save();

    console.log("saved");

    const {
 getSocketId
} = require(
 "../socket/socketManager"
);

const io =
 req.app.get("io");

const applicantSocketId =
 getSocketId(
  application.applicant._id.toString()
 );

if(applicantSocketId){

  
 io.to(
  applicantSocketId
 ).emit(
  "application_status_updated",
  {
   applicationId:
    application._id,

   jobTitle:
    application.job.title,

   status:
    application.status,

   message:
    `Application moved to ${application.status}`,
  }
 );

}

await Notification.create({

 user:
  application.applicant._id,

 title:
  "Application Updated",

 message:
  `Your application for ${application.job.title} is now ${application.status}`,

 type:
  "status_update",
});

console.log("notification created");
await emailQueue.add(
 "statusUpdateEmail",
 {
  to:
   application.applicant.email,

  subject:
   `Application Status Updated - ${application.job.title}`,

  html:
   `
   <h2>Hello ${application.applicant.name}</h2>

   <p>
    Your application for
    <strong>${application.job.title}</strong>
    has been updated.
   </p>

   <p>
    Current Status:
    <strong>${application.status}</strong>
   </p>

   <p>
    Thank you for using our platform.
   </p>
   `,
 }
);

console.log("email queued");

    res.status(200).json({
      success:true,
      message:
      "Status updated",
      application,
    });

  } catch(error){
    console.error(error);
    next(error);
  }
};



exports.scheduleInterview =
async (
 req,
 res,
 next
) => {

 try {

  const validatedData =
   scheduleInterviewSchema.parse(
    req.body
   );

  const application =
   await Application
    .findById(
     req.params.id
    )
    .populate("job")
    .populate(
     "applicant",
     "name email"
    );

  if(!application){

   return res.status(404).json({

    success:false,

    message:
     "Application not found",
   });
  }

  if(
   application.job.createdBy
   .toString()
   !== req.user.userId
  ){

   return res.status(403).json({

    success:false,

    message:
     "Unauthorized",
   });
  }

  application.status =
   "interview_scheduled";

  application.interviewDate =
   validatedData.interviewDate;

  application.interviewLink =
   validatedData.interviewLink;

  application.interviewNotes =
   validatedData.interviewNotes || "";

  await application.save();

  const {
   getSocketId
  } = require(
   "../socket/socketManager"
  );

  const io =
   req.app.get("io");

  const applicantSocketId =
   getSocketId(
    application.applicant._id.toString()
   );

  if(applicantSocketId){

   io.to(
    applicantSocketId
   ).emit(
    "interview_scheduled",
    {

     applicationId:
      application._id,

     jobTitle:
      application.job.title,

     interviewDate:
      application.interviewDate,

     interviewLink:
      application.interviewLink,

     message:
      `Interview scheduled for ${application.job.title}`,
    }
   );
  }

  await Notification.create({

 user:
  application.applicant._id,

 title:
  "Interview Scheduled",

 message:
  `Interview scheduled for ${application.job.title}`,

 type:
  "interview",
});

  await emailQueue.add(

   "interviewEmail",

   {

    to:
     application.applicant.email,

    subject:
     `Interview Scheduled - ${application.job.title}`,

    html:
     `
     <h2>
      Interview Scheduled
     </h2>

     <p>
      Hello ${application.applicant.name}
     </p>

     <p>
      Your interview has been scheduled for:
     </p>

     <p>
      <strong>
       ${application.job.title}
      </strong>
     </p>

     <p>
      Date:
      ${new Date(
       application.interviewDate
      ).toLocaleString()}
     </p>

     <p>
      Meeting Link:
      ${application.interviewLink}
     </p>

     <p>
      Notes:
      ${application.interviewNotes}
     </p>
     `,
   }
  );

  res.status(200).json({

   success:true,

   message:
    "Interview scheduled successfully",

   application,
  });

 } catch(error){

  next(error);
 }
};


exports.getSavedJobs =
async (
  req,
  res,
  next
) => {

  try {

    const user =
      await User.findById(
        req.user.userId
      )
      .populate({
        path:"savedJobs",

        populate:{
          path:"company",
          select:
          "name logo",
        },
      });

    res.status(200).json({
      success:true,
      savedJobs:
        user.savedJobs,
    });

  } catch(error){
    next(error);
  }
};



exports.getRecruiterStats =
async (
  req,
  res,
  next
) => {

  try {

    const totalJobs =
      await Job.countDocuments({
        createdBy:
          req.user.userId,
      });

    const jobs =
      await Job.find({
        createdBy:
          req.user.userId,
      }).select("_id");

    const jobIds =
      jobs.map(
        (job) => job._id
      );

    const totalApplications =
      await Application
      .countDocuments({
        job:{
          $in:jobIds,
        },
      });

      const openJobs =
 await Job.countDocuments({
  createdBy:req.user.userId,
  status:"open",
 });

const closedJobs =
 await Job.countDocuments({
  createdBy:req.user.userId,
  status:"closed",
 });

    res.status(200).json({
      success:true,

      stats:{
        totalJobs,
        totalApplications,
        openJobs,
        closedJobs
      },
    });

  } catch(error){
    next(error);
  }
};


exports.getJobAnalytics =
async (
 req,
 res,
 next
) => {

 try {

  const job =
   await Job.findById(
    req.params.id
   );

  if (!job) {

   return res.status(404).json({

    success:false,

    message:
     "Job not found",
   });
  }

  if (
   job.createdBy.toString()
   !== req.user.userId
  ) {

   return res.status(403).json({

    success:false,

    message:
     "Unauthorized",
   });
  }

  const applications =
   await Application.find({

    job: job._id,

   }).select("status");

  const analytics = {

   applications:
    applications.length,

   applied: 0,

   under_review: 0,

   shortlisted: 0,

   interview_scheduled: 0,

   selected: 0,

   rejected: 0,
  };

  applications.forEach(
   (application) => {

    analytics[
     application.status
    ]++;
   }
  );

  res.status(200).json({

   success:true,

   analytics: {

    ...analytics,

    status:
     job.status,
   },
  });

 } catch(error){

  next(error);
 }
};