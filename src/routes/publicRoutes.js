import express from 'express';
import { publicController } from '../controllers/publicController.js';

const Router = express.Router();

// get all products
Router.get('/products', publicController.allProducts);

// get all category's products
Router.get('/category', publicController.categoryProduct);

// search for products
Router.get('/search', publicController.searchProducts);

export const publicRoutes = Router;
