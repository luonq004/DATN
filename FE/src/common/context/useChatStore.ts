import { create } from "zustand";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ChatStoreActions, IChatStoreState } from "../types/Chat";
import { useAuthStore } from "./useAuthStore";
const apiUrl = import.meta.env.VITE_API_URL;

export const useChatStore = create<IChatStoreState & ChatStoreActions>(
  (set, get) => ({
    listMessage: [],
    conversations: [],
    selectedUser: null,
    selectedConversation: null,
    isConversationsLoading: false,
    isMessagesLoading: false,

    getConversations: async () => {
      set({ isConversationsLoading: true });
      try {
        const res = await axios.get(`${apiUrl}/conversation`);
        set({ conversations: res.data });
      } catch (error) {
        toast({
          variant: "destructive",
          title: error.response.data.message,
        });
      } finally {
        set({ isConversationsLoading: false });
      }
    },

    getMessages: async (conversationId: string) => {
      set({ isMessagesLoading: true });
      try {
        const res = await axios.get(`${apiUrl}/conversation/${conversationId}`);

        set({ listMessage: res.data });
      } catch (error) {
        console.log(error);
        // toast({
        //   variant: "destructive",
        //   title: error.response.data.message,
        // });
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (messageData, adminId) => {
      const { selectedConversation, listMessage, selectedUser } = get();
      try {
        const res = await axios.post(
          `${apiUrl}/conversation/${selectedConversation}/messageAdmin`,
          {
            text: messageData,
            adminId,
            receiverId: selectedUser,
          }
        );

        // console.log("RETURN: ", res.data);

        set({
          listMessage: {
            ...listMessage, // Giữ nguyên các thuộc tính khác của listMessage
            messages: [...listMessage.messages, res.data], // Cập nhật messages
          },
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: error.response.data.message,
        });
      }
    },

    subscribeToMessages: () => {
      const { selectedUser } = get();

      console.log("selectedUser", selectedUser);

      if (!selectedUser) return;

      const socket = useAuthStore.getState().socket;
      // console.log("socket", socket);

      socket.on("newMessage", (newMessage) => {
        // console.log("listMessage", get().listMessage);
        const isMessageSentFromSelectedUser =
          newMessage.senderId === selectedUser;

        // console.log(
        //   "isMessageSentFromSelectedUser",
        //   isMessageSentFromSelectedUser
        // );

        // if (!isMessageSentFromSelectedUser) return;

        set({
          listMessage: {
            ...get().listMessage, // Giữ nguyên các thuộc tính khác của listMessage
            messages: [...get().listMessage.messages, newMessage], // Cập nhật messages
          },
        });

        // console.log("NEW: ", get().listMessage.messages);
      });
    },

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
  })
);
