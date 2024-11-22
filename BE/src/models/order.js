import mongoose from "mongoose";
import { nanoid } from "nanoid";
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  addressId: {
    type: Object,
    required: true, // Lưu thông tin chi tiết của địa chỉ
  },
  note: {
    type: String,
  },
  // Danh sách sản phẩm
  products: [Object],

  payment: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["chờ xác nhận", "chờ lấy hàng", "chờ giao hàng", "đã hoàn thành", "đã hủy"],
    default: "chờ xác nhận",
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
