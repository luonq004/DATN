import { useUserContext } from "@/common/context/UserProvider";
import { saveUserToDatabase } from "@/common/hooks/useCheckUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const LayoutWebsite = () => {
  const { user } = useUser();
  const isUserSaved = useRef(false);
  const { login } = useUserContext();

  useEffect(() => {
    const saveUserIfNeeded = async () => {
      if (user && !isUserSaved.current) {
        try {
          // Gọi hàm saveUserToDatabase với await
          const data = await saveUserToDatabase(user.id);
          login(data._id); // Lưu _id vào context
          isUserSaved.current = true; // Đánh dấu đã lưu
        } catch (error) {
          console.error("Lỗi khi lưu user vào database:", error);
        }
      }
    };

    saveUserIfNeeded(); // Gọi hàm async bên trong useEffect
  }, [user, login]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWebsite;
