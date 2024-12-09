import { useState } from "react";
import { useGetAllAttribute } from "../actions/useGetAllAttribute";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  __v: number;
}

const CategoriesMenu = () => {
  // State để theo dõi phần tử toggle nào đang được chọn
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const filterTypeCategory = searchParams.get("category");

  const [valuePrice, setValuePrice] = useState<number[]>([0, 10000000]);

  const { isLoading, data } = useGetAllAttribute();

  // const handleToggle = (index: number) => {
  //   // Nếu index đã được chọn thì đặt thành null để bỏ chọn
  //   setActiveIndex(activeIndex === index ? null : index);
  // };

  return (
    <div className="lg:w-[25%] mt-[35px] mb-10 lg:mt-0 order-0 uppercase font-raleway pr-[15px]">
      <h4 className="font-black text-[#343434] text-lg leading-6 mb-[10px]">
        danh mục
      </h4>
      {isLoading && (
        <div className="">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="mb-6" key={index}>
              <Skeleton className="h-6 custom-pulse mb-4" />
            </div>
          ))}
        </div>
      )}
      <ul className="categories-menu">
        {data?.map((category: ICategory) => (
          <li className="relative group !list-none" key={category._id}>
            <span
              className={`text-[11px] text-[#888] hover:text-[#b8cd06] leading-4 border-b border-b-[#efefef] py-[15px] font-bold w-full block transition-all duration-300 cursor-pointer ${
                filterTypeCategory === category._id ? "text-[#b8cd06]" : ""
              }`}
              onClick={() => {
                searchParams.set("category", category._id);

                if (searchParams.get("page")) searchParams.set("page", "1");
                setSearchParams(searchParams);
              }}
            >
              {category.name}
            </span>
            {/* <div
              className={`size-8 absolute top-[15%] lg:top-2 transform  right-0 bg-change cursor-pointer toggle ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleToggle(index)}
            ></div> */}
            {/* <ul className={` ${activeIndex === i ? "block" : "hidden"}`}>
              <li>
                <a
                  className="text-[#ffffff80] border-[#3f3f3f] bg-[#343434] text-[11px] leading-4 py-[15px] pr-[46px] pl-5 font-bold w-full block transition-all duration-300 hover:bg-[#b8cd06] hover:text-white"
                  href="#"
                >
                  ASDSA
                </a>
              </li>
              <li>
                <a
                  className="text-[#ffffff80] border-[#3f3f3f] bg-[#343434] text-[11px] leading-4 py-[15px] pr-[46px] pl-5 font-bold w-full block transition-all duration-300 hover:bg-[#b8cd06] hover:text-white"
                  href="#"
                >
                  ASDSA
                </a>
              </li>
              <li>
                <a
                  className="text-[#ffffff80] border-[#3f3f3f] bg-[#343434] text-[11px] leading-4 py-[15px] pr-[46px] pl-5 font-bold w-full block transition-all duration-300 hover:bg-[#b8cd06] hover:text-white"
                  href="#"
                >
                  ASDSA
                </a>
              </li>
              <li>
                <a
                  className="text-[#ffffff80] border-[#3f3f3f] bg-[#343434] text-[11px] leading-4 py-[15px] pr-[46px] pl-5 font-bold w-full block transition-all duration-300 hover:bg-[#b8cd06] hover:text-white"
                  href="#"
                >
                  ASDSA
                </a>
              </li>
            </ul> */}
          </li>
        ))}
      </ul>
      <div className="h-[25px] md:h-[50px]"></div>
      <h4 className="font-black text-[#343434] text-lg leading-6 mb-[10px]">
        giá tiền
      </h4>
      <Slider
        className="mt-[25px]"
        onValueCommit={(value) => {
          searchParams.set("price", JSON.stringify(value));
          setSearchParams(searchParams);
        }}
        onValueChange={(value) => setValuePrice(value)}
        min={0}
        max={10000000}
        value={valuePrice}
        minStepsBetweenThumbs={1}
      />
      <p className="uppercase font-questrial text-xs font-extralight leading-[18px] mt-4">
        giá: <span>{formatCurrency(valuePrice[0])} VNĐ</span>&nbsp;&nbsp; -
        &nbsp;&nbsp;
        <span>{formatCurrency(valuePrice[1])} VNĐ</span>
      </p>
    </div>
  );
};

export default CategoriesMenu;
