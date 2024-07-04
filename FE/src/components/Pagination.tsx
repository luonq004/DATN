import { useEffect, useState } from "react";
import bannerImage1 from "../assets/img/header/baner.jpg";
import bannerImage2 from "../assets/img/header/baner2.jpg";
import bannerImage3 from "../assets/img/header/baner3.jpg";
import collection1 from "../assets/img/products/images5.jpg";
import collection2 from "../assets/img/products/images6.jpg";
import product1 from "../assets/img/products/product1.jpg";
import product2 from "../assets/img/products/product2.jpg";
import {
  default as product3,
  default as product7,
} from "../assets/img/products/product3.jpg";
import product4 from "../assets/img/products/product4.jpg";
import product5 from "../assets/img/products/product5.jpg";
import product6 from "../assets/img/products/product6.jpg";
import product8 from "../assets/img/products/product7.jpg";

const HomePages = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeButton, setActiveButton] = useState("All"); // State để lưu trữ nút hiện tại được chọn
  const slides = [bannerImage1, bannerImage2, bannerImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const menuItems = [
    "All",
    "Shirt",
    "Cap",
    "Trouser",
    "Shorts",
    "Shoe",
    "Sock",
    "Jacket",
    "Hoodie",
    "Glasses",
    "Watch",
  ];

  // Hàm xử lý sự kiện khi click vào nút
  const handleButtonClick = (category: any) => {
    setActiveButton(category);
  };

  const products = [
    { id: 1, name: "Product 1", price: 100, image: product1 },
    { id: 2, name: "Product 2", price: 120, image: product2 },
    { id: 3, name: "Product 3", price: 90, image: product3 },
    { id: 4, name: "Product 4", price: 110, image: product4 },
    { id: 5, name: "Product 5", price: 95, image: product5 },
    { id: 6, name: "Product 6", price: 130, image: product6 },
    { id: 7, name: "Product 7", price: 115, image: product7 },
    { id: 8, name: "Product 8", price: 105, image: product8 },
  ];

  const collections = [
    {
      id: 1,
      title: "Collection 1",
      imgSrc: collection1,
    },
    {
      id: 2,
      title: "Collection 2",
      imgSrc: collection2,
    },
    {
      id: 3,
      title: "Collection 3",
      imgSrc: collection1,
    },
    {
      id: 4,
      title: "Collection 4",
      imgSrc: collection2,
    },
    {
      id: 5,
      title: "Collection 5",
      imgSrc: collection1,
    },
    {
      id: 6,
      title: "Collection 6",
      imgSrc: collection2,
    },
  ];

  return (
    <div className="">
      <div className="max-w-[1408px] items-center mx-auto">
        <div className="relative w-full h-[600px] max-w-full mx-auto">
          <div className="overflow-hidden relative h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-500 ease-in-out transform ${
                  index === currentSlide ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                  <h1 className="text-[30px]  lg:text-4xl xl:text-5xl font-bold mb-4 mx-10">
                    Discover Your Street Style with Our Diverse Collection of
                    Streetwear
                  </h1>
                  <p className="text-[20px]  lg:text-lg xl:text-xl mb-8 mx-5">
                    Get your unique streetwear style with our various
                    collections. Shop now to look fashionable with the latest
                    trends.
                  </p>
                  <button className="px-6 py-3 bg-white text-black rounded-full font-semibold transition ease-in-out transform hover:scale-105">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-flow-col gap-2 lg:px-[100px] overflow-x-scroll justify-items-center">
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => handleButtonClick(item)}
              className={`px-4 py-2 ${
                activeButton === item
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              } rounded-full mx-2 mb-2 sm:mb-0`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className=" mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-[30px]">
            {products.map((product) => (
              <div key={product.id} className="p-4 relative">
                <div className="border rounded-3xl h-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full rounded-3xl"
                  />
                  <div className="absolute top-5 right-5 lg:top-5 lg:right-5 mt-2 mr-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-2  flex leading-7 gap-3 justify-between items-center">
                  <p className=" basi-1/2 lg:text-[25px]  text-[20px] font-[500]">
                    {product.name}
                  </p>
                  <p className=" basi-1/2 lg:text-[25px] text-[21px] font-[600]">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gray-900 mx-auto hover:bg-gray-800 rounded-full py-4 px-8 transition duration-300 ease-in-out transform hover:scale-105 text-gray-100">
              See More
            </button>
          </div>
        </div>

        <div className=" mx-auto p-5">
          <div className="flex flex-col md:flex-row justify-between mt-[100px] items-center">
            <div className="md:basis-2/4 font-medium text-[30px] md:text-[55px] leading-none text-center md:text-left">
              <p>Elevate Your Look with Our Trendsetting Collection</p>
            </div>
            <div className="mt-4 md:mt-0 md:basis-1/4 text-[16px] md:text-[20px] leading-7 text-center md:text-left">
              <p className="opacity-50">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                porro praesentium tenetur numquam deleniti perspiciatis
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="overflow-x-scroll whitespace-nowrap mt-[30px] w-full">
            <div className="inline-flex">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="relative m-2"
                  style={{ minWidth: "600px", minHeight: "300px" }}
                >
                  <img
                    src={collection.imgSrc}
                    alt={collection.title}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute bottom-5 left-5 bg-black bg-opacity-60 text-white p-2 rounded-lg max-w-[90%]">
                    <p className="text-[20px] sm:text-[30px] break-words">
                      {collection.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10 mb-20">
          <button className="bg-gray-900 mx-auto hover:bg-gray-800 rounded-full py-4 px-8 transition duration-300 ease-in-out transform hover:scale-105 text-gray-100">
            Explore Our Collection
          </button>
        </div>

        <div className="px-5">
          <div className=" relative w-full h-[600px] max-w-full mx-auto ">
            <div className="overflow-hidden relative h-full rounded-3xl">
              <div
                className={`absolute w-full h-full transition-transform duration-500 ease-in-out transform `}
              >
                <img
                  src={collection2}
                  alt="collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                  <h1 className=" lg:text-5xl text-3xl font-bold mb-4 mx-10">
                    Discover Your Street Style with Our Diverse Collection of
                    Streetwear
                  </h1>
                  <p className="text-lg mb-8 mx-10">
                    Get your unique streetwear style with our various
                    collections. Shop now to look fashionable with the latest
                    trends.
                  </p>
                  <button className="px-6 py-3  bg-white text-black rounded-full font-semibold transition ease-in-out transform hover:scale-105">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
