import { useEffect, useState } from "react";
import { SlHeart } from "react-icons/sl";
import { IoBagHandleSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

import MobileNav from "@/components/MobileNav";

import { Link } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn, openSignUp } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [showUserInfo, setShowUserInfo] = useState(false);

  const opensignin = async () => {
    await openSignIn({
      redirectUrl: "/",
    });
  };

  const opensignup = async () => {
    await openSignUp({
      redirectUrl: "/",
    });
  };

  const fetchLogo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logo");
      const data = await response.json();

      if (data && data.length > 0) {
        setLogoUrl(data[0].image);
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const timer = setTimeout(() => {
        setShowUserInfo(true); // Sau 1 giây sẽ hiển thị thông tin người dùng
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn]); // Chạy lại effect khi trạng thái người dùng thay đổi

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-40 transition-all duration-300 ease-in-out`}
      >
        {/* Header TOP */}
        <div
          className={`bg-white h-[40px] md:h-[60px] border-b border-b-[#eee]`}
        >
          <div className="border-x-0 lg:border-x-[50px] border-transparent relative">
            <div className="flex">
              {/* Contact INFO */}
              <div className="lg:w-5/12 hidden lg:inline px-[15px] ">
                <div className="border-l border-[#eee] border-[0] py-[10px] lg:px-[10px] lg:py-[20px] xl:px-[25px] xl:py-5 text-[10px] leading-5 text-[#888] uppercase relative inline-block">
                  <b className="text-[#555] font-bold">liên hệ: </b>
                  <a
                    className="cursor-pointer hover:text-[#b8cd06]"
                    href="tel:+3 (523) 555 123 8745"
                  >
                    +3 (523) 555 123 8745
                  </a>
                </div>
                {/* CLASS BI LAP */}
                <div className="border-x border-[#eee] border-[0] py-[10px] lg:px-[10px] lg:py-[20px] xl:px-[25px] xl:py-5 text-[10px] leading-5 text-[#888] uppercase relative inline-block">
                  <b className="text-[#555] font-bold">email: </b>
                  <a
                    className="cursor-pointer hover:text-[#b8cd06]"
                    href="mailto:office@exzo.com"
                  >
                    office@exzo.com
                  </a>
                </div>
              </div>

              {/* NAVIGATION */}
              <div className="w-full lg:w-7/12 text-right flex justify-between lg:justify-end items-center px-[15px]">
                <div className="border-l border-r lg:border-r-0 border-[#eee] px-[15px] py-[10px] md:p-5 lg:px-[10px] lg:py-[20px] xl:px-[25px] xl:py-5 text-[10px] leading-5 text-[#555] uppercase">
                  {isSignedIn && showUserInfo ? (
                    <Link className="flex gap-2" to="/users">
                      <img
                        className="rounded-full w-[20px] h-[20px] object-cover"
                        src={user?.imageUrl}
                        alt=""
                      />{" "}
                      <span>
                        <span>{user?.firstName}</span>
                        <span className="ml-0.5">{user?.lastName}</span>
                      </span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="#"
                        onClick={opensignin}
                        className="cursor-pointer hover:text-[#b8cd06] transition-all"
                      >
                        <b>Đăng nhập</b>
                      </Link>
                      &nbsp; hoặc &nbsp;
                      <Link
                        to="#"
                        onClick={opensignup}
                        className="cursor-pointer hover:text-[#b8cd06] transition-all"
                      >
                        <b>Đăng ký</b>
                      </Link>
                    </>
                  )}
                </div>

                <div className="border-l border-[#eee] py-[10px] lg:px-[10px] lg:py-[20px] xl:px-[25px] xl:py-5 text-[10px] leading-5 text-[#555] uppercase hidden lg:inline">
                  <a
                    href="#"
                    className="cursor-pointer hover:text-[#b8cd06] transition-all"
                  >
                    <SlHeart className="text-xl" />
                  </a>
                </div>

                <div className="border-x border-[#eee] py-[10px] lg:px-[10px] lg:py-[20px] xl:px-[25px] xl:py-5 text-[10px] leading-5 text-[#555] uppercase relative hidden lg:inline">
                  <Link
                    to="/cart"
                    className="cursor-pointer text-[#555] hover:text-[#b8cd06] transition-all flex items-center"
                  >
                    <b className="font-bold">your bag</b>
                    <span className="relative">
                      <IoBagHandleSharp className="text-xl ml-1 mr-2" />
                      <span className="absolute -top-2 -right-1 bg-[#b8cd06] text-white text-[10px] w-[20px] h-[20px] text-center rounded-full">
                        5
                      </span>
                    </span>
                  </Link>
                </div>

                {/* HumBurger Icon */}
                <MobileNav />
              </div>
            </div>
          </div>
        </div>

        {/* Header BOTTOM */}
        <div className="h-[60px] md:h-[98px] bg-white border-b border-b-[#eee] shadow-custom">
          <div className="border-x-0 lg:border-x-[50px] border-transparent h-full">
            <div className="flex h-full items-center">
              <Link to="/" className="w-4/12 md:w-2/12 px-[15px]">
                <img
                  className="w-20 md:w-36"
                  src={logoUrl || "fallback_logo.jpg"}
                  alt="Logo"
                />
              </Link>

              <div className="w-8/12 md:w-10/12 justify-items-end px-[15px]">
                <nav className="hidden lg:block">
                  <ul className="flex">
                    <li className="">
                      <a
                        className="text-[11px] leading-4 uppercase font-bold rounded-2xl px-5 py-[9px] bg-[#b8cd06] text-white hover:shadow-custom transition-all"
                        href="#"
                      >
                        Trang chủ
                      </a>
                    </li>
                    <li className="">
                      <Link
                        className="text-[11px] leading-4 uppercase text-[#343434] font-bold rounded-2xl px-5 py-[9px] hover:bg-[#b8cd06] hover:text-white hover:shadow-custom transition-all"
                        to="/about"
                      >
                        Về chúng tôi
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        className="text-[11px] leading-4 uppercase text-[#343434] font-bold rounded-2xl px-5 py-[9px] hover:bg-[#b8cd06] hover:text-white hover:shadow-custom transition-all"
                        to="/shopping"
                      >
                        Sản phẩm
                      </Link>
                    </li>
                    <li className="">
                      <a
                        className="text-[11px] leading-4 uppercase text-[#343434] font-bold rounded-2xl px-5 py-[9px] hover:bg-[#b8cd06] hover:text-white hover:shadow-custom transition-all"
                        href="#"
                      >
                        Dịch vụ
                      </a>
                    </li>
                    <li className="">
                      <a
                        className="text-[11px] leading-4 uppercase text-[#343434] font-bold rounded-2xl px-5 py-[9px] hover:bg-[#b8cd06] hover:text-white hover:shadow-custom transition-all"
                        href="#"
                      >
                        Bài viết
                      </a>
                    </li>
                    <li className="">
                      <Link
                        className="text-[11px] leading-4 uppercase text-[#343434] font-bold rounded-2xl px-5 py-[9px] hover:bg-[#b8cd06] hover:text-white hover:shadow-custom transition-all"
                        to="/"
                      >
                        Trưng bày
                      </Link>
                    </li>

                    <li className="">
                      <a
                        className="text-[11px] leading-4 uppercase text-[#343434] font-bold rounded-2xl px-5 py-[9px] hover:bg-[#b8cd06] hover:text-white hover:shadow-custom transition-all"
                        href="#"
                      >
                        Liên hệ
                      </a>
                    </li>
                    <li className="">
                      <IoSearch
                        className="text-2xl ml-2 hover:cursor-pointer hover:text-[#b8cd06] transition-all"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                    </li>
                  </ul>
                </nav>

                <div className="lg:hidden flex gap-3">
                  <IoSearch
                    className="text-3xl ml-2 hover:cursor-pointer hover:text-[#b8cd06] transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <SlHeart className="text-3xl ml-2 hover:cursor-pointer hover:text-[#b8cd06] transition-all" />
                  <span className="relative mr-2">
                    <IoBagHandleSharp className="text-3xl ml-2 hover:cursor-pointer hover:text-[#b8cd06] transition-all" />
                    <span className="absolute size-5 rounded-full text-white text-[11px] leading-5 text-center bg-[#b8cd06] top-[-39%] right-[-23%]">
                      5
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className={`relative -z-10 mx-[15px]`}>
              <div
                className={`py-10 pb-[15px] md:pb-10 absolute w-full top-0 left-0 shadow-custom_input transition-all duration-300 bg-white ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
                }`}
              >
                <div className="px-[15px] flex justify-center">
                  <IoIosClose
                    className="text-3xl absolute right-0 top-0 mt-2 mr-2 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  />

                  <input
                    type="text"
                    placeholder="Nhập từ khóa tìm kiếm"
                    className="bg-white border-0 border-b border-b-[#eee] outline-0 focus:ring-0 focus:border-b-[#b8cd06] text-[#555] w-full md:w-2/4"
                  />
                  <button>
                    <IoSearch className="text-2xl hover:text-[#b8cd06]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="block h-[100px] md:h-[159px]"></div>
    </>
  );
};

export default Header;
