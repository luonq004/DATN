import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./_components/SideBar";

const LayoutAdmin = () => {
  // const location = useLocation();
  // console.log(location);

  return (
    <div className="bg-white flex min-h-screen overflow-hidden">
      <Sidebar />

      <div className="bg-[#f5f5f5] w-full">
        <div className="h-20 bg-red-700"></div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
