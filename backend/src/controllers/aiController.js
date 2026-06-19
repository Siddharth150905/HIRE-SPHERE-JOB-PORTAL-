const Job = require("../models/Job");

const {
  analyzeResume,
} = require("../services/atsService");

exports.analyzeATS = async (
  req,
  res,
  next
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const job = await Job.findById(
      req.params.jobId
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const analysis =
      await analyzeResume(
        req.file.buffer,
        job
      );

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.error(
      "ATS Analysis Error:",
      error
    );

    next(error);
  }
};