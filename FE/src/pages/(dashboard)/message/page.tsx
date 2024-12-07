import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Đăng ký sự kiện "messageSent"
    socket.on("messageSent", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup function: Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      socket.off("messageSent");
    };
  }, []);

  console.log("messages", messages);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagePage;
