import express from "express";
import { createNotification, getNotifications, markAsRead } from "../controllers/Notification";

const NotificationRouter = express.Router();

// Route tạo thông báo
NotificationRouter.post("/create", createNotification);

// Route lấy thông báo của một người dùng
NotificationRouter.get("/:userId", getNotifications);

// Route đánh dấu thông báo là đã đọc
NotificationRouter.patch("/mark-as-read/:id", markAsRead);

export default NotificationRouter;
