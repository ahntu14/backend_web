import express from 'express';
import { authController } from '../controllers/authController.js';

const Router = express.Router();

//Register for new user
Router.post('/register', authController.Register);

//Login for user had an account
Router.post('/login', authController.Login);

export const authRoutes = Router;
