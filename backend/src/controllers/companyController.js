const Company=require("../models/Company.js");
const User=require("../models/User.js");
const uploadToCloudinary=require("../utils/uploadToCloudinary.js");
const {createCompanySchema}=require("../validators/companyValidation.js")

exports.createCompany =
async (
  req,
  res,
  next
) => {

  try {

  const bodyData = {
      name: req.body?.name || undefined,
      description: req.body?.description || undefined,
      website: req.body?.website || "",
    };

      const validatedData =
      createCompanySchema.parse(
        bodyData
      );

    const recruiter =
      await User.findById(
        req.user.userId
      );

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message:
          "Recruiter not found",
      });
    }

    if (recruiter.company) {
      return res.status(400).json({
        success: false,
        message:
          "Company already exists",
      });
    }

    let logoUrl = "";

    if (req.files?.logo) {

      const result =
        await uploadToCloudinary(
          req.files.logo[0].buffer,
          "job-portal/company-logos"
        );

      logoUrl =
        result.secure_url;
    }


    const company =
      await Company.create({

        name:
          validatedData.name,

        description:
          validatedData.description,

        website:
          validatedData.website,

        logo:
          logoUrl,

        recruiter:
          recruiter._id,
      });

    recruiter.company =
      company._id;

    await recruiter.save();

    res.status(201).json({
      success: true,
      message:
        "Company created successfully",
      company,
    });

  } catch (error) {
    next(error);
  }
};

exports.getCompany =
async (
  req,
  res,
  next
) => {

  try {

    const company =
      await Company
        .findById(
          req.params.id
        )
        .populate(
          "recruiter",
          "name email"
        );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });

  } catch (error) {
    next(error);
  }
};


exports.updateCompany =
async (
  req,
  res,
  next
) => {

  try {

    const company =
      await Company.findById(
        req.params.id
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    if (
      company.recruiter.toString()
      !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Unauthorized",
      });
    }

    if (req.body.name)
      company.name =
        req.body.name;

    if (req.body.description)
      company.description =
        req.body.description;

    if (req.body.website)
      company.website =
        req.body.website;

    if (req.files?.logo) {

      const result =
        await uploadToCloudinary(
          req.files.logo[0].buffer,
          "job-portal/company-logos"
        );

      company.logo =
        result.secure_url;
    }

    await company.save();

    res.status(200).json({
      success: true,
      message:
        "Company updated successfully",
      company,
    });

  } catch (error) {
    next(error);
  }
};