const express =
 require("express");

const router =
 express.Router();

const {
 protect
} = require(
 "../middleware/authMiddleware"
);

const upload =
 require(
  "../middleware/upload.js"
 );

const {
 analyzeATS
} = require(
 "../controllers/aiController"
);

router.post(

 "/ats/:jobId",

 protect,

 upload.single(
  "resume"
 ),

 analyzeATS
);

module.exports =
 router;