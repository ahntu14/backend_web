import { publicService } from '../services/publicService.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

// get all products
const allProducts = async (req, res, next) => {
    try {
        const products = await publicService.allProducts();
        res.status(StatusCodes.OK).json(products);
        next();
    } catch (error) {
        next(error);
    }
};

// get product by category name
const categoryProduct = async (req, res, next) => {
    try {
        const category = req.params.category.slice(1);
        if (!category) {
            res.status(StatusCodes.NOT_FOUND).json('Category is not found');
        } else {
            const results = await publicService.categoryProduct(category);
            res.status(StatusCodes.OK).json(results);
        }
    } catch (error) {
        next(error);
    }
};

export const publicController = {
    allProducts,
    categoryProduct,
};
