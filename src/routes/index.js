import express from "express";
import { userRoutes } from "./userRoutes.js"; 
import { authRoutes } from "./authRoutes.js";
import { adminRoutes } from "./adminRoutes.js";


const Router = express.Router();

// User routes
Router.use('/user', userRoutes);

// Auth routes
Router.use('/auth', authRoutes);

// Admin routes
Router.use('/admin', adminRoutes);

export const API = Router