import Database from '../config/mysql.js';
import { hashPassword } from '../utils/password.js';
import { comparePassword } from '../utils/password.js';
import { token } from '../utils/token.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';
import { SuccessEmail, sendRegisterEmail } from '../utils/sendEmail.js';
import { rePassWord } from '../utils/sendEmail.js';

const Register = async (name, email, password) => {
    try {
        const existedUserQuery = 'SELECT * FROM user WHERE email = ?';
        const [existedUser] = await Database.query(existedUserQuery, [email]);
        if (existedUser.length > 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Email này đã được đăng ký trước đó');
        } else {
            const role = 'user';
            const created_at = new Date();
            password = await hashPassword(password);
            const values = [[name, email, password, role, created_at]];
            const query = 'INSERT INTO  user(name, email, password, role, created_at) VALUES?';
            let [result] = await Database.query(query, [values]);
            await sendRegisterEmail(email);
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
                let phone = result[0].phone;
                let address = result[0].address;
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
                        phone,
                        address,
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
        let id = parseInt(token1.payload.id);
        const [result] = await Database.query(`Select * from user where id = ${id}`);
        let oldToken = result[0].refreshToken;
        if (refreshToken === oldToken) {
            let token2;
            jwt.verify(oldToken, env.JWT_REFRESH_KEY, (err, decodedToken) => {
                if (err) {
                    throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not invalid');
                } else {
                    token2 = decodedToken;
                }
            });
            let date = new Date();
            if (token2.exp * 1000 > date.getTime()) {
                let newRefreshToken = token.generateRefreshToken({
                    id,
                    role,
                });

                await Database.query(`UPDATE user SET refreshToken = ? WHERE id = ${id}`, [newRefreshToken]);

                let accessToken = token.generateAccessToken({
                    id,
                    role,
                });
                return {
                    accessToken: accessToken,
                    refreshToken: newRefreshToken,
                };
            } else {
                return {
                    status: false,
                    message: 'Token hết hạn',
                };
            }
        } else {
            return 'Token is not match';
        }
    } catch (error) {
        throw error;
    }
};

// Forgot password
const ForgotPassword = async (email) => {
    try {
        const [isUser] = await Database.query('SELECT * FROM user WHERE email = ?', [email]);
        if (isUser.length > 0) {
            function generateRandomString(length) {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }

            const token = generateRandomString(16);
            const values = [[isUser[0].id, token, (new Date().getTime() + 30 * 60 * 1000).toString()]];

            await Database.query('Insert into forgot_password(user_id, token, exp_time) values?', [values]);

            await rePassWord(email, token);
            return {
                status: true,
                message: 'Vui lòng kiểm tra tin nhắn',
            };
        } else {
            return {
                status: false,
                message: 'Email chưa được đăng ký trước đó',
            };
        }
    } catch (error) {
        throw error;
    }
};

// Change password
const ChangePassword = async (token, newPassword) => {
    try {
        const [isUser] = await Database.query('SELECT * FROM forgot_password WHERE token = ?', [token]);
        if (isUser.length <= 0) {
            return new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn đã thay đổi mật khẩu rồi');
        } else if (parseInt(isUser[0].exp_time) < new Date().getTime()) {
            return new ApiError(StatusCodes.BAD_REQUEST, 'Link tạo lại mật khẩu đã hết hạn');
        } else {
            const [user] = await Database.query('SELECT * FROM user where id = ?', [parseInt(isUser[0].user_id)]);
            console.log(newPassword, user[0].password);
            const compare = await comparePassword(newPassword, user[0].password);

            if (compare) {
                return new ApiError(StatusCodes.BAD_REQUEST, 'Mật khẩu phải khác mật khẩu cũ');
            } else {
                const hashedPassword = await hashPassword(newPassword);
                await Database.query(`UPDATE user set password = ? where id = ?`, [
                    hashedPassword,
                    parseInt(user[0].id),
                ]);
                return {
                    status: true,
                    message: 'Thay đổi mật khẩu thành công',
                };
            }
        }
    } catch (error) {
        throw error;
    }
};

export const authService = {
    Register,
    Login,
    RefreshToken,
    ForgotPassword,
    ChangePassword,
};
