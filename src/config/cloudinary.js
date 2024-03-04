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

export const storage = (folder) =>
    new CloudinaryStorage({
        cloudinary,
        allowedFormats: ['jpg', 'png', 'jpeg'],
        params: {
            folder: folder,
        },
    });

export const uploadCloud = multer({ storage });
