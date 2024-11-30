import { StatusCodes } from "http-status-codes";
import Address from "../models/Address";
import Order from "../models/order";
import Variant from "../models/variant";
import cart from "../models/cart";

//=========================tạo đơn hàng mới===============
export const createOrder = async (req, res) => {
    const { userId, addressId, products, payment, totalPrice, note } =
        req.body;
    try {
        let finalAddress = {};
        // Kiểm tra xem addressId có được cung cấp không
        if (!addressId) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "addressId là bắt buộc" });
        }
        if (!payment) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Phương thức thanh toán là bắt buộc" });
        }
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Không có sản phẩm trong giỏ hàng" });
        }

        if (totalPrice < 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Giá trị đơn hàng không hợp lệ" });
        }
        if (!userId) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "userId là bắt buộc" });
        }

        // Truy vấn thông tin địa chỉ từ addressId
        const address = await Address.findById(addressId);
        if (!address) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Địa chỉ không tồn tại" });
        }
        // Lấy thông tin chi tiết địa chỉ
        finalAddress = address.toObject();
        // Kiểm tra số lượng kho cho mỗi sản phẩm
        for (let item of products) {
            const { variantItem, quantity } = item;
            // Kiểm tra và xử lý variantItem
            const productVariant = await Variant.findById(variantItem._id);
            if (!productVariant || productVariant.countOnStock < quantity) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: `Số lượng không đủ trong kho.`
                });
            }

            // Trừ số lượng trong kho
            productVariant.countOnStock -= quantity;
            await productVariant.save();
        }

        // Tạo đơn hàng
        const newOrder = new Order({
            userId,
            addressId: finalAddress,
            products,
            payment,
            note,
            totalPrice,
        });
        // Lưu đơn hàng
        const savedOrder = await newOrder.save();
        // Xóa tất cả các sản phẩm được chọn từ giỏ hàng của người dùng cụ thể
        await cart.updateOne(
            { userId },
            { $pull: { products: { selected: true } } }
        );

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
export const getAllOrdersByUserId = async (req, res) => {
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
export const getAllOrders = async (req, res) => {
    try {
        // Tìm tất cả đơn hàng và populate thông tin userId và addressId
        const orders = await Order.find().populate("userId").sort({ createdAt: -1 });
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
// ============================ Cập nhật trạng thái đơn hàng ===========================
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    try {
        // Kiểm tra trạng thái mới
        const validStatuses = ["chờ xác nhận", "chờ lấy hàng", "chờ giao hàng", "đã hoàn thành", "đã hủy"];
        if (!newStatus || !validStatuses.includes(newStatus)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `Trạng thái không hợp lệ. Các trạng thái hợp lệ: ${validStatuses.join(", ")}.`
            });
        }

        // Tìm đơn hàng theo id
        const order = await Order.findById(id);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn hàng" });
        }

        // Kiểm tra trạng thái hiện tại của đơn hàng
        const currentStatus = order.status;

        // Logic xử lý trạng thái
        switch (currentStatus) {
            case "chờ xác nhận":
                if (newStatus === "chờ xác nhận") {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Trạng thái chờ xác nhận không thể quay lại."
                    });
                }
                break;

            case "chờ lấy hàng":
                if (newStatus === "chờ xác nhận") {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Không thể quay lại trạng thái chờ xác nhận từ chờ lấy hàng."
                    });
                }
                break;

            case "chờ giao hàng":
                if (newStatus === "chờ xác nhận" || newStatus === "chờ lấy hàng") {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Không thể quay lại trạng thái trước từ chờ giao hàng."
                    });
                }
                break;

            case "đã hoàn thành":
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Không thể thay đổi trạng thái khi đơn hàng đã hoàn thành."
                });

            case "đã hủy":
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Không thể thay đổi trạng thái khi đơn hàng đã hủy."
                });

            default:
                break;
        }

        // Hoàn lại số lượng sản phẩm nếu trạng thái chuyển thành "đã hủy"
        if (newStatus === "đã hủy" && ["chờ xác nhận", "chờ lấy hàng"].includes(currentStatus)) {
            for (let outerItem of order.products) {
                if (!Array.isArray(outerItem.products)) {
                    console.error("outerItem.products không phải là mảng:", outerItem);
                    continue;
                }

                for (let item of outerItem.products) {
                    const { variantItem, quantity } = item;
                    if (!variantItem || !variantItem._id) {
                        console.error("variantItem hoặc _id không tồn tại:", item);
                        continue;
                    }

                    const productVariant = await Variant.findById(variantItem._id);
                    if (productVariant) {
                        productVariant.countOnStock += quantity; // Hoàn lại số lượng
                        await productVariant.save();
                    }
                }
            }
        }

        // Cập nhật trạng thái nếu không gặp lỗi
        order.status = newStatus;
        await order.save();

        // Trả về kết quả
        return res.status(StatusCodes.OK).json({
            message: "Cập nhật trạng thái đơn hàng thành công.",
            order: order
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Lỗi khi cập nhật trạng thái đơn hàng",
            error: error.message,
        });
    }
};
