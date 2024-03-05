import Database from '../config/mysql.js';

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

export const adminService = {
    getAllUsers,
    deleteUser,
    getProducts,
};
