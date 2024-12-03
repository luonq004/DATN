import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080"); // Thay bằng URL của server Socket.IO

function TestSocket() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Lắng nghe sự kiện khi kết nối thành công
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server with id:', socket.id);
    });
  
    // Lắng nghe sự kiện nhận tin nhắn từ server
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  
    // Dọn dẹp kết nối khi component bị unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message); // Gửi tin nhắn lên server
      setChat((prev) => [...prev, `Bạn: ${message}`]);
      setMessage(""); // Reset ô nhập liệu
    }
  };

  return (
    <div
      className="socket-test w-full p-4"
      style={{ backgroundColor: "#16161a" }}
    >
      <h1
        className="text-center font-bold text-xl mb-2"
        style={{ color: "#dfdfdf" }}
      >
        Test Socket.IO
      </h1>
      <div
        className="chat-box mb-4 p-2 rounded"
        style={{ backgroundColor: "#242424", color: "#dfdfdf" }}
      >
        <h2 className="text-lg font-bold">Chat</h2>
        <div className="chat-messages h-40 overflow-y-scroll">
          {chat.map((msg, index) => (
            <p key={index} className="chat-message">
              {msg}
            </p>
          ))}
        </div>
      </div>
      <div className="message-input flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded"
          placeholder="Nhập tin nhắn..."
          style={{ backgroundColor: "#2d2d2d", color: "#dfdfdf" }}
        />
        <button
          onClick={sendMessage}
          className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

export default TestSocket;
