const express=require("express");
const {registerUser,loginUser,logoutUser,refreshAccessToken,forgotPassword,resetPassword,verifyEmail}=require("../controllers/authController.js");
const { resource } = require("../app.js");
const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser)
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/verify-email/:token", verifyEmail);
module.exports=router;
