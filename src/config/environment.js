import 'dotenv/config';

export const env = {
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    SHOP_TOKEN: process.env.SHOP_TOKEN,
    SHOP_ID: process.env.SHOP_ID,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_USER: process.env.DATABASE_USER,
    RETURN_URL: process.env.RETURN_URL,
};
