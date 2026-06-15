const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema(
  {
    applicant: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    job: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Job",

      required: true,
    },

    status: {
      type: String,

      enum: [
        "applied",
        "under_review",
        "shortlisted",
        "interview_scheduled",
        "selected",
        "rejected",
      ],

      default: "applied",
    },

    resumeSnapshot: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);



applicationSchema.index(
  {
    applicant: 1,
    job: 1,
  },
  {
    unique: true,
  }
);


applicationSchema.index({
  applicant: 1,
  createdAt: -1,
});

applicationSchema.index({
  job: 1,
  createdAt: -1,
});

applicationSchema.index({
  status: 1,
});



module.exports =
mongoose.model(
  "Application",
  applicationSchema
);