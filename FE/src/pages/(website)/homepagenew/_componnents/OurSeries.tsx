import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

const OurSeries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  const products = [
    {
      id: 1,
      image:
        "https://afamilycdn.com/150157425591193600/2023/2/24/photo-10-16771588305291706147102-1677207096302-16772070965081406893629.jpg",
      altImage: "https://mikenco.vn/wp-content/uploads/2022/07/flames.png",
      title: "ÁO SƠ MI CÔNG SỞ",
      description:
        "Áo sơ mi vải cotton thoáng mát, phong cách lịch lãm cho môi trường công sở.",
      price: "350.000₫",
    },
    {
      id: 2,
      image:
        "https://down-vn.img.susercontent.com/file/891c3bbeb08159e282edaff17f63e7b6",
      altImage:
        "https://mikenco.vn/wp-content/uploads/2023/03/336389519_883018169644696_7798160638864894737_n.jpg",
      title: "ÁO KHOÁC JEAN NAM",
      description:
        "Áo khoác jean bền bỉ, mang lại vẻ Áo sơ mi vải cotton thoáng mát, phong cách lịch lãm cho môi trường công sở.Áo sơ mi vải cotton thoáng mát, phong cách lịch lãm cho môi trường công sở.ngoài khỏe khoắn, cá tính.",
      price: "499.000₫",
    },
    {
      id: 3,
      image:
        "https://down-vn.img.susercontent.com/file/891c3bbeb08159e282edaff17f63e7b6",
      altImage:
        "https://mikenco.vn/wp-content/uploads/2023/03/336389519_883018169644696_7798160638864894737_n.jpg",
      title: "QUẦN JEANS TRẺ TRUNG",
      description: "Quần jeans phong cách, phù hợp với mọi hoàn cảnh.",
      price: "450.000₫",
    },
    {
      id: 4,
      image:
        "https://down-vn.img.susercontent.com/file/891c3bbeb08159e282edaff17f63e7b6",
      altImage: "https://mikenco.vn/wp-content/uploads/2022/07/flames.png",
      title: "ÁO THUN NAM THỂ THAO",
      description:
        "Áo thun thể thao thấm hút mồ hôi, thích hợp cho các hoạt động vận động.",
      price: "180.000₫",
    },
    {
      id: 5,
      image:
        "https://down-vn.img.susercontent.com/file/891c3bbeb08159e282edaff17f63e7b6",
      altImage:
        "https://mikenco.vn/wp-content/uploads/2023/03/336389519_883018169644696_7798160638864894737_n.jpg",
      title: "VÁY ĐẦM CÔNG SỞ",
      description:
        "Váy đầm công sở sang trọng, phù hợp cho môi trường làm việc chuyên nghiệp.",
      price: "620.000₫",
    },
    {
      id: 6,
      image:
        "https://as2.ftcdn.net/v2/jpg/06/51/86/79/1000_F_651867914_W4y671P1cSzXiAFxAtirInKexprXEloV.jpg",
      altImage:
        "https://mikenco.vn/wp-content/uploads/2023/03/336389519_883018169644696_7798160638864894737_n.jpg",
      title: "ÁO LEN MÙA ĐÔNG",
      description:
        "Áo len ấm áp, thiết kế đơn giản nhưng hiện đại, phù hợp cho mùa đông.",
      price: "320.000₫",
    },
  ];

  // Chia sản phẩm thành các nhóm 3
  const productGroups = [];
  for (let i = 0; i < products.length; i += 3) {
    productGroups.push(products.slice(i, i + 3));
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index); // Chuyển đến slide được nhấn
  };

  return (
    <div
      className="mx-auto px-5 md:px-28 pt-16 md:pt-36 overflow-hidden cursor-grab select-none"
      
    >
      {/* Tiêu đề phần */}
      <div className="text-center mb-8">
        <h5 className="text-sm uppercase text-gray-500 tracking-wider mb-3">
          SẢN PHẨM CỦA CHÚNG TÔI
        </h5>
        <h2 className="text-3xl sm:text-4xl font-bold">CHỌN MỘT PHONG CÁCH</h2>
        <div className="flex items-center gap-1 justify-center my-6">
          <span className="h-[1px] w-2 bg-lime-400 mb-2"></span>
          <span className="h-[1px] w-12 bg-lime-400 mb-2"></span>
          <span className="h-[1px] w-2 bg-lime-400 mb-2"></span>
        </div>
      </div>

      {/* Nội dung sản phẩm */}
      <Swiper
        spaceBetween={300}
        slidesPerView={1}
        centeredSlides={false} 
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={{ clickable: true }}
        loop={true}
        speed={600}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {productGroups.map((group, groupIndex) => (
          <SwiperSlide key={groupIndex}>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-full">
              {group.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex flex-col ${
                    (groupIndex % 2 === 0 && index === 0) ||
                    (groupIndex % 2 !== 0 && index === 2)
                      ? "w-full mt-10 mb-8 md:mb-0 relative"
                      : "md:w-1/2"
                  } items-center text-center`}
                >
                  {(groupIndex % 2 === 0 && index === 0) ||
                  (groupIndex % 2 !== 0 && index === 2) ? (
                    <>
                      <img
                        src={
                          hoveredIndex === index
                            ? product.altImage
                            : product.image
                        }
                        alt={product.title}
                        className="rounded-xl w-full h-[400px] md:h-[500px] object-cover transition-transform duration-300 ease-in-out"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex flex-col justify-center p-8 text-white">
                        <p className="text-left text-lg mb-2">
                          BẮT ĐẦU TỪ {product.price}
                        </p>
                        <h2 className="text-3xl text-left font-bold mb-4">
                          {product.title.split(" ")[0]}{" "}
                          <span className="text-[#b8cd06]">
                            {product.title.split(" ")[1]}
                          </span>{" "}
                          {product.title.split(" ").slice(2).join(" ")}
                        </h2>
                        <p className="text-sm text-left mb-6 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                        <button className="group relative md:w-10 px-10 md:px-16 text-left py-6 md:py-6 text-sm bg-white text-black rounded-full font-semibold overflow-hidden">
                          <span className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                            TÌM HIỂU THÊM
                          </span>
                          <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-black transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          hoveredIndex === index
                            ? product.altImage
                            : product.image
                        }
                        alt={product.title}
                        className={`mb-4 xl:w-[315px] xl:h-[315px] object-cover transition-transform duration-300 ease-in-out ${
                          hoveredIndex === index
                            ? "scale-95 opacity-100"
                            : "scale-100 opacity-100"
                        }`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                      <h3 className="text-lg font-bold mb-2">
                        {product.title.split(" ")[0]}{" "}
                        <span className="text-[#b8cd06]">
                          {product.title.split(" ")[1]}
                        </span>{" "}
                        {product.title.split(" ").slice(2).join(" ")}
                      </h3>
                      <p className="text-gray-500 text-xs px-16 md:px-6 line-clamp-3">
                        {product.description}
                      </p>
                      <p className="text-sm text-gray-900 my-5">
                        {product.price}
                      </p>
                      <button className="group relative px-20 md:px-16 py-5 md:py-5 text-sm bg-[#b8cd06] text-white rounded-full font-semibold overflow-hidden">
                        <span className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                          TÌM HIỂU THÊM
                        </span>
                        <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-white transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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
                    </>
                  )}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Chỉ báo tròn */}
      <div className="flex space-x-2 mt-16 md:mt-10 justify-center items-center">
        {productGroups.map((_, index) => (
          <div
            key={index}
            className={`rounded-full w-3 h-3 bg-white ${
              index === activeIndex
                ? "border-[3px] w-4 h-4 border-[#b8cd06]"
                : "border-[1px] border-gray-500"
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OurSeries;
