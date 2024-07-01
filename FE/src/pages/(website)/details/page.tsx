import { Link } from "react-router-dom";

import { MdNavigateNext } from "react-icons/md";

import { CiZoomIn } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

import tShirtUchinaga from "@/assets/img/tShirtUchinaga.jpg";
import tShirtUchinaga2 from "@/assets/img/tShirtUchinaga2.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DetailPage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const FormSchema = z.object({
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="max-w-[1408px] mx-auto px-4">
      {/* Breadcrumb */}

      <div className="flex gap-1 items-center text-gray-500 text-sm my-5 font-medium">
        <Link to="/" className="hover:text-gray-800">
          Home
        </Link>
        <MdNavigateNext className="text-gray-500" />
        <Link to="/category" className="hover:text-gray-800">
          Product
        </Link>
        <span>
          <MdNavigateNext className="text-gray-500" />
        </span>
        <Link to="/product/32" className="text-gray-900">
          T-shirt Oversize Uchinaga Dark Blue
        </Link>
      </div>
      {/* END Breadcrumb */}

      {/* Product Detail */}
      <div className="flex gap-16">
        <div className="max-w-[450px]">
          <div className="relative">
            {/* <span className="absolute text-black py-1 px-2 bg-white shadow-md rounded-full text-xs right-2 top-2">
              01/05
            </span> */}
            <Carousel setApi={setApi}>
              <CarouselContent>
                <CarouselItem>
                  <img
                    className="w-[450px] h-[420px] object-cover rounded-2xl object-top"
                    src={tShirtUchinaga}
                    alt="Image T-Shirt"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    className="w-[450px] h-[420px] object-cover rounded-2xl object-top"
                    src={tShirtUchinaga2}
                    alt="Image T-Shirt"
                  />
                </CarouselItem>
                {/* <CarouselItem>3</CarouselItem> */}
              </CarouselContent>
              <CarouselPrevious className="-left-3" />
              <CarouselNext className="-right-4" />
            </Carousel>
            <CiZoomIn className="absolute bg-white bottom-4 left-3 rounded-full p-1 text-black text-3xl cursor-pointer" />
          </div>
        </div>

        {/* Main Prouduct */}
        <div>
          <div className="flex bg-slate-100 p-2 rounded-full gap-2 max-w-36">
            <span className="flex items-center text-xs gap-1 pr-2 border-r border-r-slate-400">
              <FaHeart className="text-red-500 text-base" /> WishList
            </span>
            <span className="flex items-center text-xs gap-1">
              <IoBagOutline className="text-base" /> Cart
            </span>
          </div>
          <h1 className="text-5xl max-w-[600px] font-medium leading-tight mt-2">
            T-shirt Oversize Uchinaga Dark Blue
          </h1>
          <div className="flex gap-2 my-2">
            <div className="flex gap-1 items-center pr-1 border-r">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-gray-200" />
              <span className="ml-1 text-base">4.5</span>
            </div>
            <span className="pr-1 border-r">2346 Reviews</span>
            <span>4326 Sold</span>
          </div>
          <div className="flex gap-4 mb-5 items-center">
            <span className="p-1 rounded-full flex items-center gap-1 text-xs text-green-500 bg-green-100">
              <MdOutlineCancel /> 50%
            </span>
            {/* Old Price */}
            <span className="text-gray-300 line-through">$80.00</span>
            {/* Now Price */}
            <h3 className="text-3xl font-semibold">$40.00</h3>
          </div>
          <hr />
          {/* Select Size */}
          <div className="mt-5">
            <h4 className="text-base font-medium">Select Size</h4>
            <ToggleGroup
              className="justify-start gap-4 mt-2"
              type="single"
              variant="default"
            >
              <ToggleGroupItem className="bg-gray-200 h-8" value="Size M">
                M
              </ToggleGroupItem>
              <ToggleGroupItem className="bg-gray-200 h-8" value="Size S">
                S
              </ToggleGroupItem>
              <ToggleGroupItem className="bg-gray-200 h-8" value="Size L">
                L
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {/* End Select Size */}

          {/* Select Color */}
          <div className="mt-5">
            <h4 className="text-base font-medium">Select Color</h4>
            <ToggleGroup
              className="justify-start gap-4 mt-2"
              type="single"
              variant="default"
            >
              <ToggleGroupItem
                className="rounded-full border border-slate-200 w-8 h-8"
                value="red"
              >
                <span className="bg-red-500 p-3 block rounded-full"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="green"
                className="rounded-full border border-slate-200 w-8 h-8"
              >
                <span className="bg-green-500 p-3 block rounded-full"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="yellow"
                className="rounded-full border border-slate-200 w-8 h-8"
              >
                <span className="bg-yellow-500 p-3 block rounded-full"></span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {/* End Select Color */}

          {/* Description */}
          <div className="mt-5">
            <h4 className="text-base font-medium">Descriptions</h4>
            <p className="max-w-[600px] text-gray-500">
              Design: Cute appearance and popular among GISELLE fans.
              Recommended for those who love espa A stylish and cool shirt with
              a simple design that can be worn by both men and women
            </p>
          </div>
          {/* End Description */}

          {/* Shipping Info */}
          <div className="mt-5">
            <h4 className="text-base font-medium">Shipping Info</h4>
            <div className="mt-2">
              <div className="flex">
                <h5 className="basis-1/4 text-gray-500">Shipping:</h5>
                <span>Free Expiditions International</span>
              </div>
              <div className="flex">
                <h5 className="basis-1/4 text-gray-500">Estimated:</h5>
                <span>Estimated arrival on 17 - 21</span>
              </div>
            </div>
          </div>
          {/* End Shipping Info */}
        </div>
      </div>

      {/* End Product Deatail */}

      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
    </section>
  );
};

export default DetailPage;
