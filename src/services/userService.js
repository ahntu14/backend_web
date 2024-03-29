import Database from '../config/mysql.js';

// Update user's information
const UpdateInfo = async (id, content) => {
    try {
        const values = [content.address, content.phone, id];
        const query = 'UPDATE user SET address = ?, phone = ? WHERE id = ?';
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
const ToCart = async (productId, quantity, id) => {
    try {
        const values = [[productId, quantity, id]];
        const query = 'INSERT INTO cart (productId, quantity, userId) VALUES ?';
        const [result] = await Database.query(query, [values]);
        return result;
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
export const userService = {
    UpdateInfo,
    GetInfo,
    ToCart,
    GetCart,
};
