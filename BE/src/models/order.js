import mongoose from "mongoose";
import { nanoid } from "nanoid";
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
  products: [Object],

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
  orderCode: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(10), // Tạo mã đơn hàng với 10 ký tự ngẫu nhiên
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

