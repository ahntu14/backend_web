import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import StatusCodes from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

//verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.accesstoken;
    if (token) {
        jwt.verify(token, env.JWT_ACCESS_KEY, (err, decodedToken) => {
            if (err) {
                throw new ApiError(StatusCodes.FORBIDDEN, 'Token is invalid');
            } else if (decodedToken.iat < 0) {
                throw new ApiError(StatusCodes.FORBIDDEN, 'Token expired');
            } else {
                req.headers.role = decodedToken.payload.role;
                req.headers.id = decodedToken.payload.id;
                next();
            }
        });
    } else {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authenticated');
    }
};

export const jwtMiddleware = {
    verifyToken,
};
