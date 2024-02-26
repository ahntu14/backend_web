import { authService } from "../services/authService.js";
import { emailValidation } from "../validations/emailValidation.js";
import { StatusCodes } from "http-status-codes";
import ApiError  from '../utils/ApiError.js';


// Register for new user
const Register = async (req, res, next) => {
  try {
    const {firstname, lastname, email, password, address, phone} = req.body
    if(!firstname || !lastname || !email || !password || !address || !phone) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Missing required parameters")
    } else if(!emailValidation(email)) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email is invalid")
    } else {
      const result = await authService.Register(firstname, lastname, email, password, address, phone)
      res.status(StatusCodes.CREATED).json(result)
      next()
    }
  } catch (error) {
    next (error)
  }
}


// Login for user had an account
const Login = async (req, res, next) => {
  try {
    const {email, password} = req.body 
    if(!email || !password) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Missing email or password!")
    } else if(!emailValidation(email)) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email is invalid")
    } else {
      const result = await authService.Login(email, password)
      if(result === "Invalid password") {
        throw new ApiError(StatusCodes.NOT_FOUND, "Invalid password")
      } else if(result.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Invalid email")
      } else {
        res.status(StatusCodes.OK).json(result)
        next()
      }
      
    }
  } catch (error) {
    next (error)
  }
}


export const authController = {
  Register,
  Login
}