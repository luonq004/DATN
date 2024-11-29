import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";;

const NavbarRoutes = () => {
    return (
        <>
            <div className="hidden md:block">
                <SearchInput />
            </div>
            <div className="flex gap-x-2 ml-auto m-5">
                <Link to="/">
                    <Button size="sm" variant="secondary">
                        <LogOut className="h-4 w-4 mr-2" /> Đăng xuất
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default NavbarRoutes;