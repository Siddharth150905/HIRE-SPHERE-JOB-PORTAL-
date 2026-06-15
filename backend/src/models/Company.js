const mongoose = require("mongoose");

const companySchema =
new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    website: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    recruiter: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
mongoose.model(
  "Company",
  companySchema
);