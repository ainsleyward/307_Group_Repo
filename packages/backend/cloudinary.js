import multer from 'multer';
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  cname: 'images.woofer.com'
});

// config dog storage
const dogStorage = new CloudinaryStorage({
  cloudinary: cloudinary, // use API secrets
  params: {
    folder: 'woofer/dogs',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 800, crop: 'fill' }],
  },
});

// config user storage
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'woofer/users',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 800, crop: 'fill' }],
  },
});

// Initialize multer with the storages
const uploadDog = multer({ storage: dogStorage });
const uploadUser = multer({ storage: userStorage });

export default { cloudinary, uploadDog, uploadUser}; // cloudinary export will be necessary for deletion