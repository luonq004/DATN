import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Fetch notifications từ backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/notifications"
      ); // API lấy tất cả thông báo
      setNotifications(response.data.notifications);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải thoong báo",
      });
    } finally {
      setLoading(false);
    }
  };

  // UseEffect để fetch notifications khi component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Hàm xử lý xóa thông báo
  const handleDelete = async (notificationId: string) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/notifications/${notificationId}`
      ); // API xóa thông báo
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== notificationId)
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải ảnh lên Cloudinary",
      });
    }
  };

  // Hàm đánh dấu thông báo là đã đọc
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/notifications/mark-as-read/${notificationId}`
      ); // Đảm bảo gọi đúng API
      setNotifications((prevNotifications: any) =>
        prevNotifications.map((notif: any) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải ảnh lên Cloudinary",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Thông Báo</h1>

      {loading ? (
        <p>Đang tải thông báo...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {notifications.length === 0 ? (
            <p>Không có thông báo nào.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((notification: any) => (
                <li
                  key={notification._id}
                  className={`flex items-center p-3 border rounded-md ${
                    notification.isRead ? "bg-gray-100" : "bg-yellow-100"
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold">{notification.message}</p>
                    <p className="text-sm">{notification.userId}</p>

                    <small className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>

                  <div className="ml-4 flex items-center space-x-2">
                    <button
                      className="text-blue-500"
                      onClick={() => handleMarkAsRead(notification._id)}
                    >
                      Đánh dấu đã đọc
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(notification._id)}
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
