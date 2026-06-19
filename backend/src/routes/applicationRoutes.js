const express =
require("express");

const router =
express.Router();

const {
  applyToJob,
  getMyApplications,
  withdrawApplication,
  getSavedJobs,
  getRecruiterStats,
  getJobAnalytics,scheduleInterview,

} = require(
 "../controllers/applicationController.js"
);

const {
  getJobApplicants,
  getApplicationById,
  updateApplicationStatus,
} = require(
 "../controllers/applicationController.js"
);


const {
 saveJob,
 unsaveJob,
} = require(
 "../controllers/applicationController"
);

const {
 protect,
 authorizeRoles,
} = require(
 "../middleware/authMiddleware.js"
);

router.post(
 "/:jobId",
 protect,
 authorizeRoles(
   "applicant"
 ),
 applyToJob
);

router.get(
 "/my-applications",
 protect,
 authorizeRoles(
   "applicant"
 ),
 getMyApplications
);

router.delete(
 "/:id",
 protect,
 authorizeRoles(
   "applicant"
 ),
 withdrawApplication
);



router.post(
 "/:jobId/save",
 protect,
 authorizeRoles(
   "applicant"
 ),
 saveJob
);

router.delete(
 "/:jobId/save",
 protect,
 authorizeRoles(
   "applicant"
 ),
 unsaveJob
);


router.get(
 "/job/:jobId",
 protect,
 authorizeRoles(
   "recruiter"
 ),
 getJobApplicants
);

router.get(
 "/details/:id",
 protect,
 authorizeRoles(
   "recruiter"
 ),
 getApplicationById
);

router.patch(
 "/:id/status",
 protect,
 authorizeRoles(
   "recruiter"
 ),
 updateApplicationStatus
);

router.patch(
 "/:id/interview",
 protect,
 authorizeRoles(
   "recruiter"
 ),
 scheduleInterview
);

router.get(
 "/saved",
 protect,
 authorizeRoles(
   "applicant"
 ),
 getSavedJobs
);



router.get(
 "/recruiter/stats",
 protect,
 authorizeRoles(
   "recruiter"
 ),
 getRecruiterStats
);



router.get(
 "/:id/analytics",
 protect,
 authorizeRoles(
   "recruiter"
 ),
 getJobAnalytics
);

module.exports =
router;
