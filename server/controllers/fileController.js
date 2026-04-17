
const { cloudinary } = require("../utils/cloudinaryConfig");
require("dotenv").config();

// Extract Cloudinary public_id
const extractPublicId = (url) => {
  // Cloudinary URL example:
  // https://res.cloudinary.com/dgdfdf/image/upload/v173452/folder/image.jpg
  const parts = url.split("/");
  const file = parts.pop();        // image.jpg
  const folder = parts.pop();      // upload or your folder name

  const publicId = `${folder}/${file.split(".")[0]}`;
  return publicId;
};

// Upload Image
exports.uploadImages = async (file, documentType) => {
  if (!file) return;

  const result = await cloudinary.uploader.upload(file, {
    upload_preset: process.env.UPLOAD_PRESET,
    resource_type: "auto",
  });

  return {
    documentLink: result.secure_url,
    fileSize: result.bytes,
    documentType: documentType ?? "",
    fileType: result.format,
  };
};

// Delete Image (Cloudinary)
exports.deleteImage = async (url) => {
  try {
    const publicId = extractPublicId(url);

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return true;
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return false;
  }
};

