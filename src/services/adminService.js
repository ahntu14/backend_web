import Database from '../config/mysql.js';
import { comparePassword } from '../utils/hashPassword.js';
import { token } from '../utils/token.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

// Login
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
                if (role === 'admin') {
                    const accessToken = token.generateAccessToken({
                        id,
                        role,
                    });

                    const refreshToken = token.generateRefreshToken({
                        id,
                        role,
                    });

                    if (!result[0].refreshToken) {
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

// Get all users
const getAllUsers = async () => {
    try {
        const query = "SELECT * FROM user where role = 'user'";
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Delete an user
const deleteUser = async (userId) => {
    try {
        const query = 'DELETE FROM user WHERE id = ?';
        const [result] = await Database.query(query, [userId]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get products
const getProducts = async (page) => {
    try {
        const [allProducts] = await Database.query('SELECT * FROM product');
        const totalProducts = allProducts.length;
        const query = `SELECT * FROM product limit 10 OFFSET ${page * 10}`;
        const [result] = await Database.query(query);
        return {
            products: result,
            totalProducts: totalProducts,
            totalPage: Math.ceil(totalProducts / 10),
            currentPage: page,
        };
    } catch (error) {
        throw error;
    }
};

// Create a new product
const createProduct = async (
    name,
    category,
    imageUrl,
    videoUrl,
    oldPrice,
    newPrice,
    chip,
    ram,
    rom,
    screen,
    pin,
    selfieCam,
    behindCam,
    chargeSpeed,
    rate,
    numberReview,
    slug,
    quantity,
) => {
    try {
        const values = [
            [
                name,
                category,
                imageUrl,
                videoUrl,
                oldPrice,
                newPrice,
                chip,
                ram,
                rom,
                screen,
                pin,
                selfieCam,
                behindCam,
                chargeSpeed,
                rate,
                numberReview,
                slug,
                quantity,
            ],
        ];
        const query =
            'INSERT INTO product(name, category, imageUrl, videoUrl, oldPrice, newPrice, chip, ram, rom, screen, pin, selfieCam, behindCam, chargeSpeed, rate, numberReview, slug, quantity) VALUES ?';
        const [newProduct] = await Database.query(query, [values]);
        return newProduct;
    } catch (error) {
        throw error;
    }
};

// Delete a product
const deleteProduct = async (id) => {
    try {
        const query = 'DELETE FROM product WHERE id = ?';
        const [result] = await Database.query(query, [id]);
        return result;
    } catch (error) {
        next(error);
    }
};

export const adminService = {
    Login,
    getAllUsers,
    deleteUser,
    getProducts,
    createProduct,
    deleteProduct,
};
