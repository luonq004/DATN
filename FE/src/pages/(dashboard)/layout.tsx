import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./_components/SideBar";

const LayoutAdmin = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className="bg-white flex min-h-screen">
      <Sidebar />

      <div className="w-full">
        <div className="h-20 bg-red-400"></div>
        <div className="bg-slate-300 rounded-lg m-7 min-h-80"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
