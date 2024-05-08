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

// Lấy ra những đơn hàng đã mua
Router.get('/order', jwtMiddleware.verifyToken, userController.GetOrder);

// lấy ra chi tiết đơn hàng
Router.get('/order-detail/:id', jwtMiddleware.verifyToken, userController.GetOrderDetail);

//Create order
Router.post('/order', jwtMiddleware.verifyToken, userController.CreateOrder);

// Create order details
// Router.post('/order-detail', jwtMiddleware.verifyToken, userController.CreateOrderDetails);

// VN Pay
Router.post('/payment', jwtMiddleware.verifyToken, userController.CreatePayment);

// Momo payment
Router.get('/momo-pay', jwtMiddleware.verifyToken, userController.CreateMomoPay);

// Change quantity in cart
Router.put('/change-quantity', jwtMiddleware.verifyToken, userController.ChangeQuantity);

// Delete product in cart
Router.delete('/delete-product/:id', jwtMiddleware.verifyToken, userController.DeleteProduct);

// Hủy đơn hàng
Router.put('/order/:id', jwtMiddleware.verifyToken, userController.CancelOrder);

// Xóa tất cả đơn hàng trong cart
Router.post('/delete-all-cart', jwtMiddleware.verifyToken, userController.DeleteCart);

// Lấy ra đơn hàng và chi tiết của nó
Router.get('/detail-order', jwtMiddleware.verifyToken, userController.DetailOrder);

Router.get('/vnpay_ipn', userController.ReturnUrl);

// đánh giá sản phẩm
Router.post('/review', jwtMiddleware.verifyToken, userController.RateProduct);

Router.post('/change-password', jwtMiddleware.verifyToken, userController.ChangePassword);

Router.post('/fee', userController.GetFee);

Router.get('/province', userController.GetProvince);

Router.post('/district', userController.GetDistrict);

Router.post('/ward', userController.GetWard);

export const userRoutes = Router;
