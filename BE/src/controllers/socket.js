import { Server } from "socket.io";
import Notification from "../models/Notification";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import Users from "../models/users.js";

// Cấu hình và xử lý các sự kiện Socket.IO

export const setupSocketIO = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // console.log("Client đã kết nối:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id; // Lưu socketId của người dùng vào userSocketMap
      console.log("Người dùng đã kết nối:", userId);
    }

    // Lắng nghe sự kiện join_room
    socket.on("join_room", async (userId) => {
      const rooms = Object.keys(socket.rooms); // Lấy danh sách phòng hiện tại mà socket này đang tham gia
      if (!rooms.includes(userId)) {
        socket.join(userId);
      }

      // Lấy danh sách các admin
      const admins = await Users.find({ role: "Admin" }).select("_id");

      // Cho admin vào cùng phòng nếu chưa tham gia
      admins.forEach((admin) => {
        if (!rooms.includes(admin._id.toString())) {
          socket.join(admin._id.toString());
        }
      });

      console.log(`Client ${socket.id} đã tham gia phòng: ${userId}`);
      console.log(
        `Các admin đã tham gia phòng: ${admins.map((admin) => admin._id)}`
      );
    });

    // Lắng nghe sự kiện 'orderPlaced' từ client
    socket.on("orderPlaced", async (orderData) => {
      console.log("Đơn hàng được đặt: ", orderData);

      try {
        const isSuccess = orderData.status === "success"; // Kiểm tra trạng thái thành công
        const message = isSuccess
          ? `Đơn hàng với mã <strong>${orderData.orderCode}</strong> đã được đặt thành công!`
          : `Đơn hàng với mã <strong>${orderData.orderCode}</strong> đã thất bại. Vui lòng thử lại!`;

        const productName = orderData.productName;
        const productImage = orderData.productImage;
        const orderId = orderData.orderId;

        // Sau khi nhận được đơn hàng, lưu thông báo vào database
        const newNotification = new Notification({
          userId: orderData.userId,
          orderCode: orderData.orderCode,
          orderId: orderId,
          message,
          productImage: productImage,
          productName: productName,
          type: "info", // Loại thông báo
          status: isSuccess ? "success" : "failed", // Trạng thái thông báo
          isRead: false, // Chưa đọc
          timestamp: new Date(),
        });

        await newNotification.save(); // Lưu vào database
        console.log("Thông báo đã được lưu vào database.");

        // Phát thông báo cho phòng của người dùng
        console.log(
          "Đang phát thông báo trạng thái cho phòng:",
          orderData.userId.toString()
        );
        io.to(orderData.userId.toString()).emit("orderNotification", {
          userId: newNotification.userId,
          message: newNotification.message,
          orderCode: newNotification.orderCode,
          orderId: newNotification.orderId,
          productImage: newNotification.productImage || null,
          productName: newNotification.productName,
          isRead: newNotification.isRead,
          createdAt: newNotification.createdAt,
        });

        console.log("Đã phát thông báo cho người dùng.");

        // Phát thông báo cho tất cả admin, nhưng chỉ gửi một lần
        const adminIds = await Users.find({ role: "Admin" }).select("_id");
        adminIds.forEach((admin) => {
          io.to(admin._id.toString()).emit("orderNotification", {
            userId: newNotification.userId,
            message: newNotification.message,
            orderCode: newNotification.orderCode,
            orderId: newNotification.orderId,
            productImage: newNotification.productImage || null,
            productName: newNotification.productName,
            isRead: newNotification.isRead,
            createdAt: newNotification.createdAt,
          });
          console.log("Đã phát thông báo cho admin:", admin._id);
        });
      } catch (error) {
        console.error("Lỗi khi lưu thông báo:", error);
        // Gửi thông báo lỗi đến client nếu lưu thông báo thất bại
        io.to(orderData.userId.toString()).emit("orderNotificationError", {
          error: "Không thể lưu thông báo. Vui lòng thử lại.",
        });
      }
    });
    // Lắng nghe sự kiện 'orderStatusChanged'
    socket.on("orderStatusChanged", async (data) => {
      console.log("Trạng thái đơn hàng đã thay đổi:", data);

      try {
        const {
          orderCode,
          newStatus,
          userId,
          productImage,
          productName,
          orderId,
        } = data;

        const message = `Đơn hàng với mã <strong>${orderCode}</strong> đã được cập nhật và chuyển sang trạng thái <strong>${newStatus}</strong>.`;

        const userIdStr =
          typeof userId === "object" && userId._id
            ? userId._id.toString()
            : userId;

        // Lưu thông báo vào database
        const newNotification = new Notification({
          userId: userIdStr,
          orderCode,
          orderId,
          productImage,
          productName,
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
        io.to(userIdStr).emit("orderStatusNotification", {
          userId: newNotification.userId,
          message: newNotification.message,
          orderCode: newNotification.orderCode,
          orderId: newNotification.orderId,
          productImage: newNotification.productImage || null,
          productName: newNotification.productName,
          isRead: newNotification.isRead,
          createdAt: newNotification.createdAt,
        });

      } catch (error) {
        console.error("Lỗi khi lưu thông báo về trạng thái đơn hàng:", error);
        io.to(userIdStr).emit("orderStatusNotificationError", {
          error: "Không thể lưu thông báo trạng thái. Vui lòng thử lại.",
        });
      }
    });

    // Lắng nghe sự kiện ngắt kết nối
    socket.on("sendAdminMessage", async ({ conversationId, text, adminId }) => {
      console.log("Tin nhắn từ admin:");
      // try {
      //   // Tìm cuộc trò chuyện
      //   const conversation = await Conversation.findById(conversationId);
      //   if (!conversation) {
      //     return socket.emit("error", { error: "Conversation not found" });
      //   }
      //   // Tạo tin nhắn
      //   const message = await Message.create({
      //     conversationId: conversation._id,
      //     sender: adminId,
      //     senderType: "Admin",
      //     text,
      //   });
      //   conversation.messages.push(message._id);
      //   await conversation.save();
      //   // Gửi tin nhắn đến user
      //   socket
      //     .to(conversation.user.toString())
      //     .emit("receiveMessage", { message });
      // } catch (error) {
      //   console.error(error);
      //   socket.emit("error", { error: "Internal Server Error" });
      // }
    });
    // socket.on("sendAdminMessage", async ({ conversationId, text, adminId }) => {
    //   console.log("Tin nhắn từ admin:");
    //   try {
    //     // Tìm cuộc trò chuyện
    //     const conversation = await Conversation.findById(conversationId);
    //     if (!conversation) {
    //       return socket.emit("error", { error: "Conversation not found" });
    //     }
    //     // Tạo tin nhắn
    //     const message = await Message.create({
    //       conversationId: conversation._id,
    //       sender: adminId,
    //       senderType: "Admin",
    //       text,
    //     });
    //     conversation.messages.push(message._id);
    //     await conversation.save();
    //     // Gửi tin nhắn đến user
    //     socket
    //       .to(conversation.user.toString())
    //       .emit("receiveMessage", { message });
    //   } catch (error) {
    //     console.error(error);
    //     socket.emit("error", { error: "Internal Server Error" });
    //   }
    // });

    // socket.on("newMessage", async ({ conversationId, text, userId }) => {
    //   console.log("Tin nhắn từ user:");
    //   io.emit("messageSent", { message: "Message sent" });
    //   try {
    //     let conversation = await Conversation.findOne({ user: userId });
    //     // socket.emit("messageSent", { message: "Message sent" });
    //     if (!conversation) {
    //       const admins = await Users.find({ role: "Admin" }).select("_id");
    //       conversation = await Conversation.create({
    //         user: userId,
    //         admins: admins.map((admin) => admin._id),
    //       });
    //     }
    //     const message = await Message.create({
    //       conversationId: conversation._id || conversationId,
    //       sender: userId,
    //       senderType: "User",
    //       text,
    //     });
    //     conversation.messages.push(message._id);
    //     conversation.updatedAt = Date.now();
    //     await conversation.save();
    //     // Phát tin nhắn đến tất cả admin đang trực tuyến
    //     const adminIds = conversation.admins.map((admin) => admin.toString());
    //     for (const adminId of adminIds) {
    //       io.to(adminId).emit("receiveMessage", { message });
    //     }
    //     return io.emit("messageSent", { message });
    //   } catch (error) {
    //     console.error("Error:", error);
    //     socket.emit("error", { error: "Internal Server Error" });
    //   }
    // });

    socket.on("setup", (userData) => {
      console.log("User connected: ", userData);
      socket.join(userData);

      socket.emit("connected");
    });

    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log("User joined Room", room);
    });

    socket.on("messageRecieved", (newMessageRecieved) => {
      console.log("newMessageRecieved:", newMessageRecieved);
    });

    socket.on("newMessage", (newMessageRecieved) => {
      console.log("newMessage:");
      if (!newMessageRecieved.sender.listUsers)
        return console.log("Khong co conversation.listUsers");

      // const uniqueUsers = [...new Set(newMessageRecieved.sender.listUsers)];

      socket.emit("agh", newMessageRecieved);

      newMessageRecieved.sender.listUsers.forEach((user) => {
        if (user == newMessageRecieved.sender._id) return;
        // console.log(`Notifying user ${user} about the message.`);
        socket.to(user).emit("messageRecieved", newMessageRecieved);
      });
    });

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      delete userSocketMap[userId]; // Xóa socket id khi người dùng ngắt kết nối
    });
  });

  // Gán io vào app để có thể sử dụng trong controller
  app.set("io", io);
};

const userSocketMap = {};

// Hàm tìm socketId của người nhận
export function getReceiverSocketId(conversationId) {
  console.log(userSocketMap);
  return userSocketMap[conversationId];
}
