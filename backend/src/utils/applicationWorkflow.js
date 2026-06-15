const WORKFLOW = {

  applied: [
    "under_review",
    "rejected",
  ],

  under_review: [
    "shortlisted",
    "rejected",
  ],

  shortlisted: [
    "interview_scheduled",
    "rejected",
  ],

  interview_scheduled: [
    "selected",
    "rejected",
  ],

  selected: [],

  rejected: [],
};

module.exports = WORKFLOW;  