import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
      default: "",
    },
    paymentInfo: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Nam", "Nữ", "Other"],
      default: "Other",
    },
    birthdate: {
      type: Date,
    },
    orders: [
      {
        orderId: {
          type: String,
          required: true,
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["Completed", "Pending", "Cancelled"],
          default: "Pending",
        },
      },
    ],
  },
  {
    collection: "users",
    versionKey: false,
    timestamps: true,
  }
);


const Users = mongoose.model("Users", userSchema);
export default Users;
