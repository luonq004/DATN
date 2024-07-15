import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  userInfo: {
    number: {
      type: String,
      required: true,
    },
  },

  // Embedded
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

  shipping: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
