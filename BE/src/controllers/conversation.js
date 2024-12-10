import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import User from "../models/users.js";
import { getReceiverSocketId } from "./socket.js";

export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({})
      .populate("user", "firstName lastName imageUrl") // Lấy thông tin user
      .select("_id user updatedAt") // Chỉ lấy các trường cần thiết
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessageFromAdmin = async (req, res) => {
  const { conversationId } = req.params;
  const { adminId, text, receiverId } = req.body;

  // console.log("RECEIVER ID : ", receiverId);

  try {
    // Kiểm tra xem cuộc trò chuyện có tồn tại không
    const conversation = await Conversation.findById(conversationId);
    const user = await User.findById(adminId);
    const { role, _id, imageUrl, firstName, lastName } = user;

    if (!conversation) {
      return res.status(404).json({ error: "Không tìm thấy cuộc trò chuyện." });
    }

    // Tạo tin nhắn mới
    const message = await Message.create({
      conversationId,
      sender: adminId,
      senderType: "Admin",
      text,
    });

    // Cập nhật cuộc trò chuyện
    conversation.messages.push(message._id);
    conversation.updatedAt = Date.now();
    await conversation.save();

    const result = {
      ...message._doc,
      sender: {
        _id,
        imageUrl,
        firstName,
        lastName,
        role,
      },
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    const io = req.app.get("io");
    // console.log(io);

    if (receiverSocketId) {
      console.log(`Sending message to socketId: ${receiverSocketId}`, result); // Thêm log để kiểm tra
      io.to(receiverSocketId).emit("newMessage", result);
    } else {
      console.log("Receiver socketId not found!");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessageFromUser = async (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;

  try {
    let conversation = await Conversation.findOne({ user: userId });

    if (!conversation) {
      const admins = await User.find({ role: "admin" }).select("_id");

      conversation = await Conversation.create({
        user: userId,
        admins: admins.map((admin) => admin._id),
      });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      sender: userId,
      senderType: "User",
      text,
    });

    conversation.messages.push(message._id);
    conversation.updatedAt = Date.now();
    await conversation.save();

    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    // Lấy cuộc trò chuyện dựa trên userId và populate admins + messages
    const conversation = await Conversation.findOne({ user: userId })
      .populate("admins", "name") // Lấy tên của admin
      .populate({
        path: "messages", // Lấy messages
        select: "text sender senderType createdAt", // Chỉ lấy các trường cần thiết
        populate: {
          path: "sender", // Populate sender (User hoặc Admin)
          select: "firstName lastName imageUrl role ", // Chỉ lấy tên và vai trò
        },
      });

    if (!conversation) {
      return res.status(404).json({ error: "Không tìm thấy cuộc trò chuyện" });
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
