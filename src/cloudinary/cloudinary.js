const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "protolylab",
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { folder: "protolylab" });
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadImage, deleteImage };
