const Job=require("../models/Job.js");
const User=require("../models/User.js");
const Company=require("../models/Company.js");
const {
  createJobSchema,
} =require("../validators/jobValidator.js");

// exports.createJob =
// async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     const validatedData =
//       createJobSchema.parse(
//         req.body
//       );

//     const recruiter =
//       await User.findById(
//         req.user.userId
//       );

//     if (!recruiter) {
//       return res.status(404).json({
//         success:false,
//         message:
//         "Recruiter not found",
//       });
//     }

//     if (!recruiter.company) {
//       return res.status(400).json({
//         success:false,
//         message:
//         "Create company first",
//       });
//     }

//     const job =
//       await Job.create({

//         ...validatedData,

//         company:
//           recruiter.company,

//         createdBy:
//           recruiter._id,
//       });

//     res.status(201).json({
//       success:true,
//       message:
//       "Job created successfully",
//       job,
//     });

//   } catch(error){
//     next(error);
//   }
// };

exports.createJob = async (req,res,next) => {
    console.log("BODY:", req.body);
  console.log("USER:", req.user);

 try {



  const validatedData =
   createJobSchema.parse(req.body);

  console.log("VALIDATED:", validatedData);

  const recruiter =
   await User.findById(
    req.user.userId
   );

  console.log("RECRUITER:", recruiter);

  if (!recruiter.company) {
   console.log("NO COMPANY");
  }

  const job =
   await Job.create({
    ...validatedData,
    company: recruiter.company,
    createdBy: recruiter._id,
   });

  console.log("JOB CREATED:", job);

  res.status(201).json({
   success:true,
   job,
  });

 } catch(error){

   if (error.name === "ZodError") {

  return res.status(400).json({
   success: false,
   errors: error.errors,
  });
 }

 next(error);
 }
};



exports.getMyJobs =
async (
  req,
  res,
  next
) => {

  try {

    const jobs =
      await Job.find({

        createdBy:
          req.user.userId,

      })
      .populate(
        "company",
        "name logo"
      )
      .sort({
        createdAt:-1
      });

    res.status(200).json({
      success:true,
      jobs,
    });

  } catch(error){
    next(error);
  }
};



exports.updateJob = async (
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
        success: false,
        message: "Job not found",
      });
    }

    if (
      job.createdBy.toString()
      !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "jobType",
      "experienceLevel",
    ];

    allowedFields.forEach(
      (field) => {
        if (
 field === "requirements" &&
 typeof req.body[field] === "string"
) {

 job.requirements =
  req.body[field]
   .split(",")
   .map(item => item.trim());

} else {

 job[field] =
  req.body[field];
}
      }
    );

    await job.save();

    res.status(200).json({
      success: true,
      message:
        "Job updated successfully",
      job,
    });

  } catch (error) {
    next(error);
  }
};      


exports.deleteJob =
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

    await Job.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success:true,
      message:
      "Job deleted successfully",
    });

  } catch(error){
    next(error);
  }
};


exports.updateJobStatus =
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
    const allowedStatuses = [
  "open",
  "closed",
];

if (
  !allowedStatuses.includes(
    req.body.status
  )
) {
  return res.status(400).json({
    success: false,
    message: "Invalid status",
  });
}   

    job.status =
      req.body.status;

    await job.save();

    res.status(200).json({
      success:true,
      message:
      "Status updated",
      job,
    });

  } catch(error){
    next(error);
  }
};



exports.getJobs = async (
  req,
  res,
  next
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const query = {
      status: "open",
    };

    // keyword search
    if (req.query.keyword) {

      query.$text = {
        $search:
          req.query.keyword,
      };
    }

    // location filter
    if (req.query.location) {

      query.location =
        req.query.location;
    }

    // jobType filter
    if (req.query.jobType) {

      query.jobType =
        req.query.jobType;
    }

    // experience filter
    if (
      req.query.experienceLevel
    ) {

      query.experienceLevel =
        req.query.experienceLevel;
    }

    // minimum salary
    if (req.query.salary) {

      query.salary = {
        $gte:
          Number(
            req.query.salary
          ),
      };
    }

    let mongoQuery =
      Job.find(query)
      .populate(
        "company",
        "name logo"
      );

    // sorting
    if (req.query.sort) {

      mongoQuery =
        mongoQuery.sort(
          req.query.sort
        );
    } else {

      mongoQuery =
        mongoQuery.sort({
          createdAt: -1,
        });
    }

    const totalJobs =
      await Job.countDocuments(
        query
      );

    const jobs =
      await mongoQuery
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      success: true,

      page,

      totalPages:
        Math.ceil(
          totalJobs / limit
        ),

      totalJobs,

      jobs,
    });

  } catch (error) {
    next(error);
  }
};


exports.getJobById =
async (
  req,
  res,
  next
) => {

  try {

    const job =
      await Job.findById(
        req.params.id,
        
      )
      .populate(
        "company"
      )
      .populate(
        "createdBy",
        "name email"
      );

    if (!job) {

      return res.status(404).json({
        success: false,
        message:
          "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    next(error);
  }
};