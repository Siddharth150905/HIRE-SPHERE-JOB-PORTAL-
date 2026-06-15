const { z } = require("zod");

const applyJobSchema =
z.object({

  coverLetter: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal("")),

});

module.exports = {
  applyJobSchema,
};