const { z } = require("zod");

const createJobSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(150),

  description: z
    .string()
    .min(20),

  requirements: z
    .array(z.string())
    .optional(),

  salary: z
    .number()
    .positive(),

  location: z
    .string()
    .min(2),

  jobType: z.enum([
    "remote",
    "onsite",
    "hybrid",
  ]),

  experienceLevel: z.enum([
    "intern",
    "junior",
    "mid",
    "senior",
  ]),
});

module.exports = {
  createJobSchema,
};