import { Link } from "react-router-dom";
import logo3 from "../../../assets/logo3.jpg";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-black shadow-sm">
            <div className="p-6">
                <Link to="/">
                    <img className="w-29" src={logo3} alt="Logo Fabric Focus" />
                </Link>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
};

export default Sidebar;