import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Liên kết với model User
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["info", "warning", "error"],  // Định nghĩa các loại thông báo
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,  // Để đánh dấu xem thông báo đã đọc hay chưa
    },
  },
  {
    timestamps: true,  // Tự động thêm các trường createdAt, updatedAt
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
