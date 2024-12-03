import { Server } from "socket.io";

// Cấu hình và xử lý các sự kiện Socket.IO
export const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Cho phép kết nối từ địa chỉ này
      methods: ["GET", "POST"], // Các phương thức HTTP được phép
    },
  });

  io.on("connection", (socket) => {
    console.log("Client đã kết nối:", socket.id);

    // Lắng nghe sự kiện gửi tin nhắn
    socket.on("send_message", (message) => {
      console.log("Tin nhắn nhận được:", message);
      io.emit("receive_message", message); // Phát tin nhắn đến tất cả các client
    });

    // Lắng nghe sự kiện gửi thông báo
    socket.on("send_notification", (notification) => {
      console.log("Thông báo nhận được:", notification);
      io.emit("receive_notification", notification); // Phát thông báo đến tất cả các client
    });

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log("Client đã ngắt kết nối:", socket.id);
    });
  });
};
