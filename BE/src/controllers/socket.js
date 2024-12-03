import { Server } from "socket.io";

// Cấu hình và xử lý các sự kiện Socket.IO
export const setupSocketIO = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client đã kết nối:", socket.id);

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

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log("Client đã ngắt kết nối:", socket.id);
    });
  });
  // Gán io vào app để có thể sử dụng trong controller
  app.set("io", io);
};

