import { Server } from "socket.io";

// Cấu hình và xử lý các sự kiện Socket.IO
export const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Lắng nghe sự kiện gửi tin nhắn
    socket.on("send_message", (message) => {
      console.log("Message received:", message);
      io.emit("receive_message", message); // Phát tin nhắn đến tất cả client
    });

    // Lắng nghe sự kiện gửi thông báo
    socket.on("send_notification", (notification) => {
      console.log("Notification received:", notification);
      io.emit("receive_notification", notification); // Phát thông báo đến tất cả client
    });

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
