import { create } from "zustand";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ChatStoreActions, IChatStoreState } from "../types/Chat";
const apiUrl = import.meta.env.VITE_API_URL;

export const useChatStore = create<IChatStoreState & ChatStoreActions>(
  (set, get) => ({
    messages: [],
    conversations: [],
    selectedUser: null,
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
        set({ messages: res.data });
      } catch (error) {
        toast({
          variant: "destructive",
          title: error.response.data.message,
        });
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessage: async (messageData) => {
      const { selectedUser, messages } = get();
      try {
        const res = await axios.post(
          `/messages/send/${selectedUser!}`,
          messageData
        );
        set({ messages: [...messages, res.data] });
      } catch (error) {
        toast({
          variant: "destructive",
          title: error.response.data.message,
        });
      }
    },

    subscribeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;

      const socket = useAuthStore.getState().socket;

      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser =
          newMessage.senderId === selectedUser;
        if (!isMessageSentFromSelectedUser) return;

        set({
          messages: [...get().messages, newMessage],
        });
      });
    },

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
  })
);
