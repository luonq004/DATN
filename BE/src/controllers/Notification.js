// controllers/Notification.js

import Notification from "../models/Notification";

// Tạo thông báo mới
export const createNotification = async (req, res) => {
  try {
    const { userId, message, type = "info" } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({ message: "userId và message là bắt buộc!" });
    }

    const newNotification = new Notification({ userId, message, type });
    await newNotification.save();

    // Gửi thông báo qua Socket.IO
    req.app.get("io").emit("receive_notification", newNotification);  // Phát thông báo đến tất cả client

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể tạo thông báo", error });
  }
};

// Lấy tất cả thông báo của người dùng
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });  // Sắp xếp mới nhất
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể lấy thông báo", error });
  }
};

// Đánh dấu thông báo là đã đọc
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Thông báo không tìm thấy" });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể cập nhật thông báo", error });
  }
};
