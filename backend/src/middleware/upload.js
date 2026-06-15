const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  if (file.fieldname === "profileImage") {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only jpg, png and webp images are allowed"
        )
      );
    }
  }

  if (file.fieldname === "resume") {

    if (file.mimetype !== "application/pdf") {
      return cb(
        new Error(
          "Only PDF resumes are allowed"
        )
      );
    }
  }

  if (file.fieldname === "logo") {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only image files allowed"
        )
      );
    }
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;