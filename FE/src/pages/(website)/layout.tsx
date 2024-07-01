import { Link, Outlet } from "react-router-dom";

import logo from "../../assets/logo.png";

import customer from "@/assets/img/customer.jpg";

import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import NavMobile from "../../components/NavMobile";
import { ModeToggle } from "@/components/mode-toggle";

const LayoutWebsite = () => {
  return (
    <>
      <header className="bg-light-300 py-3">
        <div className="flex justify-between items-center max-w-[1408px] mx-auto px-4">
          <div className="flex items-center sm:gap-2 xl:gap-0">
            <NavMobile />
            <a className="" href="#">
              <img className="w-28" src={logo} alt="Logo Fabric Focus" />
            </a>
          </div>

          <div className="flex gap-4 items-center">
            {/* input search */}
            <div className="relative text-white">
              <Input
                className="pl-4 rounded-full bg-transparent py-0 xl:w-[300px] placeholder:text-white outline-none focus:border-none focus:outline-none"
                type="text"
                placeholder="Search product..."
              />
              <CiSearch className="absolute bottom-[11px] right-2 text-xl" />
            </div>

            <div className="text-2xl flex gap-4 text-white border-r pr-4">
              <div className="relative">
                <Link to="/wishlist">
                  <CiHeart />
                  <span className="absolute block w-2 h-2 bg-red-500 rounded-full top-1 right-0"></span>
                </Link>
              </div>
              <div className="relative">
                <Link to="/message">
                  <CiBellOn />
                  <span className="absolute block w-2 h-2 bg-red-500 rounded-full top-1 right-0"></span>
                </Link>
              </div>
              <div className="relative">
                <IoBagOutline />
                <span className="absolute block w-2 h-2 bg-red-500 rounded-full top-1 right-0"></span>
              </div>
            </div>
            <img className="w-7 rounded-full" src={customer} alt="" />
            <ModeToggle />
          </div>
        </div>

        {/* Nav */}
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-red-400">
                Item One
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}

        {/* <nav>
          <ul>
            <li>
              <a href="">Shop All</a>
            </li>
            <li>
              <a href=""></a>
            </li>
            <li>
              <a href=""></a>
            </li>
            <li>
              <a href=""></a>
            </li>
            <li>
              <a href=""></a>
            </li>
            <li>
              <a href=""></a>
            </li>
          </ul>
        </nav> */}
      </header>
      {/* <hr /> */}

      {/* ND Cua Page Detail */}
      <Outlet />

      {/* Fooetr   */}
      <footer>Footer</footer>
    </>
  );
};

export default LayoutWebsite;
