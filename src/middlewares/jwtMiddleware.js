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
                throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not invalid');
            } else {
                req.headers.role = decodedToken.role;
                req.headers.id = decodedToken.id;
                req.headers.placeId = decodedToken.placeId;
                req.headers.email = decodedToken.email;
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
