import ContentChat from "./components/ContentChat";
import SideBarUser from "./components/SideBarUser";

const MessagePage = () => {
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
