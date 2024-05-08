import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/userService.js';
import ApiError from '../utils/ApiError.js';
import QueryString from 'qs';
import crypto from 'crypto';
import dateFormat from 'dateformat';
import https from 'https';
import { convert } from '../utils/convert.js';
import axios from 'axios';
import { env } from '../config/environment.js';

//Update user's information
const UpdateInfo = async (req, res, next) => {
    try {
        const id = req.headers.id;
        const { name, address, phone, addressCode } = req.body;
        if (!name || !address || !phone) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing something');
        } else {
            const result = await userService.UpdateInfo(id, name, address, phone, addressCode);
            res.status(StatusCodes.OK).json({
                status: true,
                message: 'Thay đổi thông tin thành công',
            });
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
        const { provider, orderInfo } = req.body;
        console.log(userId, req.body);
        if (!userId || !provider) {
            throw new ApiError(StatusCodes.BAD_GATEWAY, 'Missing something');
        } else {
            const result = await userService.CreateOrder(userId, provider, orderInfo);
            res.status(StatusCodes.CREATED).json({
                status: true,
                message: result,
            });
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

// Momo pay
const CreateMomoPay = async (req, res, next) => {
    try {
        const { total } = req.body;
        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var orderInfo = 'pay with MoMo';
        var partnerCode = 'MOMO';
        var redirectUrl = 'http://10.0.2.2:1406/payment-success';
        var ipnUrl = 'http://localhost:1406/user/vnpay_ipn';
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
        if (!productId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing id');
        } else {
            const result = await userService.DeleteProduct(userId, productId);
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

        if (!orderId) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing order id');
        } else {
            const result = await userService.CancelOrder(orderId);
            res.status(StatusCodes.OK).json(result);
            next();
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
        next();
    } catch (error) {
        next(error);
    }
};

// Lấy ra đơn hàng và chi tiết của nó
const DetailOrder = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const result = await userService.DetailOrder(userId);
        res.status(StatusCodes.OK).json(result);
        next();
    } catch (error) {
        next(error);
    }
};

const CreatePayment = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const { OrderInfo } = req.body;
        const info = convert.toUrl(OrderInfo);
        const orderInformation = `${userId}-${info}`;
        const allProducts = await userService.GetCart(userId);
        const totalPrice = allProducts.reduce((total, product) => {
            return total + product.newPrice * product.productQuantity;
        }, 0);

        let tmnCode = 'IFU403F1';
        let secretKey = 'MVQREENUPMSOYVBJWPAXHZGCWBGTLMWF';
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

        let returnUrl = '/order-return';

        var ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = totalPrice;
        var bankCode = 'ncb';

        var orderInfo = orderInformation;
        var orderType = 'billpayment';
        var locale = 'vn';

        var currCode = 'VND';
        var vnp_Params = {};
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

        var signData = QueryString.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });

        res.status(200).json(vnpUrl);
    } catch (error) {
        next(error);
    }
};

// Return url
const ReturnUrl = async (req, res, next) => {
    try {
        var vnp_Params = req.query;
        console.log(req.query);
        var secureHash = vnp_Params['vnp_SecureHash'];
        let orderInfo = vnp_Params['vnp_OrderInfo'];

        let userId = parseInt(orderInfo[0]);

        let orderInformation = convert.toString(orderInfo.slice(2));

        let responseCode = vnp_Params['vnp_ResponseCode'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

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
        let secretKey = 'MVQREENUPMSOYVBJWPAXHZGCWBGTLMWF';
        var signData = QueryString.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac('sha512', secretKey);
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (responseCode === '00') {
            await userService.CreateOrder(userId, 'vnpay', orderInformation);

            res.status(200).json({ RspCode: '00', Message: 'success' });
        } else {
            res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
        }
    } catch (error) {
        next(error);
    }
};

// Đánh giá sản phẩm
const RateProduct = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const { productId, rate, comment } = req.body;
        if (!productId || !rate) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing something');
        } else {
            const result = await userService.RateProduct(userId, productId, rate, comment);
            res.status(StatusCodes.OK).json({
                status: true,
                message: 'Đánh giá thành công',
            });
            next();
        }
    } catch (error) {
        next(error);
    }
};

const ChangePassword = async (req, res, next) => {
    try {
        const userId = req.headers.id;
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing something');
        }
        const result = await userService.ChangePassword(userId, oldPassword, newPassword);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};

const GetFee = async (req, res, next) => {
    try {
        const headers = {
            token: env.SHOP_TOKEN,
            shop_id: env.SHOP_ID,
        };
        const { total, toDistrictId, toWardId } = req.body;
        console.log(req.body);
        const to_ward_code = 'toWardId';
        const valueAsString = toWardId.toString();
        const result = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
            headers: headers,
            params: {
                service_type_id: 2,
                insurance_value: total,
                coupon: null,
                from_district_id: 1542,
                to_district_id: toDistrictId,
                [to_ward_code]: valueAsString,
                height: 15,
                length: 15,
                weight: 1000,
                width: 15,
            },
        });
        res.status(StatusCodes.OK).json(result.data);
        next();
    } catch (error) {
        next(error);
    }
};

const GetProvince = async (req, res, next) => {
    try {
        const headers = {
            token: env.SHOP_TOKEN,
        };
        const result = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            headers,
        });
        res.status(StatusCodes.OK).json(result.data.data);
        next();
    } catch (error) {
        next(error);
    }
};

const GetDistrict = async (req, res, next) => {
    try {
        const headers = {
            token: env.SHOP_TOKEN,
        };
        const { provinceId } = req.body;
        const result = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            headers: headers,
            params: { province_id: provinceId },
        });
        res.status(StatusCodes.OK).json(result.data.data);
        next();
    } catch (error) {
        next(error);
    }
};

const GetWard = async (req, res, next) => {
    try {
        const headers = {
            token: env.SHOP_TOKEN,
        };
        const { districtId } = req.body;
        const result = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
            headers: headers,
            params: { district_id: districtId },
        });
        res.status(StatusCodes.OK).json(result.data.data);
        next();
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
    ChangePassword,
    CreatePayment,
    CreateMomoPay,
    ChangeQuantity,
    DeleteProduct,
    GetOrder,
    GetOrderDetail,
    CancelOrder,
    DeleteCart,
    DetailOrder,
    ReturnUrl,
    RateProduct,
    GetFee,
    GetProvince,
    GetDistrict,
    GetWard,
};
