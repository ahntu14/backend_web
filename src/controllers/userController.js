import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/userService.js';
import ApiError from '../utils/ApiError.js';
import QueryString from 'qs';
import crypto from 'crypto';
import moment from 'moment';
import md5 from 'md5';
import config from 'config';
import dateFormat from 'dateformat';
import https from 'https';

//Update user's information
const UpdateInfo = async (req, res, next) => {
    try {
        const id = req.headers.id;
        const { name, address, phone } = req.body;
        if (!name || !address || !phone) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing something');
        } else {
            const result = await userService.UpdateInfo(id, name, address, phone);
            res.status(StatusCodes.OK).json(result);
            next();
        }
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
        const { total_amount, provider, payment_status, created_at } = req.body;
        if (!userId || !total_amount || !payment_status || !provider) {
            throw new ApiError(StatusCodes.BAD_GATEWAY, 'Missing something');
        } else {
            const newOrder = await userService.CreateOrder(userId, total_amount, provider, payment_status, created_at);
            res.status(StatusCodes.CREATED).json(newOrder);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Lấy ra những đơn hàng đã thanh toán
const GetOrder = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const result = await userService.GetOrder(userId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};

// Lấy ra chi tiết đơn hàng
const GetOrderDetail = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing order id');
        } else {
            const result = await userService.GetOrderDetail(orderId);
            res.status(StatusCodes.OK).json(result);
        }
    } catch (error) {
        next(error);
    }
};

// Create order details
const CreateOrderDetails = async (req, res, next) => {
    try {
        const { order_id, productId, quantity, price } = req.body;
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
        // let signData = secretKey + QueryString.stringify(vnp_Params, { encode: false });

        // let secureHash = md5(signData);
        // vnp_Params['vnp_SecureHashType'] = 'MD5';
        // vnp_Params['vnp_SecureHash'] = secureHash;
        // vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: true });
        // res.redirect(vnpUrl);

        let signData = QueryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });

        res.status(200).json(vnpUrl);
    } catch (error) {
        next(error);
    }
};

// Momo pay
const CreateMomoPay = async (req, res, next) => {
    try {
        const { total } = req.body;
        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var orderInfo = 'pay with MoMo';
        var partnerCode = 'MOMO';
        var redirectUrl = 'http://localhost:3000/cart';
        var ipnUrl = 'http://localhost:3000/cart';
        var requestType = 'payWithMethod';
        var amount = total;
        var orderId = partnerCode + new Date().getTime();
        var requestId = orderId;
        var extraData = '';
        var paymentCode =
            'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
        var orderGroupId = '';
        var autoCapture = true;
        var lang = 'vi';

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;
        //puts raw signature
        console.log('--------------------RAW SIGNATURE----------------');
        console.log(rawSignature);
        //signature
        var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
        console.log('--------------------SIGNATURE----------------');
        console.log(signature);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });
        //Create the HTTPS objects
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
        };
        //Send the request and get the response
        const reqMomo = https.request(options, (resMomo) => {
            console.log(`Status: ${resMomo.statusCode}`);
            console.log(`Headers: ${JSON.stringify(resMomo.headers)}`);
            resMomo.setEncoding('utf8');
            resMomo.on('data', (body) => {
                console.log('Body: ');
                console.log(body);
                console.log('shortLink: ');
                console.log(JSON.parse(body).shortLink);
                // Trả về shortLink cho người dùng
                res.send(JSON.parse(body).shortLink);
            });
            resMomo.on('end', () => {
                console.log('No more data in response.');
            });
        });

        reqMomo.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        console.log('Sending....');
        reqMomo.write(requestBody);
        reqMomo.end();
    } catch (error) {
        next(error);
    }
};

// Change quantity in cart
const ChangeQuantity = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing arguments');
        } else {
            const result = await userService.ChangeQuantity(userId, productId, quantity);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Delete product from cart
const DeleteProduct = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const productId = req.params.id;
        if (!productId[1]) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing id');
        } else {
            const result = await userService.DeleteProduct(userId, productId[1]);
            res.status(StatusCodes.OK).json(result);
            next();
        }
    } catch (error) {
        next(error);
    }
};

// Hủy đơn hàng
const CancelOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        console.log(orderId);
        if (!orderId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing order id');
        } else {
            const result = await userService.CancelOrder(orderId);
            res.status(StatusCodes.OK).json(result);
        }
    } catch (error) {
        next(error);
    }
};

// Xoá tất cả đơn hàng trong cart
const DeleteCart = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const result = await userService.DeleteCart(userId);
        res.status(StatusCodes.OK).json(result);
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
    CreateMomoPay,
    ChangeQuantity,
    DeleteProduct,
    GetOrder,
    GetOrderDetail,
    CancelOrder,
    DeleteCart,
};
