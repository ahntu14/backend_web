import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { adminService } from '../services/adminService.js';
import { emailValidation } from '../validations/emailValidation.js';

// Login

const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Missing email or password!');
        } else if (!emailValidation(email)) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Email is invalid');
        } else {
            const result = await adminService.Login(email, password);
            if (result === 'Invalid password') {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid password');
            } else if (result.length === 0) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid email');
            } else {
                res.status(StatusCodes.OK).json(result);
                next();
            }
        }
    } catch (error) {
        next(error);
    }
};

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
        const result = await adminService.deleteUser(userId.slice(1));
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

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const imageUrl = req.file.path;
        const {
            name,
            category,
            videoUrl,
            oldPrice,
            newPrice,
            chip,
            ram,
            rom,
            screen,
            pin,
            selfieCam,
            behindCam,
            chargeSpeed,
            slug,
            quantity,
        } = req.body;

        if (
            !name ||
            !category ||
            !imageUrl ||
            !oldPrice ||
            !newPrice ||
            !chip ||
            !ram ||
            !rom ||
            !screen ||
            !pin ||
            !selfieCam ||
            !behindCam ||
            !chargeSpeed ||
            !quantity
        ) {
            throw new Error('Missing details of product');
        } else {
            const result = await adminService.createProduct(
                name,
                category,
                imageUrl,
                videoUrl,
                oldPrice,
                newPrice,
                chip,
                ram,
                rom,
                screen,
                pin,
                selfieCam,
                behindCam,
                chargeSpeed,
                slug,
                quantity,
            );
            res.status(StatusCodes.CREATED).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id.slice(1);
        console.log(productId);
        if (!productId) {
            throw new Error('Missing product id');
        } else {
            const result = await adminService.deleteProduct(productId);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

//Update a product
const updateProduct = async (req, res, next) => {
    try {
        const {
            id,
            name,
            category,
            videoUrl,
            newPrice,
            chip,
            ram,
            rom,
            screen,
            pin,
            selfieCam,
            behindCam,
            chargeSpeed,
            quantity,
        } = req.body;
        if (
            !id ||
            !name ||
            !category ||
            !videoUrl ||
            !newPrice ||
            !chip ||
            !ram ||
            !rom ||
            !screen ||
            !pin ||
            !selfieCam ||
            !behindCam ||
            !chargeSpeed ||
            !quantity
        ) {
            throw new ApiError(StatusCodes.NO_CONTENT, 'Missing something');
        } else {
            const result = await adminService.updateProduct(
                id,
                name,
                category,
                videoUrl,
                newPrice,
                chip,
                ram,
                rom,
                screen,
                pin,
                selfieCam,
                behindCam,
                chargeSpeed,
                quantity,
            );
            res.status(StatusCodes.OK).json(result);
        }
    } catch (error) {
        next(error);
    }
};

// Count add orders
const countOrders = async (req, res, next) => {
    try {
        const numberOrders = await adminService.countOrders();
        res.status(StatusCodes.OK).json(numberOrders);
        next();
    } catch (error) {
        next(error);
    }
};

// Count orders with payment method
const countOrderPayment = async (req, res, next) => {
    try {
        const provider = req.query.provider;
        if (!provider) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing provider name');
        } else {
            const result = await adminService.countOrderPayment(provider);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Update status of order
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status, orderId } = req.body;
        if (!status) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing status');
        } else if (status !== 'pending' && status !== 'completed' && status !== 'cancelled') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Status is not accepted');
        } else {
            const result = await adminService.updateOrderStatus(status, orderId);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Get orders by status of payment
const getOrderStatus = async (req, res, next) => {
    try {
        const status = req.query.status;
        if (!status) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing status');
        } else if (status !== 'pending' && status !== 'completed' && status !== 'cancelled') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Status is not accepted');
        } else {
            const result = await adminService.getOrderStatus(status);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

export const adminController = {
    Login,
    getAllUsers,
    deleteUser,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    countOrders,
    countOrderPayment,
    updateOrderStatus,
    getOrderStatus,
};
