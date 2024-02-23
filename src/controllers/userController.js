import { StatusCodes } from "http-status-codes";
import { userService } from "../services/userService.js";


const getAllUsers = async (req, res, next) => {
  try {
      let allUsers = await userService.getAllUsers()
      console.log(allUsers);
      res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    next(error);  
  }
}

export const userController = {
  getAllUsers
}