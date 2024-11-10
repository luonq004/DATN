import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { TiStarFullOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { IoBagHandleSharp } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import ao2 from "@/assets/products/ao2.png";
import ao3 from "@/assets/products/ao3.png";

const PreviewProduct = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [apiImage, setApiImage] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [ao2, ao3];

  useEffect(() => {
    if (!apiImage) {
      return;
    }

    setCurrent(apiImage.selectedScrollSnap() + 1);

    apiImage.on("select", () => {
      setCurrent(apiImage.selectedScrollSnap() + 1);
    });
  }, [apiImage]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return createPortal(
    <div
      className={`fixed inset-0 bg-[#000c] z-50 backdrop-blur-sm transition-opacity duration-500 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } flex items-center justify-center`}
      onClick={onClose}
    >
      <div
        className={`absolute max-w-[1170px] top-0 left-0 right-0 bottom-0 overflow-auto bg-white p-4 rounded shadow-lg transform transition-transform duration-500 m-5 xl:mx-auto ${
          isOpen ? "scale-100 opacity-100" : "scale-120 opacity-0 p-[15px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-co1 md:grid-cols-2 py-10 px-[15px] lg:py-20 lg:px-[100px] overflow-hidden">
          <div className="px-[15px] mx-auto mb-[30px] md:mb-0">
            <Carousel className="w-full max-w-xs" setApi={setApiImage}>
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <img className="" src={img} alt="Anh san pham" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="flex items-center mt-4 gap-2">
              {images.map((img, index) => (
                <div
                  className={`${
                    index + 1 === current ? "border-[#b8cd06] border-4" : ""
                  } transition-all`}
                >
                  <img
                    key={index}
                    className={`size-14 `}
                    src={img}
                    alt=""
                    onClick={() => apiImage?.scrollTo(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="px-[15px]">
            <h5 className="uppercase text-[#555] text-sm leading-5">
              thời trang mới
            </h5>
            <h2 className="text-3xl leading-8 uppercase font-black font-raleway text-[#343434] mb-[25px]">
              watch 42mm smartwatch
            </h2>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mb-[25px]">
              <span className="uppercase text-lg text-[#555]">
                giá: <span className="text-[#b8cd06]">1.200.000đ</span>
              </span>

              {/* Star Rating */}
              <div className="flex gap-0.5 pl-1 mb-[25px] md:mb-0">
                <TiStarFullOutline className="text-[#b8cd06]" />
                <TiStarFullOutline className="text-[#b8cd06]" />
                <TiStarFullOutline className="text-[#b8cd06]" />
                <TiStarFullOutline className="text-[#b8cd06]" />
                <TiStarFullOutline className="text-gray-300" />
                <span className="text-[13px] text-[#888] leading-5">
                  128 Đánh giá
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#888] leading-[22px] mb-[30px]">
              Thiết kế cơ bản với cổ tròn hoặc cổ tim, tay ngắn, dễ phối đồ và
              phù hợp cho nhiều dịp từ dạo phố đến tập luyện. Màu sắc và họa
              tiết đa dạng, giúp áo thun trở thành món đồ không thể thiếu trong
              tủ đồ hàng ngày.
            </p>

            {/* Attribute */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center">
              <span className="uppercase text-[13px] text-[#343434] font-raleway font-black mb-2 w-full md:w-4/12">
                kích thước:
              </span>

              <ToggleGroup
                className="justify-start gap-2 w-full md:w-8/12 flex-wrap px-[15px]"
                type="single"
                defaultValue="bold"
              >
                <ToggleGroupItem
                  className="rounded-none border data-[state=on]:border-2 data-[state=on]:text-black transition-all uppercase px-3 h-8"
                  value="bold"
                >
                  s
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-none border data-[state=on]:border-2 data-[state=on]:text-black transition-all uppercase px-3 h-8"
                  value="italic"
                >
                  m
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-none border data-[state=on]:border-2 data-[state=on]:text-black transition-all uppercase px-3 h-8"
                  value="underline"
                >
                  l
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="mb-10 flex flex-col md:flex-row md:items-center">
              <span className="uppercase text-[13px] text-[#343434] font-raleway font-black mb-2 w-full md:w-4/12">
                màu sắc:
              </span>

              <ToggleGroup
                className="justify-start gap-2 w-full md:w-8/12 flex-wrap px-[15px]"
                type="single"
                defaultValue="red"
              >
                <ToggleGroupItem
                  className="rounded-none border bg-red-600 hover:bg-red-600 data-[state=on]:bg-red-600 data-[state=on]:border-2 size-6 p-0 cusor-pointer transition-all"
                  value="red"
                ></ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-none border bg-green-600 hover:bg-green-600 data-[state=on]:bg-green-600 data-[state=on]:border-2 size-6 p-0 cusor-pointer transition-all"
                  value="green"
                ></ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-none border bg-pink-600 hover:bg-pink-600 data-[state=on]:bg-pink-600 data-[state=on]:border-2 size-6 p-0 cusor-pointer transition-all"
                  value="pink"
                ></ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Quantity */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center">
              <span className="uppercase text-[13px] text-[#343434] font-raleway font-black mb-2 w-full md:w-4/12">
                số lượng:
              </span>

              <div className="flex items-center h-[42px] ">
                <span
                  className="cursor-pointer flex justify-center items-center text-5xl font-light w-[50px] h-full text-center border border-r-0 rounded-tl-full rounded-bl-full text-[#333]"
                  onClick={() => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                >
                  -
                </span>
                <span className="border flex justify-center items-center h-full w-24 text-center text-[#333]">
                  {quantity}
                </span>
                <span
                  className="cursor-pointer flex justify-center items-center text-3xl font-light w-[50px] h-full text-center border border-l-0 rounded-tr-full rounded-br-full text-[#333]"
                  onClick={() => {
                    if (quantity < 10) setQuantity(quantity + 1);
                  }}
                >
                  +
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex flex-col md:flex-row gap-2 text-[11px] font-raleway font-bold">
              <button className="btn-add text-white uppercase flex-1">
                <span className="btn-add__wrapper text-[11px] px-[30px] rounded-full bg-[#343434] pt-[17px] pb-[15px] font-raleway">
                  <span className="icon">
                    <IoBagHandleSharp />
                  </span>
                  <span className="text">thêm vào giỏ hàng</span>
                </span>
              </button>
              <button className="btn-add text-white uppercase flex-1">
                <span className="btn-add__wrapper text-[11px] px-[30px] border rounded-full text-[#343434] pt-[17px] pb-[15px] font-raleway">
                  <span className="icon">
                    <SlHeart />
                  </span>
                  <span className="text">thêm vào yêu thích</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <IoClose
          className="absolute top-4 right-4 text-4xl cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>,
    document.body
  );
};

export default PreviewProduct;
