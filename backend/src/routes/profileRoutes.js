const express=require("express");
const router=express.Router();
const upload=require("../middleware/upload.js");
const {updateApplicantProfile,updateRecruiterProfile,getProfile}=require("../controllers/profileController.js");
const {protect,authorizeRoles}=require("../middleware/authMiddleware.js")

router.put(
  "/applicant",
  protect,
authorizeRoles("applicant")
  ,upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateApplicantProfile
);


router.put(
  "/recruiter",
  protect,
  authorizeRoles("recruiter"),
upload.fields([
  {
    name: "profileImage",
    maxCount: 1,
  },
]),
  updateRecruiterProfile
);

router.get(
  "/me",
  protect,
  getProfile
);

module.exports = router;    