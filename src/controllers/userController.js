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

// Add products to cart
const ToCart = async (req, res, next) => {
    try {
        let id = req.headers.id;
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            throw new ApiError(StatusCodes.NO_CONTENT, 'Missing arguments');
        } else {
            const result = await userService.ToCart(productId, quantity, id);
            res.status(StatusCodes.CREATED).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Get all products from cart by user id
const GetCart = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        if (!userId) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Missing id');
        } else {
            const allCarts = await userService.GetCart(userId);
            res.status(StatusCodes.OK).json(allCarts);
            next();
        }
    } catch (error) {
        next(error);
    }
};

export const userController = {
    UpdateInfo,
    GetInfo,
    ToCart,
    GetCart,
};
