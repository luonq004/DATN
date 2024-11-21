import { saveUserToDatabase } from "@/common/hooks/useCheckUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import AccountLockedNotification from "@/components/UserbanError";

const LayoutWebsite = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const isUserSaved = useRef(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [accountStatus, setAccountStatus] = useState<
    "banned" | "deleted" | null
  >(null);

  // Hàm để kiểm tra trạng thái khóa
  const checkBanStatus = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}`
      );
      const data = response.data;
      if (data.clerkData?.isBanned) {
        // Nếu tài khoản bị khóa
        setAccountStatus("banned");
        localStorage.setItem("accountLocked", "true");
        setIsAccountLocked(true);
        signOut();
      } else if (data.clerkData?.isDeleted) {
        // Nếu tài khoản bị xóa
        setAccountStatus("deleted");
        localStorage.setItem("accountDeleted", "true");
        setIsAccountLocked(true);
        signOut();
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái ban:", error);
    }
  };

  useEffect(() => {
     // Kiểm tra trạng thái tài khoản trong localStorage
     if (localStorage.getItem("accountLocked") === "true") {
      setAccountStatus("banned");
      setIsAccountLocked(true);
    } else if (localStorage.getItem("accountDeleted") === "true") {
      setAccountStatus("deleted");
      setIsAccountLocked(true);
    }

    if (user) {
      // Gọi saveUserToDatabase một lần
      if (!isUserSaved.current) {
        saveUserToDatabase(user.id);
        isUserSaved.current = true;
      }

      // Kiểm tra trạng thái khóa khi người dùng đăng nhập
      checkBanStatus(user.id);
    }
  }, [user]);

  const clearAccountLockedStatus = () => {
    // Xóa trạng thái từ localStorage và ẩn thông báo
    localStorage.removeItem("accountLocked");
    localStorage.removeItem("accountDeleted");
    setIsAccountLocked(false);
    setAccountStatus(null);
  };

  return (
    <>
      {(isAccountLocked || accountStatus) && (
        <AccountLockedNotification onClose={clearAccountLockedStatus} />
      )}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWebsite;
