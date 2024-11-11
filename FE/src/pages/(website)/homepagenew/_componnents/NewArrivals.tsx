import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import product1 from "@/assets/products/product10.png";
import product2 from "@/assets/products/product9.png";
import product3 from "@/assets/products/product12.png";

const NewArrivals = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const swiperRefs = useRef<SwiperCore[]>([]);

  const categories = [
    "TẤT CẢ",
    "THỂ THAO",
    "VĂN PHÒNG",
    "DẠ HỘI",
    "THƯ GIÃN",
    "THỜI TRANG TRẺ",
  ];

  const products = [
    {
      edition: "PHIÊN BẢN HIỆN ĐẠI",
      name: "ÁO THỂ THAO HIỆN ĐẠI",
      description:
        "Thiết kế thoáng mát, chất liệu co giãn phù hợp cho các hoạt động thể thao.",
      price: "$55.00",
      oldPrice: null,
      image: [product1, product2, product3],
      colors: ["bg-blue-500", "bg-gray-300", "bg-red-300"],
      badge: null,
      category: "THỂ THAO",
    },
    {
      edition: "PHIÊN BẢN CÔNG SỞ",
      name: "ÁO SƠ MI CÔNG SỞ",
      description:
        "Áo sơ mi phong cách công sở, chất liệu cao cấp, dễ phối đồ.",
      price: "$85.00",
      oldPrice: "$100.00",
      image: [product2, product1, product3],
      colors: ["bg-white", "bg-gray-500", "bg-blue-500"],
      badge: "GIẢM GIÁ 15%",
      category: "VĂN PHÒNG",
    },
    {
      edition: "PHIÊN BẢN DẠ HỘI",
      name: "VÁY DẠ HỘI SANG TRỌNG",
      description:
        "Váy dạ hội thiết kế sang trọng, hoàn hảo cho các buổi tiệc tối.",
      price: "$120.00",
      oldPrice: "$150.00",
      image: [product3, product2],
      colors: ["bg-red-500", "bg-black", "bg-gray-300"],
      badge: "20% GIẢM GIÁ",
      category: "DẠ HỘI",
    },
    {
      edition: "PHIÊN BẢN DẠ HỘI",
      name: "VÁY DẠ HỘI SANG TRỌNG",
      description:
        "Váy dạ hội thiết kế sang trọng, hoàn hảo cho các buổi tiệc tối.",
      price: "$120.00",
      oldPrice: "$150.00",
      image: [product3, product1],
      colors: ["bg-red-500", "bg-black", "bg-gray-300"],
      badge: "20% GIẢM GIÁ",
      category: "DẠ HỘI",
    },
    {
      edition: "PHIÊN BẢN THƯ GIÃN",
      name: "ÁO HOODIE THOẢI MÁI",
      description: "Áo hoodie mềm mại, lý tưởng cho những ngày thư giãn.",
      price: "$70.00",
      oldPrice: null,
      image: [product1],
      colors: ["bg-green-500", "bg-gray-300", "bg-teal-300"],
      badge: null,
      category: "THƯ GIÃN",
    },
    {
      edition: "PHIÊN BẢN THỜI TRANG TRẺ",
      name: "ÁO KHOÁC THỜI TRANG",
      description:
        "Áo khoác phong cách trẻ trung, phù hợp với xu hướng hiện đại.",
      price: "$90.00",
      oldPrice: "$110.00",
      image: [product2],
      colors: ["bg-black", "bg-blue-500", "bg-pink-300"],
      badge: "GIÁ TỐT NHẤT",
      category: "THỜI TRANG TRẺ",
    },
    {
      edition: "PHIÊN BẢN THỜI TRANG TRẺ",
      name: "ÁO KHOÁC THỜI TRANG",
      description:
        "Áo khoác phong cách trẻ trung, phù hợp với xu hướng hiện đại.",
      price: "$90.00",
      oldPrice: "$110.00",
      image: [product2],
      colors: ["bg-black", "bg-blue-500", "bg-pink-300"],
      badge: "GIÁ TỐT NHẤT",
      category: "THỜI TRANG TRẺ",
    },
    {
      edition: "PHIÊN BẢN THỜI TRANG TRẺ",
      name: "ÁO KHOÁC THỜI TRANG",
      description:
        "Áo khoác phong cách trẻ trung, phù hợp với xu hướng hiện đại.",
      price: "$90.00",
      oldPrice: "$110.00",
      image: [product2],
      colors: ["bg-black", "bg-blue-500", "bg-pink-300"],
      badge: "GIÁ TỐT NHẤT",
      category: "THỜI TRANG TRẺ",
    },
    // Thêm các sản phẩm khác ở đây
  ];

  // Lọc sản phẩm theo danh mục
  const filteredProducts = products.filter(
    (product) =>
      activeCategory === 0 || product.category === categories[activeCategory]
  );

  // Đóng menu khi nhấp ra bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // chuyển sản phẩm
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const scrollToProduct = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveProductIndex(index);
  };

  return (
    <div className="mx-auto lg:pt-36 pt-20">
      {/* Tiêu đề phần */}
      <div className="text-center md:mb-20">
        <h5 className="text-sm uppercase text-gray-500 font-questrial tracking-wider mb-3">
          SẢN PHẨM MỚI
        </h5>
        <h2 className="text-3xl sm:text-4xl text-[#343434] font-raleway font-extrabold">
          MÓN MỚI DÀNH CHO BẠN
        </h2>
        <div className="flex items-center gap-1 justify-center my-6">
          <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
          <span className="h-[1px] w-12 bg-[#b8cd06] mb-2"></span>
          <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
        </div>
      </div>

      {/* Menu danh mục */}
      <div className="flex md:hidden flex-col items-center mb-16" ref={menuRef}>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="px-6 py-4 text-gray-700 border rounded-full text-xs font-semibold flex justify-between items-center w-full max-w-[300px]"
        >
          {categories[activeCategory]}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-2 transition-transform duration-300 ${
              isCategoryOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown danh mục */}
        <ul
          className={`w-full max-w-[300px] bg-white px-4 border-l border-r mt-2 transition-all duration-300 overflow-hidden ${
            isCategoryOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveCategory(index);
                setIsCategoryOpen(false);
              }}
              className={`px-6 py-2 text-xs font-semibold cursor-pointer ${
                index === activeCategory
                  ? "bg-[#b8cd06] rounded-full text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:flex justify-center items-center mb-16">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            {/* Đường viền bên trái cho các mục trừ mục đầu tiên */}
            {index > 0 && (
              <span className="h-6 border-l border-gray-300"></span>
            )}

            <button
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-2 mx-3 text-xs font-semibold transition-all duration-300 ${
                index === activeCategory
                  ? "bg-[#b8cd06] text-white rounded-full"
                  : "text-gray-500 hover:shadow rounded-full"
              }`}
            >
              {category}
            </button>
          </div>
        ))}
      </div>

      {/* Slider sản phẩm */}
      <div className="relative h-[445px] text-center">
        {/* Mũi tên cuộn trái */}
        <button
          onClick={handlePrev}
          className="absolute hidden lg:flex left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 border-[5px] border-zinc-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Container cuộn sản phẩm */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveProductIndex(swiper.realIndex)}
          loop={true}
          touchRatio={1}
          resistance={false}
          centerInsufficientSlides={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {filteredProducts.map((product, index) => (
            <SwiperSlide
              key={index}
              className="relative bg-white border cursor-grab p-4 min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] xl:min-w-[20%] max-w-[250px] group overflow-hidden"
            >
              {/* Nhãn sản phẩm */}
              {product.badge && (
                <span
                  className={`absolute top-5 left-6 text-xs text-white py-1 px-2 rounded-full ${
                    product.badge.includes("GIẢM GIÁ")
                      ? "bg-red-500"
                      : product.badge === "GIÁ TỐT NHẤT"
                      ? "bg-[#b8cd06]"
                      : "bg-lime-500"
                  }`}
                >
                  {product.badge}
                </span>
              )}

              {/* Hình ảnh sản phẩm */}
              <Swiper
                loop={true}
                modules={[Pagination]}
                className="mx-auto my-5 w-[250px] h-[250px] object-cover"
                onSwiper={(swiper) => {
                  swiperRefs.current[index] = swiper;
                }}
              >
                {product.image.map((image, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={image}
                      alt={`${product.name} image ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Mũi tên trái và phải */}
              <button
                onClick={() => swiperRefs.current[index].slidePrev()}
                className="absolute top-1/3 left-6 transform -translate-y-1/2 -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-slate-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={() => swiperRefs.current[index].slideNext()}
                className="absolute top-1/3 right-6 transform -translate-y-1/2 translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-slate-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Phần nút hiển thị khi hover */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="group relative md:px-[70px] px-[90px] py-6 text-xs bg-black text-white font-semibold overflow-hidden flex items-center justify-center transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                  <span className="absolute inset-0 flex items-center justify-center text-xs transition-transform duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                    TÌM HIỂU THÊM
                  </span>
                  <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-white transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                <button className="group relative md:px-[70px] px-[90px] py-6 text-xs bg-[#b8cd06] text-white font-semibold overflow-hidden flex items-center justify-center transform translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                  <span className="absolute inset-0 flex items-center justify-center text-xs transition-transform duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                    THÊM VÀO GIỎ HÀNG
                  </span>
                  <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-white transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="px-10">
                <h5 className="text-xs uppercase font-questrial text-[#b8cd06] mb-1 text-wrap relative transition-all duration-300 top-0 group-hover:top-[-8px]">
                  {product.edition}
                </h5>
                <h3 className="font-extrabold font-raleway text-[13px] text-inherit group-hover:text-[#b8cd06] mb-3 text-wrap relative transition-all duration-300 top-0 group-hover:top-[-8px] line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3 group-hover:opacity-0 duration-200 text-wrap line-clamp-2">
                  {product.description}
                </p>

                {/* Các biểu tượng hover */}
                <div className="absolute bottom-16 lg::bottom-20 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-8 h-8 bg-white rounded-full p-2 border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-8 h-8 bg-white rounded-full p-2 border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-10"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-8 h-8 bg-white rounded-full p-2 border">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex items-center justify-center group-hover:opacity-0 duration-300 space-x-2">
                  <span className="text-gray-800">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mũi tên cuộn phải */}
        <button
          onClick={handleNext}
          className="absolute hidden lg:flex right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 border-[5px] border-zinc-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Chỉ báo vòng tròn - chỉ hiển thị trên màn hình nhỏ */}
      {filteredProducts.length > 1 && (
        <div className="flex space-x-2 md:mt-20 mt-8 lg:hidden justify-center items-center">
          {filteredProducts.map((_, index) => (
            <div
              key={index}
              className={`rounded-full w-3 h-3 bg-white cursor-pointer ${
                index === activeProductIndex
                  ? "border-[3px] w-4 h-4 border-[#b8cd06]"
                  : "border-[1px] border-gray-500"
              }`}
              onClick={() => scrollToProduct(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
