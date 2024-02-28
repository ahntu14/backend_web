import Database from '../config/mysql.js';
import { hashPassword } from '../utils/hashPassword.js';
import { comparePassword } from '../utils/hashPassword.js';
import { token } from '../utils/token.js';

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
                let userId = result[0].id;
                let role = result[0].role;
                let name = result[0].name;
                const accessToken = token.generateAccessToken({
                    userId,
                    role,
                });

                const refreshToken = token.generateRefreshToken({
                    userId,
                    role,
                });
                return {
                    email,
                    name,
                    role,
                    accessToken,
                    refreshToken,
                };
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

export const authService = {
    Register,
    Login,
};
