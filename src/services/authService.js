import Database from '../config/mysql.js';
import { hashPassword } from '../utils/password.js';
import { comparePassword } from '../utils/password.js';
import { token } from '../utils/token.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

const Register = async (name, email, password) => {
    try {
        const existedUserQuery = 'SELECT * FROM user WHERE email = ?';
        const [existedUser] = await Database.query(existedUserQuery, [email]);
        if (existedUser.length > 0) {
            return 'User email is already registered';
        } else {
            const role = 'user';
            const created_at = new Date();
            password = await hashPassword(password);
            const values = [[name, email, password, role, created_at]];
            const query = 'INSERT INTO  user(name, email, password, role, created_at) VALUES?';
            let [result] = await Database.query(query, [values]);
            return result;
        }
    } catch (error) {
        throw error;
    }
};

const Login = async (email, password) => {
    try {
        const query = `SELECT DISTINCT * FROM user WHERE email = ?`;
        const values = [email];
        let [result] = await Database.query(query, values);

        if (result.length > 0) {
            if (await comparePassword(password, result[0].password)) {
                let id = result[0].id;
                let role = result[0].role;
                let name = result[0].name;
                console.log(role);
                if (role === 'user') {
                    const accessToken = token.generateAccessToken({
                        id,
                        role,
                    });

                    const refreshToken = token.generateRefreshToken({
                        id,
                        role,
                    });

                    if (!result[0].refreshToken) {
                        const insertQuery = `UPDATE user SET refreshToken = ? WHERE id = ?`;
                        await Database.query(insertQuery, [refreshToken, id]);
                    } else {
                        const updateQuery = `UPDATE user SET refreshToken = ? WHERE id = ?`;
                        await Database.query(updateQuery, [refreshToken, id]);
                    }

                    return {
                        email,
                        name,
                        accessToken,
                        refreshToken,
                    };
                } else {
                    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You do not have permission to access');
                }
            } else {
                return 'Invalid password';
            }
        } else {
            return result;
        }
    } catch (error) {
        throw error;
    }
};

// Cấp lại token mới
const RefreshToken = async (refreshToken) => {
    try {
        let token1;
        jwt.verify(refreshToken, env.JWT_REFRESH_KEY, (err, decodedToken) => {
            if (err) {
                throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not invalid');
            } else {
                token1 = decodedToken;
            }
        });
        let role = token1.payload.role;
        let id = token1.payload.id;
        const [result] = await Database.query('Select refreshToken from user where id = ?', [id]);
        let oldToken = result[0].refreshToken;
        if (refreshToken === oldToken) {
            let dateNow = new Date();
            if (token1.exp > dateNow.getTime() / 1000) {
                let accessToken = token.generateAccessToken({
                    id,
                    role,
                });
                return accessToken;
            } else {
                let refreshToken = token.generateRefreshToken({
                    id,
                    role,
                });
                return refreshToken;
            }
        } else {
            return 'Token is not match';
        }
    } catch (error) {
        throw error;
    }
};

export const authService = {
    Register,
    Login,
    RefreshToken,
};
