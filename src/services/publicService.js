import Database from '../config/mysql.js';

// get all products
const allProducts = async () => {
    try {
        const query = 'SELECT * FROM product';
        const [result] = await Database.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// get product with category name
const categoryProduct = async (category) => {
    try {
        const query = 'SELECT * FROM product where category = ?';
        const [result] = await Database.query(query, [category]);
        return result;
    } catch (error) {
        throw error;
    }
};

export const publicService = {
    allProducts,
    categoryProduct,
};
