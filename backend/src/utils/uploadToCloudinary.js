const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

    uploadStream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;