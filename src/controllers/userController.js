import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/userService.js';
import ApiError from '../utils/ApiError.js';

//Update user's information
const UpdateInfo = async (req, res, next) => {
    try {
        const id = req.headers.id;
        const content = req.body;
        const result = await userService.UpdateInfo(id, content);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

// Get user's information
const GetInfo = async (req, res, next) => {
    try {
        const id = req.headers.id;
        const result = await userService.GetInfo(id);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

export const userController = {
    UpdateInfo,
    GetInfo,
};
