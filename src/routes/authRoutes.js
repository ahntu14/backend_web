import express from 'express';
import { authController } from '../controllers/authController.js';

const Router = express.Router();

//Register for new user
Router.post('/register', authController.Register);

//Login for user had an account
Router.post('/login', authController.Login);

Router.post('/refresh-token', authController.RefreshToken);

// Forgot password
Router.post('/forgot-password', authController.ForgotPassword);

// Change password
Router.post('/reset-password', authController.ChangePassword);

Router.get('/review/:id', authController.GetReview);

export const authRoutes = Router;
