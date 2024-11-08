import { useState } from "react";
import logo from "../../../../assets/logo.png";
import SearchInput from "./SearchInput";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      <header className="bg-white shadow-md border-gray-200 relative z-50">
        <div className="mx-auto px-4 md:px-12 flex items-center justify-between text-xs text-gray-600">
          {/* Logo và các icon ở chế độ responsive */}
          <div className="flex items-center space-x-4 md:space-x-0">
            <div className="w-36">
              <img src={logo} alt="Logo" />
            </div>

            {/* Icon tìm kiếm, yêu thích và giỏ hàng - chỉ hiển thị khi ở màn hình nhỏ */}
            <div className="flex items-center space-x-4 md:hidden">
              <button onClick={toggleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute -top-2 left-3 bg-lime-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
              </div>
            </div>
          </div>

          {/* Liên hệ và Email - chỉ hiện trên màn hình lớn */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center border-l h-14 pl-4">
              <span className="font-semibold ml-4">LIÊN HỆ:</span>
              <span className="ml-1">+3 (523) 555 123 8745</span>
            </div>
            <span className="mx-6 border-r h-14"></span>
            <span className="font-semibold">EMAIL:</span>
            <span className="flex items-center pr-6 ml-1 border-r h-14">
              OFFICE@EXZO.COM
            </span>
          </div>

          {/* Đăng nhập, Ngôn ngữ, Yêu thích, Giỏ hàng - chỉ hiện trên màn hình lớn */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center pl-6 gap-1 border-l border-gray-300 h-14">
              <a href="#" className="hover:underline font-semibold">
                ĐĂNG NHẬP
              </a>
              <span className="text-gray-500">HOẶC</span>
              <a href="#" className="hover:underline font-semibold">
                ĐĂNG KÝ
              </a>
            </div>
            <span className="border-l border-gray-300 h-14"></span>
            <button onClick={toggleSearch} className="text-gray-600 hover:text-lime-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  fillRule="evenodd"
                  d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="absolute -top-2 left-3 bg-lime-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </div>
          </div>
        </div>

        {/* Ô tìm kiếm */}
        <div
          className={`absolute top-36 left-0 w-full bg-white px-16 z-40 transition-all duration-500 ease-in-out ${
            isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
          }`}
          style={{ pointerEvents: isSearchVisible ? "auto" : "none" }}
        >
          <SearchInput toggleSearch={toggleSearch} />
        </div>
      </header>
    </>
  );
};

export default Header;
