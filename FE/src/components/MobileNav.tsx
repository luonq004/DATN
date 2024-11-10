import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RxHamburgerMenu } from "react-icons/rx";

const MobileNav = () => {
  return (
    <div className="lg:hidden cursor-pointer max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <RxHamburgerMenu className="text-3xl font-bold" />
          </div>
        </SheetTrigger>
        <SheetContent className="w-[300px] pt-3">
          <SheetHeader>
            <SheetTitle className="border-b pb-4 uppercase font-black text-[#343434] leading-[30px] text-[18px] font-raleway text-left">
              navigation
            </SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
            <SheetClose asChild></SheetClose>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <ul className="w-full">
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-white bg-[#b8cd06] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-[#343434] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-[#343434] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-[#343434] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-[#343434] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Bài viết
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-[#343434] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Trưng bày
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#b8cd06] text-xs font-bold text-[#343434] leading-4 pt-3 pr-11 pb-[10px] pl-4 shadow-custom rounded-2xl w-full block mb-[10px]"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
