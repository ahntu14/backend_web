import Database from '../config/mysql.js';

// get all products
const allProducts = async () => {
    try {
        const query = 'SELECT *, ROUND(rate / numberReview, 1) AS star FROM product WHERE quantity > 0';
        let [products] = await Database.query(query);

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

const GetReview = async (productId) => {
    try {
        const query = `select u.name, r.rate, r.comment from rating r left join user u on r.user_id = u.id where product_id = ${productId} order by rate`;
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
    GetReview,
};
