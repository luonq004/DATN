import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import banner from "@/assets/img/banner/banner-1.jpeg";
import banner_2 from "@/assets/img/banner/banner-2.jpeg";
import banner_3 from "@/assets/img/banner/banner-3.jpeg";
import { useEffect, useState } from "react";

const CarouselBanner = () => {
  const images = [banner, banner_3, banner_2];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="relative">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="rounded-lg overflow-hidden relative w-full h-full">
              <div
                className="bg-cover bg-center relative pb-[40%]"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundPosition: "top",
                }}
              ></div>
              <div
                className={`bg-[#2c2c2c] md:bg-transparent block uppercase text-center py-5 px-[15px] pb-16 md:absolute top-12 lg:top-16 ${
                  index % 2 !== 0 ? "right-10" : "left-10"
                }`}
              >
                <span className="text-[#ffffff80] leading-6 text-sm">
                  đừng quên!
                </span>
                <h4 className="text-[#b8cd06] text-3xl leading-8 mb-[10px]">
                  lên tới 70%
                </h4>
                <h4 className="text-white text-lg font-black mb-6">
                  quần tốt nhất annas
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
        {Array.from({ length: images.length }).map((_, index) => (
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
  );
};

export default CarouselBanner;
