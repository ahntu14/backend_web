import express from 'express';
import { publicController } from '../controllers/publicController.js';

const Router = express.Router();

// get all products
Router.get('/products', publicController.allProducts);

Router.get('/:category', publicController.categoryProduct);

export const publicRoutes = Router;
