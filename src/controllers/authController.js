import { authService } from '../services/authService.js';
import { emailValidation } from '../validations/emailValidation.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

// Register for new user
const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error('Missing required parameters');
        } else if (!emailValidation(email)) {
            throw new Error('Email is invalid');
        } else {
            const result = await authService.Register(name, email, password);
            if (result === 'User email is already registered') {
                throw new Error(result);
            } else {
                res.status(StatusCodes.CREATED).json(result);
                next();
            }
        }
    } catch (error) {
        next(error);
    }
};

// Login for user had an account
const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Missing email or password!');
        } else if (!emailValidation(email)) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Email is invalid');
        } else {
            const result = await authService.Login(email, password);
            if (result === 'Invalid password') {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid password');
            } else if (result.length === 0) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid email');
            } else {
                res.status(StatusCodes.OK).json(result);
                next();
            }
        }
    } catch (error) {
        next(error);
    }
};

// Renew accessToken with refreshToken
const RefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.headers.refreshtoken;
        const result = await authService.RefreshToken(refreshToken);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};

// Forgot password
const ForgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await authService.ForgotPassword(email);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

// Change password
const ChangePassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            throw new Error('Missing something');
        } else {
            const result = await authService.ChangePassword(token, newPassword);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

export const authController = {
    Register,
    Login,
    RefreshToken,
    ForgotPassword,
    ChangePassword,
};
