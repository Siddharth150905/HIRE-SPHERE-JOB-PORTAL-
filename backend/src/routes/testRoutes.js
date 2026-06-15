const express=require("express");
const {protect,authorizeRoles}=require("../middleware/authMiddleware");
const router=express.Router();
router.get("/",protect,authorizeRoles("applicant"),(req,res)=>{
    res.json({
        sucess:true,
        message:"Test route working",    
    })
})

module.exports=router;