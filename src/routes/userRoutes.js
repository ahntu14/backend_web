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

// Get all products from cart by user id
Router.get('/cart', jwtMiddleware.verifyToken, userController.GetCart);

// Add products to cart
Router.post('/favorite', jwtMiddleware.verifyToken, userController.ToFavorite);

// Get all products from cart by user id
Router.get('/favorite', jwtMiddleware.verifyToken, userController.GetFavorite);

//Create order
Router.post('/order', jwtMiddleware.verifyToken, userController.CreateOrder);

// Create order details
Router.post('/order-detail', jwtMiddleware.verifyToken, userController.CreateOrderDetails);

// VN Pay
Router.post('/payment', userController.CreatePayment);

export const userRoutes = Router;
