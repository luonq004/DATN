
import { Outlet } from "react-router-dom";
import Sidebar from "./_component/Sidebar";
import Navbar from "./_component/Navbar";

const LayoutAdmin = () => {
    return (
        <>
            <div className="h-full">
                <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 bg-white">
                    <Navbar />
                </div>
                <div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50">
                    <Sidebar />
                </div>
                <main className="relative md:pl-56 pt-[80px] h-full z-10">
                    <div className="m-5">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default LayoutAdmin;
