import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./_components/SideBar";
import { useUserContext } from "@/common/context/UserProvider";

const LayoutAdmin = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(true);

  const { role } = useUserContext();

  // useEffect(() => {
  //   if (!isLoaded) {
  //     return; // Chờ đến khi user được tải xong
  //   }

  //   // Kiểm tra quyền truy cập
  //   if (
  //     user &&
  //     (user.publicMetadata.role === "Admin" ||
  //       user.publicMetadata.role === "Employee")
  //   ) {
  //     setIsAuthorized(true); // Xác nhận quyền truy cập
  //   } else {
  //     navigate("*", { replace: true });
  //   }
  // }, [user, isLoaded, navigate]);

  // // Trì hoãn render giao diện khi đang kiểm tra quyền truy cập
  // if (!isLoaded || !isAuthorized) {
  //   return null;
  // }

  // console.log("user", user);

  // if (!isLoaded) {
  //   return null; // Chờ đến khi user được tải xong
  // }

  // console.log("user", user);

  // if (user && user.firstName !== "Anh") {
  //   navigate("*", { replace: true });
  // }

  // Nếu đã xác thực quyền truy cập, render giao diện
  return (
    <div className="bg-white flex min-h-screen">
      <Sidebar />
      <div className="w-full">
        <div className="h-20 bg-red-400"></div>
        <div className="bg-slate-300 rounded-lg m-7 min-h-80">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
