import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';

const generateAccessToken = (payload) => {
    const options = {
        expiresIn: '24h',
    };
    return jwt.sign(
        {
            payload,
        },
        env.JWT_ACCESS_KEY,
        options,
    );
};

const generateRefreshToken = (payload) => {
    return jwt.sign(
        {
            payload,
        },
        env.JWT_REFRESH_KEY,
        { expiresIn: '30d' },
    );
};

export const token = {
    generateAccessToken,
    generateRefreshToken,
};
