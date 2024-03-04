import { publicService } from '../services/publicService.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { shuffleArray } from '../utils/shuffle.js';

// get all products
const allProducts = async (req, res, next) => {
    try {
        let products = await publicService.allProducts();
        let newProducts = shuffleArray(products);
        res.status(StatusCodes.OK).json(newProducts);
    } catch (error) {
        next(error);
    }
};

// get product by category name
const categoryProduct = async (req, res, next) => {
    try {
        let category = req.params.category.slice(1);
        if (!category) {
            res.status(StatusCodes.NOT_FOUND).json('Category is not found');
        } else {
            const results = await publicService.categoryProduct(category);
            res.status(StatusCodes.OK).json(results);
            next();
        }
    } catch (error) {
        next(error);
    }
};

export const publicController = {
    allProducts,
    categoryProduct,
};
