const User=require("../models/User.js");
const uploadToCloudinary=require("../utils/uploadToCloudinary.js");
const sanitizeUser =require("../utils/sanitizeUser");

exports.updateApplicantProfile = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload profile image
    if (req.files?.profileImage) {
      const result =
        await uploadToCloudinary(
          req.files.profileImage[0].buffer,
          "job-portal/profiles"
        );

      user.profileImage = result.secure_url;
    }

    // Upload resume
    if (req.files?.resume) {
      const result =
        await uploadToCloudinary(
          req.files.resume[0].buffer,
          "job-portal/resumes"
        );

      user.resume = result.secure_url;
    }

    const {
      skills,
      experience,
      education,
      github,
      linkedin,
      portfolio,
    } = req.body;

    if (skills) {
      user.skills = skills.split(",");
    }

    user.experience = experience;
    user.education = education;
    user.github = github;
    user.linkedin = linkedin;
    user.portfolio = portfolio;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user:sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};


exports.updateRecruiterProfile = async (
  req,
  res,
  next
) => {
  try {

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Name
    if (req.body.name) {
      user.name = req.body.name;
    }

    // Update Profile Image
    if (req.files?.profileImage) {

      const result =
        await uploadToCloudinary(
          req.files.profileImage[0].buffer,
          "job-portal/profiles"
        );

      user.profileImage =
        result.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Recruiter profile updated successfully",
      user: sanitizeUser(user),
    });

  } catch (error) {
    next(error);
  }
};




exports.getProfile = async (
  req,
  res,
  next
) => {
  try {

    const user =
      await User.findById(
        req.user.userId
      )
      .populate("company");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });

  } catch (error) {
    next(error);
  }
};