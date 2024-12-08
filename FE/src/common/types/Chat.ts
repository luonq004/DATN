export interface IMessage {
  _id: string;
  conversationId: string;
  sender: string;
  senderType: "User" | "Admin";
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageData {
  content: string;
  adminId: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface IUserNested {
  user: IUser;
}

export interface IConversation {
  _id: string;
  user: IUser;
  updatedAt: Date;
}

export interface IChatStoreState {
  messages: IMessage[];
  conversations: IConversation[];
  selectedUser: string | null;
  isConversationsLoading: boolean;
  isMessagesLoading: boolean;
}

export interface ChatStoreActions {
  getConversations: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: IMessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: string) => void;
}
