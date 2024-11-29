import NavbarRoutes from "./NavbarRoutes";

const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-black shadow-sm ">
            {/* <MobileSidebar /> */}
            <NavbarRoutes />
        </div>
    );
};

export default Navbar;