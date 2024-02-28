import express from 'express';
import { userController } from '../controllers/userController.js';

const Router = express.Router();

//Update information for user
Router.put('/update/:id', userController.UpdateInfo);

export const userRoutes = Router;
