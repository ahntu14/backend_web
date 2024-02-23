import express from "express";
import { userRoutes } from "./userRoutes.js"; 


const Router = express.Router();

Router.use('/user', userRoutes);

export const API = Router