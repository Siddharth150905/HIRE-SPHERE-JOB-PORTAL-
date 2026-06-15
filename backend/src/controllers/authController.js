const bcrypt=require("bcryptjs");
const User=require("../models/User.js");
const {registerSchema}=require("../validators/authValidator.js");
const { loginSchema } = require("../validators/authValidator");
const { forgotPasswordSchema } =require("../validators/authValidator");
const { resetPasswordSchema } =require("../validators/authValidator");
const jwt =require("jsonwebtoken")
const {generateAccessToken ,generateRefreshToken,}=require("../utils/generateToken.js");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.registerUser=async (req,res,next)=>{
try{
    const validatedData=registerSchema.parse(req.body);
    const {name,email,password,role}=validatedData;
    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
   const user = new User({
  name,
  email,
  password: hashedPassword,
  role,
});



try{

  const verificationToken =
  user.generateEmailVerificationToken();
  
  await user.save();
  
  
  const verificationUrl =
  `http://localhost:5173/verify-email/${verificationToken}`;
  
  const message = `
  Welcome to Job Portal
  
  Verify your email:
  ${verificationUrl}
  `;
  
  await sendEmail({
    email: user.email,
    subject: "Verify Email",
    message,
  });
  
  
  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
  
  res.status(201).json({
    success: true,
    message: "User registered successfully.Verify your email.",
    user: userResponse,
  });
}catch(error){
  // If email fails, we don't want a "ghost" user who can't verify
  await User.findByIdAndDelete(user._id); 
  
  return res.status(500).json({
    success: false,
    message: "Registration failed: Could not send verification email. Please try again.",
  });

}


}catch(error){
    next(error);    
}
}


exports.loginUser=async(req,res,next)=>{
    try{
      const validatedData = loginSchema.parse(req.body);  
  const { email, password } = validatedData;
        const user= await User.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            });
            

        }

        if (!user.isVerified) {
  return res.status(403).json({
    success: false,
    message: "Please verify your email first",
  });
}

        //compare password

         const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }


        const accessToken=generateAccessToken(user._id,user.role);
        const refreshToken=generateRefreshToken(user._id);  
        
        const cookieOptions={
            httpOnly:true,
            secure:false,
            sameSite:'strict',
        };
        res.cookie("refreshToken",refreshToken,cookieOptions);


        const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

        res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: userResponse,
    });
    }
    catch(error){
        next(error);
    }
}


exports.logoutUser = async (req, res,next) => {
  try{

    res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
  catch(error){
    next(error);
  }
};


exports.refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = generateAccessToken(
      decoded.userId,
      decoded.role
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};


exports.forgotPassword = async (req, res, next) => {
  try {
   const { email } =forgotPasswordSchema.parse(req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate token
    const resetToken =
      user.generateResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `
You requested password reset.

Reset your password using this link:

${resetUrl}

If you did not request this, ignore this email.
`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message,
      });

      res.status(200).json({
        success: true,
        message: "Reset email sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: "Email could not be sent",
      });
    }
  } catch (error) {
    next(error);
  }
};



exports.resetPassword = async (req, res, next) => {
  try {
    // Hash token from URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find valid token
    const user = await User.findOne({
      resetPasswordToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash new password

const { password } =resetPasswordSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(
     password,
      10
    );

    user.password = hashedPassword;

    // Remove reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};





// exports.verifyEmail = async (req, res, next) => {
//   try {

//     console.log("VERIFY CALLED");
//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     const user = await User.findOne({
//       emailVerificationToken: hashedToken,
//       emailVerificationExpire: { $gt: Date.now() },
//     });
// console.log("USER FOUND:", !!user);
   
// //untested

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired token",
//       });
//     }


//      //untested
//     if (user.isVerified) {
//   return res.status(400).json({
//     success: false,
//     message: "Email already verified",
//   });
// } 

//     user.isVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpire = undefined;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Email verified successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };



exports.verifyEmail = async (req, res, next) => {
  try {

    console.log("TOKEN RECEIVED:");
    console.log(req.params.token);

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    console.log("HASHED TOKEN:");
    console.log(hashedToken);

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: {
        $gt: Date.now(),
      },
    });

    console.log("USER:");
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    user.isVerified = true;

    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};