const express =require("express");
const router=express.Router();
const{ createJob,
  updateJob,
  deleteJob,
  updateJobStatus,
  getMyJobs, getJobs,
  getJobById,getTrendingJobs}=require("../controllers/jobController.js");
  const {protect,authorizeRoles}=require("../middleware/authMiddleware.js");


router.post(
 "/",
 protect,
 authorizeRoles("recruiter"),
 createJob
);


router.get(
 "/",
 getJobs
);

router.get(
 "/trending",
 getTrendingJobs
);

router.get(
 "/my-jobs",
 protect,
 authorizeRoles("recruiter"),
 getMyJobs
);


router.get(
 "/:id",
 getJobById
);

router.put(
 "/:id",
 protect,
 authorizeRoles("recruiter"),
 updateJob
);

router.delete(
 "/:id",
 protect,
 authorizeRoles("recruiter"),
 deleteJob
);

router.patch( 
 "/:id/status",
 protect,
 authorizeRoles("recruiter"),
 updateJobStatus
);

module.exports=router;