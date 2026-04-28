const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Salt Products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    // public_id: Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

module.exports = { upload };
