const { z } = require("zod");

const applyJobSchema =
z.object({

  coverLetter: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal("")),

});

const scheduleInterviewSchema =
z.object({

  interviewDate:
   z.string().datetime(),

  interviewLink:
   z.string().url(),

  interviewNotes:
   z.string()
    .max(1000)
    .optional()
    .or(z.literal("")),

});

module.exports = {
  applyJobSchema,
  scheduleInterviewSchema,
};