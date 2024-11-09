import product1 from "@/assets/products/product10.png";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Products = () => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const products = [
    {
      edition: "PHIÊN BẢN HIỆN ĐẠI",
      name: "ÁO THỜI TRANG HIỆN ĐẠI HT",
      description:
        "Thiết kế đơn giản, dễ phối hợp với nhiều trang phục khác nhau, tạo phong cách hiện đại và thanh lịch.",
      price: "$155.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-green-500", "bg-gray-300", "bg-teal-300"],
      badge: "GIÁ TỐT NHẤT",
    },
    {
      edition: "PHIÊN BẢN THỂ THAO",
      name: "ÁO THỂ THAO ATX",
      description:
        "Phong cách thể thao năng động, phù hợp cho các hoạt động ngoài trời, mang lại cảm giác thoải mái suốt cả ngày.",
      price: "$155.00",
      oldPrice: "$350.00",
      image: { product1 },
      colors: ["bg-purple-700", "bg-blue-500", "bg-red-500"],
      badge: "GIẢM GIÁ 20%",
      badgeColor: "bg-red-600",
    },
    {
      edition: "PHIÊN BẢN SẮC MÀU",
      name: "ÁO CÁ TÍNH HIPSTER HR",
      description:
        "Thiết kế độc đáo với màu sắc nổi bật, dễ dàng tạo điểm nhấn cho trang phục hàng ngày của bạn.",
      price: "$190.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-blue-700", "bg-yellow-500", "bg-red-600"],
    },
    {
      edition: "PHIÊN BẢN THỂ THAO",
      name: "ÁO THỂ THAO RTX",
      description:
        "Phong cách thể thao linh hoạt, kết hợp chất liệu bền bỉ, lý tưởng cho mọi hoạt động hàng ngày.",
      price: "$185.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-yellow-500", "bg-red-600", "bg-green-700"],
    },
    {
      edition: "PHIÊN BẢN THỂ THAO",
      name: "ÁO THỂ THAO RTX",
      description:
        "Phong cách thể thao linh hoạt, kết hợp chất liệu bền bỉ, lý tưởng cho mọi hoạt động hàng ngày.",
      price: "$185.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-yellow-500", "bg-red-600", "bg-green-700"],
    },
    {
      edition: "PHIÊN BẢN THỂ THAO",
      name: "ÁO THỂ THAO RTX",
      description:
        "Phong cách thể thao linh hoạt, kết hợp chất liệu bền bỉ, lý tưởng cho mọi hoạt động hàng ngày.",
      price: "$185.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-yellow-500", "bg-red-600", "bg-green-700"],
    },
    {
      edition: "PHIÊN BẢN THỂ THAO",
      name: "ÁO THỂ THAO RTX",
      description:
        "Phong cách thể thao linh hoạt, kết hợp chất liệu bền bỉ, lý tưởng cho mọi hoạt động hàng ngày.",
      price: "$185.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-yellow-500", "bg-red-600", "bg-green-700"],
    },
    {
      edition: "PHIÊN BẢN THỂ THAO",
      name: "ÁO THỂ THAO RTX",
      description:
        "Phong cách thể thao linh hoạt, kết hợp chất liệu bền bỉ, lý tưởng cho mọi hoạt động hàng ngày.",
      price: "$185.00",
      oldPrice: null,
      image: { product1 },
      colors: ["bg-yellow-500", "bg-red-600", "bg-green-700"],
    },
  ];

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
    <div className="relative h-[558px]">
      {/* Mũi tên trái */}
      <button
        onClick={handlePrev}
        className="absolute hidden lg:flex left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 border-[5px] border-zinc-100 "
      >
        <span className="material-icons text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveProductIndex(swiper.realIndex)}
        loop={true}
        pagination={{ clickable: true }}
        touchRatio={1}
        resistance={false}
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
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide
            key={index}
            className="relative bg-white border-r border-b border-t p-4 min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] xl:min-w-[20%] flex-shrink-0 text-wrap group cursor-grab"
          >
            {/* Giảm giá */}
            {product.badge && (
              <span
                className={`absolute top-5 font-questrial left-6 text-xs text-white py-1 px-2 rounded-full z-20 ${
                  product.badge.includes("GIẢM GIÁ")
                    ? "bg-red-500"
                    : product.badge === "GIÁ TỐT NHẤT"
                    ? "bg-[#b8cd06]"
                    : "bg-[#b8cd06]"
                }`}
              >
                {product.badge}
              </span>
            )}

            {/* Ảnh sản phẩm */}
            <div className="relative">
              <img
                src={product1}
                alt={product.name}
                className="mx-auto my-10 mb-20 w-[250px] h-[250px] object-cover"
              />
            </div>

            {/* Lớp phủ hiệu ứng hover với nút */}
            <div className="absolute inset-0 mb-52 space-y-3 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90">
              <button className="group relative px-20 py-6 text-xs bg-[#343434] text-[#fff] rounded-full font-semibold overflow-hidden transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="absolute inset-0 flex items-center justify-center text-xs transition-transform duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                  TÌM HIỂU THÊM
                </span>
                <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#fff] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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

              <button className="group relative px-20 py-6 text-xs bg-[#b8cd06] text-white rounded-full font-semibold overflow-hidden transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
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

            <div className="px-10 relative">
              {/* Phiên bản */}
              <h5 className="text-xs font-questrial text-[#b8cd06] mb-1">
                {product.edition}
              </h5>

              {/* Tên sản phẩm */}
              <h3 className="font-raleway font-extrabold text-inherit text-[13px] mb-2 group-hover:text-[#b8cd06]">
                {product.name}
              </h3>

              {/* Mô tả */}
              <p className="text-sm font-questrial text-gray-500 mb-2 group-hover:opacity-0 transition-opacity duration-300 line-clamp-3">
                {product.description}
              </p>

              {/* Các biểu tượng hover */}
              <div className="absolute left-10  bottom-12 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-9 h-9 bg-white rounded-full p-2 border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-10"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-9 h-9 bg-white rounded-full p-2 border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-10"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                    <path
                      fill-rule="evenodd"
                      d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-9 h-9 bg-white rounded-full p-2 border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                {/* Giá */}
                <div className="flex items-center justify-center space-x-2">
                  <span className=" text-gray-800">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Tùy chọn màu sắc */}
                <div className="flex justify-center space-x-1">
                  {product.colors.map((color, idx) => (
                    <input
                      type="radius"
                      key={idx}
                      className={`w-4 h-4 ${color}`}
                    ></input>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Mũi tên phải*/}
      <button
        onClick={handleNext}
        className="absolute hidden lg:flex right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 border-[5px] border-zinc-100"
      >
        <span className="material-icons text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      {/* Chấm đánh dấu*/}

      <div className="flex lg:hidden space-x-2 mt-8 justify-center items-center">
        {products.map((_, index) => (
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
    </div>
  );
};

export default Products;
