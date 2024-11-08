import { GrLinkNext } from "react-icons/gr";
import { IoBagHandleSharp } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";
import clothesNorth from "@/assets/products/north.png";
import { IoEyeOutline } from "react-icons/io5";
import PreviewProduct from "./PreviewProduct";
import { useState } from "react";

const ProductItem = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
      <div className="product-item border-x border-[#f7f7f7] pt-[25px] px-[30px] pb-[5px] mb-[60px] overflow-hidden">
        {/* TITLE */}
        <div className="uppercase mb-[10px]">
          <a
            className="text-[#b8cd06] text-[11px] leading-[18px] block mb-[5px]"
            href="#"
          >
            smart phones
          </a>
          <a
            className=" text-[#343434] leading-[18px] font-raleway text-[13px] block title-product transition-all duration-150 font-black"
            href="#"
          >
            Smartphone vibe x2
          </a>
        </div>

        {/* IMAGE PRODUCT */}
        <div className="relative mb-[30px]">
          <img
            className="max-w-[200px] mx-auto"
            src={clothesNorth}
            alt="Image clothes"
          />
          <div className="preview-btn valign-middle lg:ml-[-87px]">
            <div className="relative w-full uppercase">
              <a
                href="#"
                className="btn bg-[#343434] px-[30px] pt-[17px] pb-[15px] block text-center mb-[10px] text-[11px] font-bold text-white rounded-full font-raleway lg:w-[175px]"
              >
                <span className="relative">
                  <GrLinkNext className="text-xl absolute block left-[-300%] icon" />

                  <span className="relative text left-0">xem thêm</span>
                </span>
              </a>
              <a
                href="#"
                className="btn bg-[#b8cd06] px-[30px] pt-[17px] pb-[15px] block text-center mb-[10px] text-[11px] font-bold text-white rounded-full font-raleway lg:w-[175px] cart"
              >
                <span className="relative">
                  <IoBagHandleSharp className="text-xl absolute block left-[-300%] icon" />

                  <span className="relative text left-0">
                    thêm vào giỏ hàng
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* PRICE AND DESCRIPTION */}
        <div>
          <div className="flex justify-between h-9">
            <span className="text-[#b8cd06]">1.200.000đ</span>
            {/* &nbsp;&nbsp;&nbsp; */}
            <span className="text-[#888] line-through">1.500.000đ</span>
          </div>

          <div className="relative overflow-hidden">
            <p className="text-[13px] text-[#888] h-[60px] description-product">
              Mollis nec consequat at In feugiat mole stie tortor a malesuada
            </p>

            <div className="list-icon flex gap-2">
              <span
                className="size-7 border rounded-full flex items-center justify-center hover:bg-[#b8cd06] text-[#979797] hover:text-white"
                onClick={() => setIsOpenModal(!isOpenModal)}
              >
                <IoEyeOutline className="cursor-pointer text-lg text-current" />
              </span>
              <span className="size-7 border rounded-full flex items-center justify-center hover:bg-[#b8cd06] text-[#979797] hover:text-white">
                <SlHeart className="cursor-pointer text-lg text-current" />
              </span>
            </div>
          </div>
        </div>

        {/* PORTAL */}

        <PreviewProduct
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      </div>
    </div>
  );
};

export default ProductItem;
