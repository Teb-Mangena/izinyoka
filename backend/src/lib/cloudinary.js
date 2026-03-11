import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";
import { ENV } from "../config/env.js";

// Configure cloudinary
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Multer in-memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFields = ["image"];
    if (!allowedFields.includes(file.fieldname)) {
      return cb(new Error(`Unexpected field: ${file.fieldname}`), false);
    }

    if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
      return cb(new Error('Only images allowed for "image" field'), false);
    }

    cb(null, true);
  },
});

// Upload helper
export const uploadFromBuffer = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "Izinyoka-Tracker-app",
        resource_type: options.resourceType || "auto",
        filename_override: options.fileName, 
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
