import banner1 from "@/assets/img/header/banner1.jpg";
import banner2 from "@/assets/img/header/banner2.jpeg";
import banner3 from "@/assets/img/header/banner3.jpg";
import product9 from "@/assets/products/product10.png";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";


const slidesData = [
  {
    title: "REAL BEAT TRX",
    subtitle: "PHIÊN BẢN CHUYÊN NGHIỆP",
    description:
      "In feugiat molestie tortor a malesuada. Etiam a venenatis ipsum. Proin pharetra elit at feugiat commodo vel placerat tincidunt sapien nec",
    features: [
      "20,000 giờ âm nhạc chất lượng cao",
      "Cách âm hoàn hảo",
      "Bảo hành 5 năm",
    ],
    price: "$195.00",
    image: product9,
    backgroundImage: banner1,
  },
  {
    title: "REAL BEAT TRX",
    subtitle: "PHIÊN BẢN CHUYÊN NGHIỆP",
    description:
      "In feugiat molestie tortor a malesuada. Etiam a venenatis ipsum. Proin pharetra elit at feugiat commodo vel placerat tincidunt sapien nec",
    features: [
      "20,000 giờ âm nhạc chất lượng cao",
      "Cách âm hoàn hảo",
      "Bảo hành 5 năm",
    ],
    price: "$195.00",
    image: product9,
    backgroundImage: banner2,
  },
  {
    title: "REAL BEAT TRX",
    subtitle: "PHIÊN BẢN CHUYÊN NGHIỆP",
    description:
      "In feugiat molestie tortor a malesuada. Etiam a venenatis ipsum. PProin pharetra elit at feugiat commodo vel placerat tincidunt sapien necroin pharetra elit at feugiat commodo vel placerat tincidunt sapien nec",
    features: [
      "20,000 giờ âm nhạc chất lượng cao",
      "Cách âm hoàn hảo",
      "Bảo hành 5 năm",
    ],
    price: "$195.00",
    image: product9,
    backgroundImage: banner3,
  },
  
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const defaultGradientColor = "from-green-500 to-lime-400 to-cyan-500";

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    swiperRef.current?.slideTo(index); // Chuyển đến slide được nhấn
  };

  return (
    <div className="flex relative items-center justify-center w-full cursor-grab select-none">
      <div className="flex lg:h-[590px] overflow-hidden w-full">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={600}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-between items-center w-full h-full min-w-full relative flex-wrap"
            >
              {/* Ảnh nền */}
              <img
                src={slide.backgroundImage}
                alt="background"
                className="absolute inset-0 lg:h-[800px] w-full h-full  object-cover -z-10"
              />
              {/* Overlay Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${defaultGradientColor} opacity-60`}
              ></div>

              {index === 0 && (
                <div className="flex flex-col md:flex-row items-center h-full justify-between  p-5 wqAZ:p-0 mt-5 md:mt-0 relative z-20 space-y-4 md:space-y-0">
                  {/* Left Content */}
                  <div className="text-slate-50 space-y-3 lg:pl-32">
                    <h5 className="text-sm font-questrial">{slide.subtitle}</h5>
                    <h2 className="xl:text-7xl md:text-5xl text-4xl text-[#fff]  font-raleway font-extrabold mb-2">
                      {slide.title}
                    </h2>
                    <div className="flex items-center gap-1">
                      <span className="h-[1px] w-2 bg-white mb-2"></span>
                      <span className="h-[1px] w-12 bg-white mb-2"></span>
                    </div>
                    <p className="text-sm mb-6 text-wrap font-questrial md:w-4/5">
                      {slide.description}
                    </p>
                    <ul className="space-y-3 text-sm py-6 font-questrial">
                      {slide.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col xl:flex-row font-questrial xl:items-center gap-5">
                      <p className="text-lg text-left">
                        GIÁ TỐT NHẤT: <span>{slide.price}</span>
                      </p>
                      <div className="flex flex-col font-questrial md:flex-row text-xs gap-3">
                        <button className="group relative md:px-16 py-6 bg-[#fff] text-[#555] rounded-full font-bold overflow-hidden">
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                            TÌM HIỂU THÊM
                          </span>
                          <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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

                        <button className="group relative md:px-20 py-6 text-xs bg-[#343434] text-[#fff] rounded-full font-bold overflow-hidden">
                          <span className="absolute px-2 inset-0 flex items-center justify-center transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                            THÊM VÀO GIỎ HÀNG
                          </span>
                          <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="flex justify-center md:mr-32 items-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="md:w-[800px] lg:w-full w-[400px] mb-14 h-auto object-cover z-20"
                    />
                  </div>
                </div>
              )}

              {index === 1 && (
                <div className="flex flex-col md:flex-row p-5 lg:p-0 mt-5 md:mt-0 justify-between items-center w-full h-full relative z-20"
                >
                  {/* Left Image */}
                  <div className="md:flex md:ml-32 justify-center hidden items-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="md:w-[800px] lg:w-auto w-[400px] h-auto object-cover z-20"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="justify-center md:items-end md:text-right text-left text-slate-50 lg:space-y-4 space-y-2 lg:pr-32">
                    <h5 className="text-sm font-questrial">{slide.subtitle}</h5>
                    <h2 className="xl:text-7xl md:text-5xl text-4xl font-raleway font-extrabold mb-2">
                      {slide.title}
                    </h2>
                    <div className="flex md:justify-end items-center gap-1">
                      <span className="h-[1px] w-2 bg-white mb-2"></span>
                      <span className="h-[1px] w-12 bg-white mb-2"></span>
                    </div>
                    <p className="text-sm mb-6 flex font-questrial md:justify-end lg:md:w-4/5 md:ml-auto">
                      {slide.description}
                    </p>
                    <ul className="space-y-3 text-sm py-6 font-questrial">
                      {slide.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex lg:items-center md:justify-end"
                        >
                          <span className="lg:ml-2 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col xl:flex-row font-questrial md:justify-end xl:items-center gap-5">
                      <p className="text-lg">
                        GIÁ TỐT NHẤT: <span>{slide.price}</span>
                      </p>
                      <div className="flex flex-col md:flex-row md:justify-end text-xs gap-3 font-questrial">
                        <button className="group relative md:px-16 py-6 bg-[#fff] text-[#555] rounded-full font-semibold overflow-hidden">
                          <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                            TÌM HIỂU THÊM
                          </span>
                          <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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

                        <button className="group relative md:px-20 py-6 text-xs bg-[#343434] text-[#fff] rounded-full font-semibold overflow-hidden">
                          <span className="absolute px-2 inset-0 flex items-center justify-center transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                            THÊM VÀO GIỎ HÀNG
                          </span>
                          <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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
                    </div>
                  </div>

                  <div className=" md:hidden flex justify-center items-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="md:w-[800px] w-[400px] mb-14 h-auto object-cover z-20"
                    />
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className="flex flex-col mb-10 p-5 lg:p-0 mt-5 md:mt-0 lg:items-center lg:justify-center md:text-center w-full h-full space-y-5 z-20">
                  <h5 className="text-sm text-slate-100 md:mt-20 lg:mt-0 z-20">{slide.subtitle}</h5>
                  <h2 className="md:text-7xl text-4xl font-raleway font-extrabold text-white mb-2 z-20">
                    {slide.title}
                  </h2>
                  <div className="flex md:justify-center md:items-center gap-1 z-20">
                    <span className="h-[1px] w-2 bg-white"></span>
                    <span className="h-[1px] w-12 bg-white"></span>
                  </div>
                  <p className="text-sm text-slate-100 md:w-3/4 font-questrial md:mx-auto mb-6 z-20">
                    {slide.description}
                  </p>
                  <ul className="space-y-3 text-sm py-6 z-20">
                    {slide.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex md:items-center md:justify-center text-slate-100"
                      >
                        <span className="text-slate-100 mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex relative md:justify-center flex-col lg:flex-row md:items-center gap-5 z-20">
                    <button className="group text-xs relative md:px-16 py-6 bg-[#fff] text-[#555] rounded-full font-semibold overflow-hidden">
                      <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                        TÌM HIỂU THÊM
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full text-[#b8cd06] transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
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
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute hidden lg:flex left-[-30px] z-30 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 border-[5px] border-zinc-100 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute hidden lg:flex right-[-30px] top-1/2 z-30 transform -translate-y-1/2 bg-white rounded-full p-3 border-[5px] border-zinc-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6 text-gray-500"
          >
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 flex left-1/2 transform -translate-x-1/2 space-x-2 items-center z-20">
          {slidesData.map((_, index) => (
            <div
              key={index}
              className={`rounded-full w-3 h-3 cursor-pointer transition-all duration-500 ${
                index === currentIndex
                  ? "border-[1px] w-6 h-3 border-white"
                  : "border-[1px] border-white"
              }`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
