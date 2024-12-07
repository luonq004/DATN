import { Server } from "socket.io";
import Notification from "../models/Notification";

export const setupSocketIO = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client đã kết nối:", socket.id);

    // Lắng nghe sự kiện join_room
    socket.on("join_room", (userId) => {
      socket.join(userId);
      console.log(`Client ${socket.id} đã tham gia phòng: ${userId}`);
    });

    // Lắng nghe sự kiện 'orderPlaced' từ client
    socket.on("orderPlaced", async (orderData) => {
      console.log("Đơn hàng được đặt: ", orderData);

      try {
        const isSuccess = orderData.status === "success"; // Kiểm tra trạng thái thành công
        const message = isSuccess
          ? `Đơn hàng có mã: ${orderData.orderCode} đã được đặt thành công!`
          : `Đơn hàng có mã: ${orderData.orderCode} đã thất bại. Vui lòng thử lại!`;
        // Sau khi nhận được đơn hàng, lưu thông báo vào database
        const newNotification = new Notification({
          userId: orderData.userId,
          orderCode: orderData.orderCode,
          message,
          productImage: orderData.productImage,
          type: "info", // Loại thông báo
          status: isSuccess ? "success" : "failed", // Trạng thái thông báo
          isRead: false, // Chưa đọc
          timestamp: new Date(),
        });

        await newNotification.save(); // Lưu vào database
        console.log("Thông báo đã được lưu vào database.");

        // Phát thông báo cho phòng của người dùng
        io.to(orderData.userId.toString()).emit("orderNotification", {
          _id: newNotification._id,
          message: newNotification.message,
          orderCode: newNotification.orderCode,
          productImage: newNotification.productImage || null,
          isRead: newNotification.isRead,
          createdAt: newNotification.createdAt,
        });

        console.log("Đã phát thông báo cho người dùng.");
      } catch (error) {
        console.error("Lỗi khi lưu thông báo:", error);
        // Gửi thông báo lỗi đến client nếu lưu thông báo thất bại
        io.to(orderData.userId.toString()).emit("orderNotificationError", {
          error: "Không thể lưu thông báo. Vui lòng thử lại.",
        });
      }
    });



    // Lắng nghe sự kiện 'orderStatusChanged' từ frontend
    socket.on("orderStatusChanged", async (data) => {
      console.log("Trạng thái đơn hàng đã thay đổi:", data);
      try {
        const { orderId, newStatus, userId  } = data;
        const message = `Trạng thái đơn hàng ${orderId} đã thay đổi thành: ${newStatus}`;

        // Lưu thông báo vào database
        const newNotification = new Notification({
          userId,
          orderCode: orderId,
          message,
          type: "info", // Loại thông báo
          status:
            newStatus === "đã hoàn thành" || newStatus === "đã hủy"
              ? "success"
              : "pending", // Trạng thái thông báo
          isRead: false, // Chưa đọc
          timestamp: new Date(),
        });

        await newNotification.save(); // Lưu vào database
        console.log("Thông báo đã được lưu vào database.");

        // Phát thông báo cho phòng của người dùng
        io.to(userId.toString()).emit("orderStatusNotification", {
          _id: newNotification._id,
          message: newNotification.message,
          orderCode: newNotification.orderCode,
          isRead: newNotification.isRead,
          createdAt: newNotification.createdAt,
        });

        console.log("Đã phát thông báo cho người dùng về trạng thái mới.");
      } catch (error) {
        console.error("Lỗi khi lưu thông báo về trạng thái đơn hàng:", error);
        io.to(data.userId.toString()).emit("orderStatusNotificationError", {
          error: "Không thể lưu thông báo trạng thái. Vui lòng thử lại.",
        });
      }
    });

    // Lắng nghe sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log("Client đã ngắt kết nối:", socket.id);
    });
  });

  // Gán io vào app để có thể sử dụng trong controller
  app.set("io", io);
};
