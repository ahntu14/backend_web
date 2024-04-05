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
                if (err.name === 'TokenExpiredError') {
                    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token đã hết hạn' });
                } else {
                    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Token không hợp lệ' });
                }
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
