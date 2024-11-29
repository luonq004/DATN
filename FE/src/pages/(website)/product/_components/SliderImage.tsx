import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Variant } from "@/common/types/Product";

interface ProductCarouselProps {
  variants: Variant[];
}

const SliderImage: React.FC<ProductCarouselProps> = ({ variants }) => {
  const [apiImage, setApiImage] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!apiImage) {
      return;
    }

    setCurrent(apiImage.selectedScrollSnap() + 1);

    apiImage.on("select", () => {
      setCurrent(apiImage.selectedScrollSnap() + 1);
    });
  }, [apiImage]);

  return (
    <div>
      {/* Main Carousel */}
      <Carousel className="w-full max-w-xs" setApi={setApiImage}>
        <CarouselContent>
          {variants.map((variant: Variant, index: number) => (
            <CarouselItem key={index}>
              <img
                className="w-full"
                src={
                  variant.image
                  //  ||
                  // "http://unionagency.one/exzo/img/product-preview-4.jpg"
                }
                alt="Anh san pham"
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails */}
      <div className="flex items-center mt-12 gap-2">
        {variants.map((variant: Variant, index: number) => (
          <div
            key={index}
            className={`${
              index + 1 === current ? "border-[#b8cd06] border-4" : ""
            } transition-all`}
          >
            <img
              className="size-14"
              src={variant.image}
              alt="Thumbnail"
              onClick={() => apiImage?.scrollTo(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderImage;
