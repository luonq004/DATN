import { Server } from "socket.io";
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

    // Lắng nghe sự kiện gửi tin nhắn
    socket.on("send_message", (message) => {
      console.log("Tin nhắn nhận được:", message);
      io.emit("receive_message", message); // Phát tin nhắn đến tất cả các client
    });

    // Lắng nghe sự kiện 'orderPlaced' từ client
    socket.on("orderPlaced", (orderData) => {
      console.log("Đơn hàng được đặt: ", orderData);

      // Sau khi nhận được đơn hàng, phát sự kiện 'orderNotification' cho tất cả các client
      io.emit("orderNotification", {
        message: `Đơn hàng ${orderData.orderCode} đã được đặt thành công!`,
        orderCode: orderData.orderCode,
      });

      console.log("Đã phát thông báo cho tất cả các client.");
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
      console.log("LUONG:");
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
