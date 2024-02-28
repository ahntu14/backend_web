import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/userService.js';
import ApiError from '../utils/ApiError.js';

//Update user's information
const UpdateInfo = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Missing email address');
        } else {
            const result = await userService.UpdateInfo(email);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

export const userController = {
    UpdateInfo,
};
