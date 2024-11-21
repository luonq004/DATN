import express from 'express';
import axios from 'axios';
import crypto from 'crypto';

const paymentRouter = express.Router();

// Cấu hình thông tin thanh toán MoMo
const partnerCode = 'MOMO';
const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const returnUrl = 'https://your-website.com/return';
const notifyUrl = 'https://your-website.com/notify';

// Hàm tạo chữ ký (signature) cho yêu cầu
const generateSignature = (data, secretKey) => {
    const rawData = `partnerCode=${data.partnerCode}&accessKey=${data.accessKey}&requestId=${data.requestId}&amount=${data.amount}&orderId=${data.orderId}&orderInfo=${data.orderInfo}&returnUrl=${data.returnUrl}&notifyUrl=${data.notifyUrl}`;
    return crypto.createHmac('sha256', secretKey).update(rawData).digest('hex');
};

// Tạo yêu cầu thanh toán
paymentRouter.post('/payment/create', async (req, res) => {
    const { orderId, amount, orderInfo } = req.body;

    // Kiểm tra các tham số đầu vào
    if (!orderId || !amount || !orderInfo) {
        return res.status(400).json({ error: 'Thiếu thông tin yêu cầu thanh toán' });
    }

    const requestId = `requestId-${Date.now()}`; // Tạo ID yêu cầu ngẫu nhiên
    const data = {
        partnerCode,
        accessKey,
        requestId,
        orderId,
        amount,
        orderInfo,
        returnUrl,
        notifyUrl,
        requestType: 'captureMoMo',  // Đảm bảo requestType là 'captureMoMo'
    };

    // Tạo chữ ký cho yêu cầu thanh toán
    const signature = generateSignature(data, secretKey);

    try {
        // Gửi yêu cầu thanh toán đến MoMo
        const response = await axios.post(
            'https://test-payment.momo.vn/v2/gateway/api/create',
            {
                ...data,
                signature,
            }
        );

        console.log('MoMo Response:', response.data);  // Log kết quả trả về từ MoMo

        if (response.data.errorCode === 0) {
            // Thành công, trả về URL thanh toán MoMo
            return res.json({
                paymentUrl: response.data.payUrl, // Đảm bảo rằng payUrl tồn tại trong response
            });
        } else {
            // Lỗi trả về từ MoMo
            return res.status(400).json({
                error: response.data.message || 'MoMo trả về lỗi không xác định',
            });
        }
    } catch (error) {
        console.error('Lỗi tạo yêu cầu thanh toán MoMo:', error);
        return res.status(500).json({ error: 'Lỗi tạo yêu cầu thanh toán MoMo' });
    }
});

// Xử lý thông báo thanh toán
paymentRouter.post('/payment/notify', async (req, res) => {
    const { partnerCode, accessKey, requestId, orderId, amount, transId, resultCode, message, signature } = req.body;

    // Kiểm tra các tham số đầu vào
    if (!partnerCode || !accessKey || !requestId || !orderId || !amount || !transId || !resultCode || !message || !signature) {
        return res.status(400).json({ error: 'Thiếu thông tin trong thông báo thanh toán' });
    }

    const data = {
        partnerCode,
        accessKey,
        requestId,
        orderId,
        amount,
        transId,
        resultCode,
        message,
    };

    // Kiểm tra chữ ký
    const generatedSignature = generateSignature(data, secretKey);

    if (generatedSignature === signature && resultCode === '0') {
        // Thanh toán thành công, cập nhật đơn hàng của bạn
        console.log('Thanh toán thành công:', orderId);
        return res.send('Thanh toán thành công');
    } else {
        // Thanh toán thất bại
        console.log('Thanh toán thất bại:', orderId);
        return res.send('Thanh toán thất bại');
    }
});

export default paymentRouter;
