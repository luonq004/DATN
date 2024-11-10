import { saveUserToDatabase } from "@/common/hooks/useCheckUser";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const LayoutWebsite = () => {
  const { user } = useUser();
  const isUserSaved = useRef(false);

  useEffect(() => {
    if (user) {
      // Gọi saveUserToDatabase một lần
      if (!isUserSaved.current) {
        saveUserToDatabase(user.id);
        isUserSaved.current = true;
      }

      console.log(user);
    }
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWebsite;
