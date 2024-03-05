import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { adminService } from '../services/adminService.js';

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const result = await adminService.getAllUsers();
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

//Delete an user
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await adminService.deleteUser(userId[1]);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

// Get products
const getProducts = async (req, res, next) => {
    try {
        const { page } = req.query;
        const products = await adminService.getProducts(page);
        res.status(StatusCodes.OK).json(products);
        next();
    } catch (error) {
        next(error);
    }
};

export const adminController = {
    getAllUsers,
    deleteUser,
    getProducts,
};
