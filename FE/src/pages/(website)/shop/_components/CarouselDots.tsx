import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LayoutGrid, TableProperties } from "lucide-react";
import ProductItem from "./ProductItem";
<<<<<<< HEAD
import { useGetAllProduct } from "../actions/useGetAllProduct";
=======
import { Slide } from "@/common/types/Slide";
import axios from "axios";
>>>>>>> 4ea154dd7d2fc66dbf8622859ef5603e8db6b77c

export function CarouselDots() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
<<<<<<< HEAD
  const { isLoading, listProduct, error } = useGetAllProduct();
=======
  const [slidesData, setSlidesData] = React.useState<Slide[]>([]);
>>>>>>> 4ea154dd7d2fc66dbf8622859ef5603e8db6b77c


  React.useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/sliders?type=product"
        );
        setSlidesData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu slide:", error);
      }
    };

    fetchSlides();
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full lg:w-[75%] lg:order-1">
      <Carousel setApi={setApi} className="relative">
        <CarouselContent>
          {slidesData.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="rounded-lg overflow-hidden relative w-full h-full">
                <div
                  className="bg-cover bg-center relative pb-[40%]"
                  style={{
                    backgroundImage: `url(${slide.backgroundImage})`,
                    backgroundPosition: "top",
                  }}
                ></div>
                <div
                  className={`bg-[#2c2c2c] md:bg-transparent block uppercase text-center py-5 px-[15px] pb-16 md:absolute top-12 lg:top-16 ${
                    index % 2 !== 0 ? "right-10" : "left-10"
                  }`}
                >
                  <span className="text-[#ffffff80] leading-6 text-sm">
                    {slide.promotionText}
                  </span>
                  <h4 className="text-[#b8cd06] text-3xl leading-8 mb-[10px]">
                    {slide.textsale}
                  </h4>
                  <h4 className="text-white text-lg font-black mb-6">
                    {slide.title}
                  </h4>
                  <a
                    className="bg-[#b8cd06] text-white text-[11px] font-bold leading-[18px] rounded-3xl block md:inline px-5 pt-3 pb-[10px]"
                    href="#"
                  >
                    xem thêm
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center mt-4 absolute bottom-[5%] left-1/2 translate-x-[-50%]">
          {Array.from({ length: slidesData.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full mx-1 focus:outline-none border transition-all ${
                index === current - 1
                  ? "border-[#b8cd06] border-4 size-4"
                  : "border-gray-300 border-2 size-3"
              }`}
            />
          ))}
        </div>
      </Carousel>

      {/* LAYOUT */}
      <div className="mt-[35px]">
        <div className="flex text-nowrap flex-wrap items-center">
          <h4 className="font-black text-[#343434] text-lg leading-6 mb-[10px] mr-5 uppercase">
            thời trang mới
          </h4>
          <p className="inline-block uppercase text-[11px] text-[#888] mb-[10px] mr-5">
            hiển thị <b>15</b> của <b>2 345</b> kết quả
          </p>

          <Tabs className="mb-[10px] mr-5 hidden md:block">
            <TabsList className="bg-white">
              <TabsTrigger
                className="border border-[#eee] rounded text-[#888] data-[state=active]:border-[#eee] w-10 mr-2 data-[state=active]:bg-[#b8cd06] data-[state=active]:text-white"
                value="table"
              >
                <TableProperties />
              </TabsTrigger>
              <TabsTrigger
                className="border border-[#eee] rounded text-[#888] data-[state=active]:border-[#eee] w-10 data-[state=active]:bg-[#b8cd06] data-[state=active]:text-white"
                value="grid"
              >
                <LayoutGrid />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-0 mb-2 w-full md:w-auto lg:mr-5">
            <Select>
              <SelectTrigger className="focus:border-[#b8cd06] rounded-2xl outline-0 ring-0 focus:outline-0 focus:ring-0 focus:ring-offset-0 w-full md:w-[210px] mb-0 mt-0">
                <SelectValue placeholder="SẢN PHẨM NỔI BẬT NHẤT" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/*  */}
          <div className="mt-0 mb-2 w-full md:w-auto">
            <Select>
              <SelectTrigger className="focus:border-[#b8cd06] rounded-2xl outline-0 ring-0 focus:outline-0 focus:ring-0 focus:ring-offset-0 md:w-[120px] mt-0">
                <SelectValue placeholder="HIỂN THỊ 9" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="30">9</SelectItem>
                  <SelectItem value="50">12</SelectItem>
                  <SelectItem value="100">15</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* PRODUCT */}
        {/* ============= GRID ============= */}
        <ProductItem listProduct={listProduct} />
        {/* ============= GRID ============= */}

        {/* ==================================================================== */}
        {/* ============= ROW ============= */}
        {/* ============= ROW ============= */}

        {/* PRODUCT */}
      </div>
      {/* LAYOUT */}
    </div>
  );
}
