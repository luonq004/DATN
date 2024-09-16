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

    // Danh sách sản phẩm
    // products: [Object],
    products: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        }
    ],

    payment: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending",
    },

    totalPrice: {
        type: Number,
        required: true,
    },

    shipping: {
        type: Date,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    orders: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Giá của từng sản phẩm
        date: { type: Date, default: Date.now } // Ngày mua hàng
    }]
}, { timeseries: true, versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
