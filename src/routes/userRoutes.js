import express from 'express';
import { userController } from '../controllers/userController.js';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';

const Router = express.Router();

//Update information for user
Router.put('/info', jwtMiddleware.verifyToken, userController.UpdateInfo);

// Get information
Router.get('/info', jwtMiddleware.verifyToken, userController.GetInfo);

// Add products to cart
Router.post('/cart', jwtMiddleware.verifyToken, userController.ToCart);

export const userRoutes = Router;
