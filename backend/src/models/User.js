const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select:false,
    },

    role: {
      type: String,
      enum: ["applicant", "recruiter", "admin"],
      default: "applicant",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,

    emailVerificationToken: String,

  emailVerificationExpire: Date,



 profileImage: {
  type: String,
  default: "",
},

resume: String,

skills: [String],

experience: String,

education: String,

github: String,

linkedin: String,

portfolio: String,

company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  default:null
},

savedJobs: [
  {
    type:
      mongoose.Schema.Types.ObjectId,

    ref: "Job",
  },
],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateResetPasswordToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token and save to DB
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Expiry time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};


userSchema.methods.generateEmailVerificationToken =
function () {

    const verificationToken =
        crypto.randomBytes(32).toString("hex");

    this.emailVerificationToken =
        crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

    this.emailVerificationExpire =
        Date.now() + 24 * 60 * 60 * 1000;

    return verificationToken;
};

module.exports = mongoose.model("User", userSchema);

