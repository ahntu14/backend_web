import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { uploadCloud } from '../config/cloudinary.js';

const Router = express.Router();

// Login
Router.post('/login', adminController.Login);

// Get all users
Router.get('/manage', adminController.getAllUsers);

// Delete an user
Router.delete('/manage/:id', adminController.deleteUser);

// Get products
Router.get('/products', adminController.getProducts);

// Create a new product
Router.post('/new-product', uploadCloud.single('image'), adminController.createProduct);

// Delete a product
Router.delete('/delete-product/:id', adminController.deleteProduct);

// Update a product
Router.put('/update-product', adminController.updateProduct);

export const adminRoutes = Router;
