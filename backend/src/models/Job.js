const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    applicationsCount: {
  type: Number,
  default: 0,
},
    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: [
        "remote",
        "onsite",
        "hybrid",
      ],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: [
        "intern",
        "junior",
        "mid",
        "senior",
      ],
      required: true,
    },

    company: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Company",

      required: true,
    },

    createdBy: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    status: {
  type: String,
  enum: [
    "open",
    "closed",
  ],
  default: "open",
},  
  },
  {
    timestamps: true,
  }
);

// --- MAXIMUM OPTIMIZATION INDEXES ---

// 1. Text Index for Global Keyword Search
jobSchema.index({ title: "text", description: "text" });

// 2. Compound Status-Filters (Prevents closed/draft jobs from leaking into public feeds)
jobSchema.index({ status: 1, location: 1 });
jobSchema.index({ status: 1, salary: 1 });

// 3. Company Dashboard Index (Fetch all company jobs, sorted newest first)
jobSchema.index({ company: 1, createdAt: -1 });

// 4. Individual Recruiter Dashboard Index (Fetch my jobs, sorted newest first)
jobSchema.index({ createdBy: 1, createdAt: -1 });

jobSchema.index({
 status:1,
 applicationsCount:-1,
});

jobSchema.index({
  status: 1,
  jobType: 1,
  experienceLevel: 1,
});

module.exports =
mongoose.model(
  "Job",
  jobSchema
);