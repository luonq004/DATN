import { useUserContext } from "@/common/context/UserProvider";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Comment = () => {
  const { _id } = useUserContext();

  // console.log("adminId", _id);

  const sendUserMessageSocket = (conversationId, text, userId) => {
    socket.emit("newMessage", { conversationId, text, userId });
  };

  // Ví dụ sử dụng trong sự kiện gửi tin nhắn
  const handleSendMessage = () => {
    const conversationId = "64f8a2e0b9f1a8c77dabc123"; // ID của cuộc trò chuyện
    const text = "Hello from user!"; // Nội dung tin nhắn
    const userId = _id; // ID của admin (thường lấy từ session hoặc state)

    sendUserMessageSocket(conversationId, text, userId);
  };

  return (
    <div className="absolute bottom-2 flex justify-between w-full gap-2 px-2">
      <input
        className="flex-1 w-full border-[#b8cd06] rounded-lg ring-0 outline-0 focus:ring-0 focus:border-[#b8cd06] p-2"
        type="text"
      />
      <Button onClick={handleSendMessage}>Gửi</Button>
    </div>
  );
};

export default Comment;
