import Database from '../config/mysql.js';

// get all products
const allProducts = async () => {
    try {
        const query = 'SELECT * FROM product';
        let [products] = await Database.query(query);
        products = products.filter((product) => product.quantity > 0);
        return products;
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

// search products
const searchProducts = async (keyword) => {
    try {
        const query = `SELECT * FROM product WHERE name LIKE '%${keyword}%'`;
        const [results] = await Database.query(query);
        return results;
    } catch (error) {
        throw error;
    }
};

export const publicService = {
    allProducts,
    categoryProduct,
    searchProducts,
};
