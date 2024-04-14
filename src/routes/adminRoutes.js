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

// Get all orders
Router.get('/all-orders', adminController.countOrders);

// Count all orders with payment type
Router.get('/all-orders-payment', adminController.countOrderPayment);

//Update status of order
Router.put('/order-status', adminController.updateOrderStatus);

// Get orders with payment status
Router.get('/order-status', adminController.getOrderStatus);

// Lấy ra chi tiết đơn hàng
Router.get('/order-detail/:id', adminController.getOrderDetail);

// Tính tổng tiền của những đơn đã xác nhận
Router.get('/total-amount', adminController.getTotalAmount);

export const adminRoutes = Router;
