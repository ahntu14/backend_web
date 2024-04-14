import Database from '../config/mysql.js';
import { comparePassword } from '../utils/password.js';
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
        const query = `SELECT * FROM product limit 8 OFFSET ${page * 8}`;
        const [result] = await Database.query(query);
        return {
            products: result,
            totalProducts: totalProducts,
            totalPage: Math.ceil(totalProducts / 8),
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
                slug,
                quantity,
            ],
        ];
        const query =
            'INSERT INTO product(name, category, imageUrl, videoUrl, oldPrice, newPrice, chip, ram, rom, screen, pin, selfieCam, behindCam, chargeSpeed, slug, quantity) VALUES ?';
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

//Update a product
const updateProduct = async (
    id,
    name,
    category,
    videoUrl,
    newPrice,
    chip,
    ram,
    rom,
    screen,
    pin,
    selfieCam,
    behindCam,
    chargeSpeed,
    quantity,
) => {
    try {
        const query =
            'UPDATE product SET name = ?, category = ?, videoUrl = ?, newPrice = ?, chip = ?, ram = ?, rom = ?, screen = ?, pin = ?, selfieCam = ?, behindCam = ?, chargeSpeed = ?, quantity = ? WHERE id = ?';
        const [result] = await Database.query(query, [
            name,
            category,
            videoUrl,
            newPrice,
            chip,
            ram,
            rom,
            screen,
            pin,
            selfieCam,
            behindCam,
            chargeSpeed,
            quantity,
            id,
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Lấy ra tất cả đơn hàng
const countOrders = async () => {
    try {
        const query = 'SELECT * AS TotalOrders FROM orders';
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Lấy ra tất cả đơn hàng theo phương thức thanh toán
const countOrderPayment = async (provider) => {
    try {
        const query = `SELECT * FROM orders where provider = '${provider}'`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Thay đổi trạng thái đơn hàng
const updateOrderStatus = async (status, orderId) => {
    try {
        const query = `UPDATE orders SET payment_status = '${status}' WHERE id = ${orderId}`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Lấy tất cả đơn hàng theo trạng thái
const getOrderStatus = async (status) => {
    try {
        const query = `SELECT * FROM orders where payment_status = '${status}'`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Lấy ra chi tiết đơn hàng
const getOrderDetail = async (orderId) => {
    try {
        const query = `SELECT * FROM orders WHERE id = '${orderId}'`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Tính tổng tiền của các đơn đã xác nhận
const getTotalAmount = async () => {
    try {
        const query = `SELECT provider, SUM(total_amount) AS total_amount_sum FROM orders WHERE payment_status = 'completed' GROUP BY provider;`;
        const result = Database.query(query);

        return result;
    } catch (error) {
        throw error;
    }
};

// Tính số lượng đơn hàng, tổng đơn trong từng tháng
const getPerMonth = async () => {
    try {
        const query =
            'SELECT  YEAR(created_at) AS year, MONTH(created_at) AS month, COUNT(*) AS total_orders, SUM(total_amount) AS total_amount FROM  orders WHERE YEAR(created_at) = 2024 GROUP BY YEAR(created_at), MONTH(created_at);';
        const result = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

export const adminService = {
    Login,
    getAllUsers,
    deleteUser,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    countOrders,
    countOrderPayment,
    updateOrderStatus,
    getOrderStatus,
    getOrderDetail,
    getTotalAmount,
    getPerMonth,
};
