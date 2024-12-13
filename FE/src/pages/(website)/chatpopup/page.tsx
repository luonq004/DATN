import { useEffect, useState } from "react";
import { CiChat2 } from "react-icons/ci";
import Comment from "./components/Comment";
import Content from "./components/Content";
// import { useChatStore } from "@/common/context/useChatStore";

import { io } from "socket.io-client";
import { useUserContext } from "@/common/context/UserProvider";
import { useGetConversation } from "./actions/useGetConversation";

const socket = io("http://localhost:3000");

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { _id } = useUserContext();

  const { conversation, isLoading, error } = useGetConversation(_id!);

  useEffect(() => {
    if (!_id) return;
    socket.emit("setup", _id);
    socket.emit("joinChat", conversation?._id);
  }, []);

  useEffect(() => {});

  if (isLoading) return <div>Loading...</div>;

  console.log("conversation", conversation);

  return (
    <>
      <div
        className="fixed bottom-[4%] rounded-full right-5 z-10 bg-white p-2 border-4 shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiChat2 className="text-3xl text-[#b8cd06]" />
      </div>

      <div
        className={`w-[340px] max-w-[340px] fixed bottom-[12%] right-5 border h-[410px] bg-white rounded-md text-black ${
          isOpen ? "opacity-100 z-40" : "opacity-0 z-0"
        }`}
      >
        <div className="h-[325px] py-5">
          <Content />
        </div>

        <Comment />
      </div>
    </>
  );
};

export default ChatPopup;
