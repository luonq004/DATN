import product9 from "@/assets/products/product10.png";

const Accessories = () => {
  // Dữ liệu sản phẩm ví dụ
  const products = [
    {
      id: 1,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 2,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: "32.000₫",
      badge: "GIẢM GIÁ 20%",
      imageUrl: product9,
    },
    {
      id: 3,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 4,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: "32.000₫",
      badge: "GIÁ TỐT NHẤT",
      imageUrl: product9,
    },
    {
      id: 5,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 6,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 7,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 8,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 9,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
    {
      id: 10,
      name: "BEAT HIỆN ĐẠI",
      price: "24.000₫",
      discountPrice: null,
      badge: null,
      imageUrl: product9,
    },
  ];

  return (
    <div className="h-auto mx-auto px-5 sm:px-8 lg:px-28 mt-24 md:mt-20">
      {/* Tiêu đề phần */}
      <div className="text-center mb-10">
        <h5 className="text-sm uppercase font-questrial text-gray-500 tracking-wider mb-3">
          PHỤ KIỆN
        </h5>
        <h2 className="text-3xl font-raleway px-10 sm:text-4xl text-[#343434] font-extrabold">
          CHỌN MỘT PHONG CÁCH
        </h2>
        <div className="flex items-center gap-1 justify-center my-6">
          <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
          <span className="h-[1px] w-12 bg-[#b8cd06] mb-2"></span>
          <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
        </div>
      </div>

      {/* Lưới sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:mt-20 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group text-center relative  border-gray-200 overflow-hidden"
          >
            <div className=" border-l sm:border-l-0 border-r">
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 font-questrial px-2 py-1 text-xs rounded-full z-20 ${
                    product.badge === "GIÁ TỐT NHẤT"
                      ? "bg-[#b8cd06]"
                      : "bg-red-600"
                  } text-white`}
                >
                  {product.badge}
                </span>
              )}
              <div className="h-40 w-full my-6 flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>
              <p className="text-[#b8cd06] font-questrial text-xs uppercase tracking-widest relative transition-all duration-300 top-0 group-hover:top-[-15px] z-20">
                PHIÊN BẢN HIỆN ĐẠI
              </p>
              <h3 className="text-[13px] font-extrabold font-raleway text-inherit group-hover:text-[#b8cd06] py-2 relative transition-all duration-300 top-0 group-hover:top-[-15px] z-20">
                {product.name}
              </h3>

              <div className="group-hover:opacity-0 text-xs mb-5 duration-100">
                <span>{product.price}</span>
                {product.discountPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    {product.discountPrice}
                  </span>
                )}
              </div>

              {/* Lớp phủ hiệu ứng hover với nút */}
              <div className="absolute inset-0 mb-16  space-y-2 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90">
                <button className="group relative px-16 py-5 text-xs bg-[#343434] text-[#fff] rounded-full font-semibold overflow-hidden transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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

                <button className="group relative px-16 py-5 text-xs bg-[#b8cd06] text-[#fff] rounded-full font-semibold overflow-hidden transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                    THÊM VÀO GIỎ HÀNG
                  </span>
                  <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#fff] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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

              {/* Các biểu tượng hover */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-8 h-8 bg-white rounded-full p-2 border">
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
                <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-8 h-8 bg-white rounded-full p-2 border">
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
                <span className="text-gray-500 hover:text-white hover:bg-[#b8cd06] flex justify-center items-center cursor-pointer w-8 h-8 bg-white rounded-full p-2 border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="border-b border-gray-200"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 md:mt-14">
        <button className="group relative px-40 md:px-24 py-6 text-sm bg-[#b8cd06] text-[#fff] rounded-full overflow-hidden">
          <span className="absolute text-xs top-4 font-raleway md:left-[33px] left-24 transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
            XEM TẤT CẢ PHỤ KIỆN
          </span>
          <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#fff] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Accessories;
