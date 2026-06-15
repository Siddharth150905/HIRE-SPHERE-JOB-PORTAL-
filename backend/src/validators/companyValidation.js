const { z } = require("zod");

const createCompanySchema =
z.object({

  name: z
    .string()
    .min(2)
    .max(100),

  description: z
    .string()
    .min(10)
    .max(1000),

  website: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

});

module.exports = {
  createCompanySchema,
};