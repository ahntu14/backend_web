import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/userService.js';
import ApiError from '../utils/ApiError.js';
import QueryString from 'qs';
import crypto from 'crypto';
import moment from 'moment';
import md5 from 'md5';
import config from 'config';
import dateFormat from 'dateformat';

//Update user's information
const UpdateInfo = async (req, res, next) => {
    try {
        const id = req.headers.id;
        const content = req.body;
        const result = await userService.UpdateInfo(id, content);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

// Get user's information
const GetInfo = async (req, res, next) => {
    try {
        const id = req.headers.id;
        const result = await userService.GetInfo(id);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

// Add products to cart
const ToCart = async (req, res, next) => {
    try {
        let id = req.headers.id;
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            throw new ApiError(StatusCodes.NO_CONTENT, 'Missing arguments');
        } else {
            const result = await userService.ToCart(productId, quantity, id);
            res.status(StatusCodes.CREATED).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Get all products from cart by user id
const GetCart = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        if (!userId) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Missing id');
        } else {
            const allCarts = await userService.GetCart(userId);
            res.status(StatusCodes.OK).json(allCarts);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Add product to favorites list
const ToFavorite = async (req, res, next) => {
    try {
        let id = req.headers.id;
        const { productId } = req.body;
        if (!productId) {
            throw new ApiError(StatusCodes.NO_CONTENT, 'Missing arguments');
        } else {
            const result = await userService.ToFavorite(productId, id);
            res.status(StatusCodes.CREATED).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Get  product from favorites list
const GetFavorite = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        if (!userId) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Missing id');
        } else {
            const allFavorites = await userService.GetFavorite(userId);
            res.status(StatusCodes.OK).json(allFavorites);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Create order
const CreateOrder = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const { total_amount, provider, payment_status } = req.body;
        console.log(userId, req.body);
        if (!userId || !total_amount || !payment_status || !provider) {
            throw new ApiError(StatusCodes.BAD_GATEWAY, 'Missing something');
        } else {
            const newOrder = await userService.CreateOrder(userId, total_amount, provider, payment_status);
            res.status(StatusCodes.CREATED).json(newOrder);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Create order details
const CreateOrderDetails = async (req, res, next) => {
    try {
        const { order_id, productId, quantity, price } = req.body;
        console.log(req.body);
        if (!order_id || !productId || !quantity || !price) {
            throw new ApiError(StatusCodes.CONFLICT, 'Missing something');
        } else {
            const orderDetail = await userService.CreateOrderDetails(order_id, productId, quantity, price);
            res.status(StatusCodes.CREATED).json(orderDetail);
            next();
        }
    } catch (error) {
        next(error);
    }
};

const CreatePayment = async (req, res, next) => {
    try {
        const { total } = req.body;
        let tmnCode = 'V9X72QPI';
        let secretKey = 'PVUDMVKBWORXCEUKFZZEZBKWZZNCTDNW';
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

        let ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let returnUrl = 'http://localhost:3000/cart';

        let date = new Date();

        let createDate = dateFormat(date, 'yyyymmddHHmmss');
        let orderId = dateFormat(date, 'HHmmss');
        let amount = total;
        let bankCode = 'ncb';

        let orderInfo = 'Thanh toan tien';
        let orderType = 'billpayment';
        let locale = 'vn';
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        function sortObject(obj) {
            let sorted = {};
            let str = [];
            let key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
            }
            return sorted;
        }

        vnp_Params = sortObject(vnp_Params);

        //Build Hash data và QueryString với phiên bản cũ 2.0.0, 2.0.1:
        // var signData = secretKey + QueryString.stringify(vnp_Params, { encode: false });

        // let secureHash = md5(signData);
        // vnp_Params['vnp_SecureHashType'] = 'MD5';
        // vnp_Params['vnp_SecureHash'] = secureHash;
        // vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: true });
        // res.redirect(vnpUrl);

        var signData = QueryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });

        res.status(200).json(vnpUrl);
    } catch (error) {
        next(error);
    }
};

export const userController = {
    UpdateInfo,
    GetInfo,
    ToCart,
    GetCart,
    ToFavorite,
    GetFavorite,
    CreateOrder,
    CreateOrderDetails,
    CreatePayment,
};
