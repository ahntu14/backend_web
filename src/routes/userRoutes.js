import express from "express";
import { userController } from "../controllers/userController.js";

const Router = express.Router();

Router.get('/all', userController.getAllUsers)

export const userRoutes = Router