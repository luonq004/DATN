import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    //  tham chiếu đến Address
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },

    products: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        }
    ],

    // Thông tin thanh toán
    payment: {
        type: String,
        required: true,
    },

    // Trạng thái đơn hàng
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending",
    },

    // Tổng giá trị của đơn hàng
    totalPrice: {
        type: Number,
        required: true,
    },

    // Ngày giao hàng dự kiến
    shipping: {
        type: Date,
        required: true,
    },

    // Ngày tạo đơn hàng
    createdAt: {
        type: Date,
        default: Date.now,
    },

    // Danh sách sản phẩm trong đơn hàng
    orders: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    }]
}, { timeseries: true, versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
