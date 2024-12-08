import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SideBarUser from "./components/SideBarUser";
import ContentChat from "./components/ContentChat";

const socket = io("http://localhost:3000");

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Đăng ký sự kiện "messageSent"
    socket.on("messageSent", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup function: Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      socket.off("messageSent");
    };
  }, []);

  console.log("messages", messages);

  return (
    <div className="bg-white py-2">
      <div className=" mt-5">
        <h1 className="text-2xl font-bold pl-4 pb-4 border-b">Tin nhắn</h1>
        <div className="flex gap-1 overflow-auto">
          <SideBarUser />
          <ContentChat />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
