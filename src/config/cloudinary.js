// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from '../config/environment.js';

cloudinary.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_KEY,
    api_secret: env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg, png, jpeg'],
    params: {
        folder: 'New',
    },
});

export const uploadCloud = multer({ storage });

// export const uploadCloud = (folder) => {
//     const storage = () =>
//         new CloudinaryStorage({
//             cloudinary,
//             allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
//             folder: folder,
//         });

//     return multer({ storage });
// };
