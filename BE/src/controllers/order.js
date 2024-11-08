import { StatusCodes } from "http-status-codes";
import Address from "../models/Address";
import Order from "../models/order";
import Product from "../models/product";

//=========================tạo đơn hàng mới===============
export const createOrder = async (req, res) => {
    const { userId, addressId, products, payment, totalPrice, name, shipping } =
        req.body;
    try {
        let finalAddressId = addressId;
        if (!addressId) {
            const {
                country,
                cityId,
                districtId,
                wardId,
                phone,
                addressDetail,
                email,
            } = req.body;
            // Tạo địa chỉ mới
            const newAddress = new Address({
                userId,
                country,
                cityId,
                districtId,
                wardId,
                phone,
                addressDetail,
                email,
                name,
                isDefault: true,
            });
            // Lưu địa chỉ mới
            const saveAddress = await newAddress.save();
            finalAddressId = saveAddress._id;
            return res
                .status(StatusCodes.CREATED)
                .json({ message: "Địa chỉ đã được lưu", address: saveAddress });
        }
        // // Kiểm tra và cập nhật số lượng sản phẩm trong kho
        // for (const item of products) {
        //     const product = await Product.findById(item.productId);

        //     // Nếu không tìm thấy sản phẩm
        //     if (!product) {
        //         return res.status(StatusCodes.NOT_FOUND).json({ message: `Sản phẩm với ID ${item.productId} không tồn tại` });
        //     }

        //     // Kiểm tra nếu sản phẩm có đủ số lượng trong kho
        //     if (product.quantity < item.quantity) {
        //         return res.status(StatusCodes.BAD_REQUEST).json({ message: `Sản phẩm ${product.name} không đủ số lượng trong kho` });
        //     }

        //     // Trừ số lượng sản phẩm trong kho dựa trên số lượng đặt hàng
        //     product.quantity -= item.quantity;
        //     await product.save();
        // }
        // Tạo đơn hàng
        const newOrder = new Order({
            userId,
            addressId: finalAddressId,
            products,
            payment,
            totalPrice,
            shipping,
        });
        // Lưu đơn hàng
        const savedOrder = await newOrder.save();

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "Đơn hàng đã được tạo thành công", order: savedOrder });
    } catch (error) {
        console.error(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Lỗi khi tạo đơn hàng", error: error.message });
    }
};

// ============================ Lấy tất cả đơn hàng ===========================
export const getAllOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        // Tìm tất cả đơn hàng và populate thông tin userId và addressId
        const orders = await Order.find({ userId });
        // Kiểm tra nếu không có đơn hàng
        if (orders.length === 0) {
            return res.status(404).json({ message: "Không có đơn hàng nào" });
        }
        // Trả về danh sách đơn hàng
        return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: "Lỗi khi lấy danh sách đơn hàng",
                error: error.message,
            });
    }
};

// ============================ Lấy đơn hàng theo Id ===========================

export const getOrdersById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);
        // Kiểm tra nếu không có đơn hàng
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy đơn hàng" });
        }
        // Trả về đơn hàng
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Lỗi khi lấy đơn hàng", error: error.message });
    }
};

// - Tra cứu đơn hàng theo mã đơn hàng

export const getOrderCode = async (req, res) => {
    try {
        const { orderCode } = req.params;
        const order = await Order.findOne({ orderCode });
        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Không tìm thấy đơn hàng" });
        }
        return res.json(order);
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Lỗi server", error: error.message });
    }
};
