const express=require("express");
const router=express.Router();
const upload=require("../middleware/upload.js");
const {createCompany,getCompany,updateCompany}=require("../controllers/companyController.js");
const {protect,authorizeRoles}=require("../middleware/authMiddleware.js");
router.post('/',protect,authorizeRoles("recruiter"),upload.fields([
    {
        name:"logo",
        maxCount:1,
    }
]) ,
createCompany    
)

router.get(
 "/:id",
 getCompany
);

router.put(
  "/:id",

  protect,

  authorizeRoles(
    "recruiter"
  ),

  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
  ]),

  updateCompany
);


module.exports = router;