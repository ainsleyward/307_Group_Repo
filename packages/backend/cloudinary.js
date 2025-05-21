// Use effect to see if selected file has changes. if undefined, upload. Else, set up so it erases the currently selected one.
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
  shorten: true
});

// config dog storage
const imgStorage = new CloudinaryStorage({
  cloudinary: cloudinary, // uses API secrets
  params: {
    folder: 'woofer',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 800, crop: 'fill' }],
  },
});

// Initialize multer with the storages
const upload = multer({ storage: imgStorage});

export default { cloudinary, upload } // cloudinary export will be necessary for deletion