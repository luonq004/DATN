import Notification from "../models/Notification";

// Tạo thông báo mới
export const createNotification = async (req, res) => {
  try {
    const { userId, message, type = "info", status = "success" } = req.body;

    if (!userId || !message) {
      return res
        .status(400)
        .json({ message: "userId và message là bắt buộc!" });
    }

    const newNotification = new Notification({
      userId,
      message,
      type,
      status,
      isRead: false,
      timestamp: new Date(),
    });
    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể tạo thông báo", error });
  }
};

// Lấy tất cả thông báo cho 
export const getAllNotifications = async (req, res) => {
  try {
    const { status } = req.query; // Phân trang và lọc theo trạng thái nếu cần

    const query = {};
    if (status) {
      query.status = status; // Nếu có tham số status, lọc theo status
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 }) // Sắp xếp mới nhất

    res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể lấy thông báo", error });
  }
};

// Lấy tất cả thông báo theo user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }) // Sắp xếp mới nhất

    const totalNotifications = await Notification.countDocuments({
      userId: req.params.userId,
    });

    res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể lấy thông báo", error });
  }
};

// Xóa thông báo
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: "Thông báo không tìm thấy" });
    }

    res.status(200).json({ message: "Thông báo đã được xóa" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể xóa thông báo", error });
  }
};

// Đánh dấu thông báo là đã đọc
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === "all") {
      // Đánh dấu tất cả thông báo là đã đọc
      const { userId } = req.body; // Lấy userId từ body
      if (!userId) {
        return res.status(400).json({ message: "userId là bắt buộc!" });
      }

      await Notification.updateMany({ userId }, { isRead: true });
      return res
        .status(200)
        .json({ message: "Tất cả thông báo đã được đánh dấu là đã đọc!" });
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Thông báo không tìm thấy" });
    }

    // Phát sự kiện Socket.IO khi thông báo đã đọc
    req.app
      .get("io")
      .to(notification.userId.toString())
      .emit("notification_read", notification);

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể cập nhật thông báo", error });
  }
};

// API trả về số lượng thông báo chưa đọc
export const unreadCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      userId: req.params.userId,
      isRead: false,
    });
    res.json({ unreadCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy số lượng thông báo chưa đọc" });
  }
};