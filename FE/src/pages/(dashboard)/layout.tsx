import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./_components/SideBar";

const LayoutAdmin = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return; // Đợi đến khi user được tải xong
    }

    // Kiểm tra quyền truy cập
    if (!user || (user.publicMetadata.role !== "Admin" && user.publicMetadata.role !== "Employee")) {
      navigate("/404", { replace: true }); // Chuyển hướng nếu không đủ quyền
    }
  }, [user, isLoaded, navigate]);

  // Trì hoãn render đến khi dữ liệu được tải
  if (!isLoaded) {
    return null;
  }

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
