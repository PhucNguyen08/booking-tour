import { Order, TourSchedule } from '../models/index.js';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { config } from '../momo/config.js';
import transporter from '../email/email.js';

const payment = async (req, res, next) => {
    const {
        accessKey,
        secretKey,
        partnerCode,
        redirectUrl,
        orderInfo,
        ipnUrl,
        requestType,
        extraData,
        orderGroupId,
        autoCapture,
        lang,
    } = config;

    var amount = '10000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    // var orderInfo = 'Pay with Momo';

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

    //signature
    var signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(
        CryptoJS.enc.Hex
    );

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

    // options for axios
    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
        data: requestBody,
    };

    // Send the request and handle the response
    let result;
    try {
        result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        return res
            .status(500)
            .json({ statusCode: 500, message: error.message });
    }
};

const createPayment = async item => {
    const {
        accessKey,
        secretKey,
        partnerCode,
        redirectUrl,
        ipnUrl,
        requestType,
        extraData,
        orderGroupId,
        autoCapture,
        lang,
    } = config;

    const { totalAmount, id } = item;

    var amount = totalAmount;
    var orderId = id;
    var requestId = orderId;
    var orderInfo = `Thanh toán đơn hàng ${id}`;

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

    //signature
    var signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(
        CryptoJS.enc.Hex
    );

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

    // options for axios
    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
        data: requestBody,
    };

    try {
        const result = await axios(options);
        return result.data.payUrl;
    } catch (error) {
        return error.message;
    }
};

const callback = async (req, res, next) => {
    console.log('callback: ');
    console.log(req.body);
    if (req.body.resultCode === 0) {
        const oneOrder = await Order.update(
            {
                status: 'confirm',
            },
            {
                where: {
                    id: req.body.orderId,
                },
            }
        );

        const order = await Order.findByPk(req.body.orderId);

        await TourSchedule.update(
            {
                numberOfParticipantsBooked:
                    order.dataValues.numberOfChild +
                    order.dataValues.numberOfAdult,
            },
            {
                where: {
                    id: order.dataValues.tourScheduleId,
                },
            }
        );

        const options = {
            from: 'npnguyen6868@gmail.com',
            to: 'npnguyen812@gmail.com',
            subject: 'Đơn xác nhận đặt tour du lịch',
            html: req.body.detail,
        };

        await transporter.sendMail(options);
    }
    /**
   * Dựa vào kết quả này để update trạng thái đơn hàng
   * Kết quả log:
   * {
        partnerCode: 'MOMO',
        orderId: 'MOMO1712108682648',
        requestId: 'MOMO1712108682648',
        amount: 10000,
        orderInfo: 'pay with MoMo',
        orderType: 'momo_wallet',
        transId: 4014083433,
        resultCode: 0,
        message: 'Thành công.',
        payType: 'qr',
        responseTime: 1712108811069,
        extraData: '',
        signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
      }
   */

    // return res.status(200).json(req.body);
};

export { payment, callback, createPayment };
