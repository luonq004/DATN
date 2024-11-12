import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { IoBagHandleSharp, IoClose } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";
import { TiStarFullOutline } from "react-icons/ti";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { IProduct, Variant } from "@/common/types/Product";
import {
  extractAttributes,
  filterAndFormatAttributes,
  formatCurrency,
} from "@/lib/utils";

const PreviewProduct = ({
  isOpen,
  onClose,
  selectedIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: string | null;
}) => {
  const [apiImage, setApiImage] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productPopup, setProductPopup] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [attributesChoose, setAttributesChoose] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (!selectedIndex || productPopup?._id === selectedIndex) return;

    const fetchProduct = async () => {
      // setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/products/${selectedIndex}`
      );
      const data = await response.json();
      setIsLoading(false);
      setProductPopup(data);
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, isLoading]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const attributesProduct =
    !isLoading && Object.entries(extractAttributes(productPopup?.variants));

  // console.log(attributesProduct);

  const handleAttributeSelect = (type: string, value: string) => {
    if (!productPopup) return;
    const attributeSelected = filterAndFormatAttributes(
      productPopup,
      type,
      value
    );

    // console.log(attributeSelected);

    setAttributesChoose((prev) => {
      const newSelected = { ...prev };
      // console.log("newSelected: ", newSelected);

      // Duyệt qua các key trong attributeSelected
      Object.keys(attributeSelected).forEach((key) => {
        const newValue = attributeSelected[key]; // Giá trị mới từ attributeSelected

        // Kiểm tra nếu key đã tồn tại trong state (newSelected)
        if (newSelected[key]) {
          // Kiểm tra nếu value trong attributeSelected trùng với value hiện tại trong state
          if (
            newValue.length === newSelected[key][0].length &&
            newValue.every(
              (value, index) => value === newSelected[key][0][index]
            )
          ) {
            // Nếu trùng cả key và value, xóa key và value
            delete newSelected[key];
          } else {
            // Nếu chỉ trùng key, nhưng value khác, ghi đè giá trị mới cho key đó
            newSelected[key] = [newValue]; // Giá trị được thay thế
          }
        } else {
          // Nếu key chưa tồn tại, thêm mới vào state
          newSelected[key] = [newValue];
        }
      });

      return newSelected;
    });
  };

  console.log(attributesChoose);

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
                {productPopup?.variants.map(
                  (variant: Variant, index: number) => (
                    <CarouselItem key={index}>
                      <img
                        className="w-full"
                        src={variant.image}
                        alt="Anh san pham"
                        loading="lazy"
                      />
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>

            <div className="flex items-center mt-4 gap-2">
              {productPopup?.variants.map((variant: Variant, index: number) => (
                <div
                  key={index}
                  className={`${
                    index + 1 === current ? "border-[#b8cd06] border-4" : ""
                  } transition-all`}
                >
                  <img
                    key={index}
                    className={`size-14 `}
                    src={variant.image}
                    alt=""
                    onClick={() => apiImage?.scrollTo(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="px-[15px]">
            {/* Category */}
            {/* <h5 className="uppercase text-[#555] text-sm leading-5">
              thời trang mới
            </h5> */}
            <h2 className="text-3xl leading-8 uppercase font-black font-raleway text-[#343434] mb-[25px]">
              {productPopup?.name}
            </h2>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center md:mb-[25px]">
              <span className="uppercase text-lg text-[#555]">
                giá:{" "}
                <span className="text-[#b8cd06]">
                  {formatCurrency(productPopup?.price ?? 0)} VNĐ
                </span>
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
              {productPopup?.description}
            </p>

            {/* Attribute */}
            {attributesProduct.map(([key, value]) => (
              <div
                className="mb-10 flex flex-col md:flex-row md:items-center"
                key={key}
              >
                <span className="uppercase text-[13px] text-[#343434] font-raleway font-black mb-2 w-full md:w-4/12">
                  {key}:
                </span>

                <ToggleGroup
                  className="justify-start gap-2 w-full md:w-8/12 flex-wrap px-[15px]"
                  type="single"
                  // defaultValue={value[0].value}
                >
                  {(value as string[]).map((item: string, idx: number) => {
                    if (item.split(":")[1].startsWith("#")) {
                      return (
                        <ToggleGroupItem
                          onClick={() =>
                            handleAttributeSelect(key, item.split(":")[0])
                          }
                          key={`${item.split(":")[0]}-${idx}`}
                          className={`rounded-none border data-[state=on]:border-2 size-6 p-0 cusor-pointer transition-all`}
                          value={item.split(":")[0]}
                          style={{
                            backgroundColor: item.split(":")[1],
                          }}
                          disabled={
                            key in attributesChoose
                              ? !attributesChoose[key][0].includes(
                                  item.split(":")[0]
                                )
                              : false
                          }
                        ></ToggleGroupItem>
                      );
                    } else {
                      return (
                        <ToggleGroupItem
                          onClick={() =>
                            handleAttributeSelect(key, item.split(":")[0])
                          }
                          className="rounded-none border data-[state=on]:border-2 data-[state=on]:text-black transition-all uppercase px-3 h-8"
                          value={item.split(":")[0]}
                          key={item.split(":")[0]}
                          // disabled={
                          //   key in attributesChoose
                          //     ? item
                          //         .split(":")[0]
                          //         .includes(attributesChoose[key][0])
                          //     : false
                          // }
                          disabled={
                            key in attributesChoose
                              ? !attributesChoose[key][0].includes(
                                  item.split(":")[0]
                                )
                              : false
                          }
                        >
                          {item.split(":")[1]}
                        </ToggleGroupItem>
                      );
                    }
                  })}
                </ToggleGroup>
              </div>
            ))}

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
