import { useChatStore } from "@/common/context/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { useSearchParams } from "react-router-dom";

const SideBarUser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const conversationSelect = searchParams.get("conversation");

  const {
    conversations,
    getConversations,
    isConversationsLoading,
    setSelectedUser,
  } = useChatStore();

  useEffect(() => {
    getConversations();
    if (conversationSelect) setSelectedUser(conversationSelect);
  }, [getConversations]);

  if (isConversationsLoading) return <SidebarSkeleton />;

  return (
    <div className="cursor-pointer w-[120px] lg:w-[340px] max-h-[78vh] min-h-[78vh] overflow-y-auto border-r pt-4">
      {conversations.map((user) => (
        <div
          className={`flex gap-2 items-center w-full hover:bg-slate-100 px-4 py-2 mb-4 ${
            conversationSelect === user._id ? "bg-slate-100" : ""
          }`}
          key={user._id}
          onClick={() => {
            searchParams.set("conversation", user._id);
            setSearchParams(searchParams);
            setSelectedUser(user._id);
          }}
        >
          <img
            className="size-12 rounded-full"
            src={user.user.imageUrl}
            alt="Ảnh user"
          />
          <div className="flex flex-col w-full">
            <span className="line-clamp-1 hidden lg:block">
              {user.user.firstName} {user.user.lastName}
            </span>
            <span className="hidden lg:block text-gray-400">1 ngày trước</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBarUser;

// onClick={() => {
//   searchParams.set("category", category._id);

//   if (searchParams.get("page")) searchParams.set("page", "1");
//   setSearchParams(searchParams);
// }}
