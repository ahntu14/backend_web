import 'dotenv/config';

export const env = {
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
};
