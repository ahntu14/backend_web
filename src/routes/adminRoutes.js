import express from 'express';
import { adminController } from '../controllers/adminController.js';

const Router = express.Router();

// Get all users
Router.get('/manage', adminController.getAllUsers)

// Delete an user 
Router.delete('/manage/:id', adminController.deleteUser)



export const adminRoutes = Router