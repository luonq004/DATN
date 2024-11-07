import { useState } from "react";

const FilterContent = () => {
  // State để theo dõi phần tử toggle nào đang được chọn
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    // Nếu index đã được chọn thì đặt thành null để bỏ chọn
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="lg:w-[25%] order-0 uppercase font-raleway pr-[15px]">
      <div>
        <h4 className="font-black text-[#343434] text-lg leading-6 mb-[10px]">
          danh mục
        </h4>

        <ul className="categories-menu">
          {[...Array(6)].map((_, i) => (
            <li className="relative group" key={i}>
              <a
                className="text-[11px] text-[#888] hover:text-[#b8cd06] leading-4 border-b border-b-[#efefef] py-[15px] pr-[46px] font-bold w-full block transition-all duration-300"
                href="#"
              >
                quần & áo
              </a>
              <div
                className={`size-8 absolute top-[6%] lg:top-1/2 transform -translate-y-1/2 right-0 bg-change cursor-pointer toggle ${
                  activeIndex === i ? "active" : ""
                }`}
                onClick={() => handleToggle(i)}
              ></div>
              <ul className={` ${activeIndex === i ? "block" : "hidden"}`}>
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
                {/* Thêm các mục khác tại đây */}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
    </div>
  );
};

export default FilterContent;
