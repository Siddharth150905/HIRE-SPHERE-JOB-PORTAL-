const Application =
require("../models/Application.js");

const Job =
require("../models/Job.js");

const User =
require("../models/User.js");

const {
  applyJobSchema,
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
  job.createdBy.toString()
 );

if(recruiterSocketId){

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
      .populate("job");

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

    const {
 getSocketId
} = require(
 "../socket/socketManager"
);

const io =
 req.app.get("io");

const applicantSocketId =
 getSocketId(
  application.applicant.toString()
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

    res.status(200).json({
      success:true,
      message:
      "Status updated",
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