import { StatusCodes } from 'http-status-codes';
import Database from '../config/mysql.js';
import ApiError from '../utils/ApiError.js';

// Update user's information
const UpdateInfo = async (id, name, address, phone) => {
    try {
        const values = [name, address, phone, id];
        const query = 'UPDATE user SET name = ?, address = ?, phone = ? WHERE id = ?';
        const [result] = await Database.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get user's information
const GetInfo = async (id) => {
    try {
        const query = 'SELECT name, email, address, phone FROM user WHERE id = ?';
        const [result] = await Database.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Add products to cart
const ToCart = async (productId, quantity, userId) => {
    try {
        const [existingProduct] = await Database.query('SELECT * FROM cart WHERE productId = ? AND userId = ?', [
            productId,
            userId,
        ]);

        if (existingProduct.length > 0) {
            let updatedQuantity = parseInt(existingProduct[0].quantity) + parseInt(quantity);

            const query = 'UPDATE cart SET quantity = ? WHERE productId = ? AND userId = ?';
            const [result] = await Database.query(query, [updatedQuantity, productId, userId]);
            return result;
        } else {
            const values = [[productId, quantity, userId]];
            const query = 'INSERT INTO cart (productId, quantity, userId) VALUES ?';
            const [result] = await Database.query(query, [values]);
            return result;
        }
    } catch (error) {
        throw error;
    }
};

// Get all products from cart by user id
const GetCart = async (userId) => {
    try {
        const query = `SELECT product.*, cart.quantity as productQuantity FROM product INNER JOIN cart ON product.id = cart.productId and userId = ${userId};`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Add products to favorites
const ToFavorite = async (productId, id) => {
    try {
        const values = [[productId, id]];
        const query = 'INSERT INTO favorite (productId, userId) VALUES ?';
        const [result] = await Database.query(query, [values]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get all products from favorites by user id
const GetFavorite = async (userId) => {
    try {
        const query = `SELECT product.* FROM product INNER JOIN favorite ON product.id = favorite.productId and userId = ${userId};`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Create order
const CreateOrder = async (userId, total_amount, provider, payment_status) => {
    try {
        let created_at = new Date();
        const values = [[userId, total_amount, provider, payment_status, created_at]];
        const query = 'INSERT INTO orders (userId, total_amount, provider, payment_status, created_at) VALUES?';
        const [result] = await Database.query(query, [values]);
        return result;
    } catch (error) {
        throw error;
    }
};

// lấy ra những đơn hàng đã đặt
const GetOrder = async (userId) => {
    try {
        const query = `SELECT * FROM orders WHERE userId = '${userId}'`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Lấy ra chi tiết đơn hàng
const GetOrderDetail = async (orderId) => {
    try {
        const query = `SELECT * FROM order_details WHERE order_id = '${orderId}'`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Create order details
const CreateOrderDetails = async (order_id, productId, quantity, price) => {
    try {
        const values = [[order_id, productId, quantity, price]];
        const query = 'INSERT INTO order_details (order_id, productId, quantity, price) VALUES?';
        const [result] = await Database.query(query, [values]);
        return result;
    } catch (error) {
        throw error;
    }
};

// Change quantity in cart
const ChangeQuantity = async (userId, productId, quantity) => {
    try {
        const [existingProduct] = await Database.query('SELECT * FROM cart WHERE productId = ? AND userId = ?', [
            productId,
            userId,
        ]);

        if (existingProduct.length > 0) {
            const query = `UPDATE cart SET quantity = ${quantity} WHERE userId = ${userId} AND productId = ${productId}`;
            const [result] = await Database.query(query);
            return result;
        } else {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Product was not found');
        }
    } catch (error) {
        throw error;
    }
};

// Delete product from cart
const DeleteProduct = async (userId, productId) => {
    try {
        const [existingProduct] = await Database.query('SELECT * FROM cart WHERE productId = ? AND userId = ?', [
            productId,
            userId,
        ]);
        if (existingProduct.length > 0) {
            const query = `DELETE FROM cart WHERE productId = ${productId} AND userId = ${userId}`;
            const [result] = await Database.query(query);
            return result;
        } else {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Product was not found');
        }
    } catch (error) {
        throw error;
    }
};

// Hủy đơn hàng
const CancelOrder = async (orderId) => {
    try {
        const [existedOrder] = await Database.query(`SELECT * FROM orders WHERE id = ${orderId}`);
        if (existedOrder.length > 0 && existedOrder[0].payment_status === 'completed') {
            return 'Đơn hàng đang trên đường gửi tới bạn, bạn không thể hủy đơn hàng';
        } else if (existedOrder.length > 0 && existedOrder[0].payment_status === 'pending') {
            const [result] = await Database.query(
                `UPDATE orders SET payment_status = 'cancelled' WHERE id = ${orderId}`,
            );
            return result;
        } else return 'Không có đơn hàng';
    } catch (error) {
        throw error;
    }
};

// Xóa tất cả trong cart
const DeleteCart = async (userId) => {
    try {
        const query = `DELETE FROM cart WHERE userId = ${userId}`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Lấy ra đơn hàng và chi tiết của nó
const DetailOrder = async (userId) => {
    try {
        const query = `SELECT 
    o.id,
    SUM(o.total_amount) AS total_amount,
    o.created_at AS order_date,
    JSON_ARRAYAGG(
        JSON_OBJECT('name', p.name, 'imageUrl', p.imageUrl, 'quantity', od.quantity)
    ) AS order_details
    FROM orders o 
    JOIN order_details od ON o.id = od.order_id 
    JOIN product p ON od.productId = p.id 
    WHERE o.userId = ${userId}
    GROUP BY o.id, o.created_at;`;
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

export const userService = {
    UpdateInfo,
    GetInfo,
    ToCart,
    GetCart,
    ToFavorite,
    GetFavorite,
    CreateOrder,
    CreateOrderDetails,
    ChangeQuantity,
    DeleteProduct,
    GetOrder,
    GetOrderDetail,
    CancelOrder,
    DeleteCart,
    DetailOrder,
};
