import { useAuthStore } from "@/common/context/useAuthStore";
import { useChatStore } from "@/common/context/useChatStore";
import { useUserContext } from "@/common/context/UserProvider";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

const ContentChat = () => {
  const [message, setMessage] = useState("");
  const { _id } = useUserContext();

  const {
    listMessage,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage,
  } = useChatStore();

  const { isCheckingAuth, authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser!);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && listMessage) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listMessage]);

  async function handleSendMessage() {
    if (!message) return;

    try {
      await sendMessage(message, _id);
      setMessage(""); // Chỉ xóa nội dung sau khi gửi thành công
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  // if (isMessagesLoading || isCheckingAuth) {
  //   return (
  //     <div className="flex-1 flex flex-col overflow-auto">
  //       <p>Loading</p>
  //       {/* <ChatHeader />
  //       <MessageSkeleton />
  //       <MessageInput /> */}
  //     </div>
  //   );
  // }

  console.log(listMessage);

  return (
    <div className="relative w-full">
      <div className=" border-b pb-4">
        <div className="w-full max-h-[70vh] min-h-[70vh]">
          <ScrollableFeed>
            {listMessage?.messages?.length > 0 ? (
              listMessage.messages.map((message) => (
                <div key={message._id}>
                  {message.senderType === "Admin" ? (
                    <div className="flex gap-2 rounded-lg text-sm mr-auto mt-4 justify-end">
                      <p className="bg-[#b8cd06] text-primary-foreground mr-2 max-w-[75%] px-3 py-2 break-words rounded-lg">
                        {message.text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2 rounded-lg text-sm ml-2 mt-4">
                      <img
                        className="w-8 h-8 rounded-full justify-end"
                        src={message.sender.imageUrl}
                        alt={`${message.sender.firstName} ${message.sender.lastName}`}
                      />
                      <p className="bg-gray-200 max-w-[75%] px-3 py-2 break-words rounded-lg">
                        {message.text}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500"></p>
            )}
          </ScrollableFeed>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border-gray-200"
          disabled={selectedUser ? false : true}
        />
        <Button
          className=""
          disabled={selectedUser ? false : true}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ContentChat;
