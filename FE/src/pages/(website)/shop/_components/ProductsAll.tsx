import React, { useState } from 'react'

// Image Product 
// import ImgProduct from '../../../../assets/products/product1.jpg';
import ImgProduct from '../../../../assets/products/product-1.svg';

// icons
import { Star } from 'lucide-react';
import { Heart } from 'lucide-react';

//shad-ui
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ModeToggle } from '@/components/mode-toggle';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ProductsAll = () => {
    const [like, setLike] = useState<number | 0>(0);
    const products = [
        {
            id: 1,
            name: 'Basic Oversize White Basic Oversize White Basic Oversize',
            price: 120.00,
            sale: 10.00,
            category: { id: 1, name: 'T-Shirt' },
            rating: 4.5,
            reviews: 135,
            img: ImgProduct,
            stock: 12
        },
        {
            id: 2,
            name: 'Basic Hút-đi Oversize White',
            price: 100.00,
            sale: 0,
            category: { id: 3, name: 'Hoodie' },
            rating: 3,
            reviews: 89,
            img: ImgProduct,
            stock: 12
        },
        {
            id: 3,
            name: 'Basic Short Shirt Oversize White',
            price: 150.00,
            sale: 30.00,
            category: { id: 2, name: 'Short Shirt' },
            rating: 5,
            reviews: 280,
            img: ImgProduct,
            stock: 0
        },
        {
            id: 4,
            name: 'Basic Red T-Shirt',
            price: 95.00,
            sale: 16.00,
            category: { id: 1, name: 'T-Shirt' },
            rating: 4.3,
            reviews: 110,
            img: ImgProduct,
            stock: 12
        },
        {
            id: 5,
            name: 'Basic Green Hoodie',
            price: 85.00,
            sale: 43.00,
            category: { id: 3, name: 'Hoodie' },
            rating: 4.1,
            reviews: 90,
            img: ImgProduct,
            stock: 0
        },
        {
            id: 6,
            name: 'Basic Denim Jacket',
            price: 130.00,
            sale: 0,
            category: { id: 4, name: 'Jacket' },
            rating: 4.7,
            reviews: 180,
            img: ImgProduct,
            stock: 12
        },
        {
            id: 7,
            name: 'Ẽxpress Denim Jacket',
            price: 200.00,
            sale: 0,
            category: { id: 4, name: 'Jacket' },
            rating: 4.8,
            reviews: 150,
            img: ImgProduct,
            stock: 8
        },
        {
            id: 8,
            name: 'Sủpe Dảk Hoodie',
            price: 180.00,
            sale: 20.00,
            category: { id: 3, name: 'Hoodie' },
            rating: 4.2,
            reviews: 120,
            img: ImgProduct,
            stock: 9
        }
    ]

    return (
        <>
            {/* <Test2 /> */}
            <ModeToggle />
            <section className='max-w-[1408px] transition-all duration-500 ease-in-out max-[1408px]:w-[88%] mx-auto grid grid-cols-[304px_74%] max-[1408px]:grid-cols-[24%_73%] max-md:grid-cols-1 gap-x-8 pt-[40px]'>
                <div className="Filters w-full transition-all duration-200 border-r max-[1440px]:pl-2 max-[1408px]:pl-0 max-md:border-r-0 border-[#F4F4F4] flex flex-col gap-[20px] pr-[32px]">
                    <div className="pt-[17px] pb-[24px] flex gap-[8px] border-b border-[#F4F4F4]">
                        <p className="text-[18px] font-normal">Filters</p>
                    </div>
                    <div className="Product-Category max-md:hidden border-b border-[#F4F4F4] pb-[20px] flex flex-col gap-[20px]">
                        <p className="text-[#717378] text-[12px] leading-[18px] tracking-[1px]">PRODUCT CATEGORY</p>
                        <div>
                            <form className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <input defaultChecked id="default-radio-1" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-1" className="text-sm font-medium text-gray-900 dark:text-gray-300">Sales
                                    </label>
                                    <label htmlFor="default-radio-1" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">12</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-2" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="text-sm font-medium text-gray-900 dark:text-gray-300">Cannabis
                                    </label>
                                    <label htmlFor="default-radio-2" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">430</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-3" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-3" className="text-sm font-medium text-gray-900 dark:text-gray-300">Sales
                                    </label>
                                    <label htmlFor="default-radio-3" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">12</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-4" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-4" className="text-sm font-medium text-gray-900 dark:text-gray-300">Cannabis
                                    </label>
                                    <label htmlFor="default-radio-4" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">430</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-5" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-5" className="text-sm font-medium text-gray-900 dark:text-gray-300">Sales
                                    </label>
                                    <label htmlFor="default-radio-5" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">12</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-6" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-6" className="text-sm font-medium text-gray-900 dark:text-gray-300">Cannabis
                                    </label>
                                    <label htmlFor="default-radio-6" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">430</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-7" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-7" className="text-sm font-medium text-gray-900 dark:text-gray-300">Sales
                                    </label>
                                    <label htmlFor="default-radio-7" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">12</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-8" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-8" className="text-sm font-medium text-gray-900 dark:text-gray-300">Cannabis
                                    </label>
                                    <label htmlFor="default-radio-8" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">430</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-9" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-9" className="text-sm font-medium text-gray-900 dark:text-gray-300">Sales
                                    </label>
                                    <label htmlFor="default-radio-9" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">12</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-10" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-10" className="text-sm font-medium text-gray-900 dark:text-gray-300">Cannabis
                                    </label>
                                    <label htmlFor="default-radio-10" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">430</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-11" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-11" className="text-sm font-medium text-gray-900 dark:text-gray-300">Sales
                                    </label>
                                    <label htmlFor="default-radio-11" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">12</p>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input id="default-radio-12" type="radio" name="default-radio" className="w-5 h-5 text-[#17AF26] bg-white border-gray-300 focus:ring-[#17AF26] dark:focus:ring-[#17AF26] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-12" className="text-sm font-medium text-gray-900 dark:text-gray-300">Cannabis
                                    </label>
                                    <label htmlFor="default-radio-12" className="text-[#9D9EA2] text-[14px] font-light leading-[21px]">
                                        <p className="pl-3 inline border-l border-[#F4F4F4] m-0">430</p>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='max-md:hidden'>
                        <button className="text-[#17AF26] text-[14px] font-medium bg-[#F3FBF4] px-8 p-[9.5px] rounded-full">Clear
                            Filters</button>
                    </div>
                </div>
                <div className='Shop max-md:pt-8'>
                    {/* Top Selling  */}
                    <div className='TopSelling flex flex-col gap-6 px-8 py-6 border rounded-2xl'>
                        <p className='text-[24px] font-medium max-xl:text-[20px] max-md:text-[18px]'>Top Selling</p>
                        <div>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {products.map((item: any, index: number) => (
                                        <CarouselItem key={index} className="basis-1/3 max-xl:basis-1/2 max-[480px]:basis-full">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex max-h-max aspect-square items-center justify-center p-6">
                                                        <div className='flex flex-col gap-4 group w-full select-none'>
                                                            <div className='relative overflow-hidden'>
                                                                <a href="#">
                                                                    <div className='ImgProduct  transition-all p-4 group-hover:p-6 bg-[#F4F4F4] rounded-2xl'>
                                                                        <img className='w-full h-full' src={ImgProduct} alt="" />
                                                                    </div>
                                                                </a>
                                                                <div className='Favorite p-2 rounded-full bg-background absolute z-10 top-[2%] -right-[100%] group-hover:right-[3%] transition-all duration-300 ease-in-out cursor-pointer select-none' onClick={() => like !== item.id ? setLike(item.id) : setLike(0)}>
                                                                    <Heart color='black' fill={like === item.id ? 'red' : 'white'} />
                                                                </div>
                                                                {item.sale > 0
                                                                    ?
                                                                    <div className='SaleOff absolute top-0 left-0 rounded-tl-2xl rounded-br-2xl flex justify-center items-center transition-all duration-200 ease-in-out p-3 max-xl:p-2 max-md:p-3 max-sm:p-2 bg-[#F2BC1B] text-[14px] max-xl:text-[12px] max-md:text-[14px] max-sm:text-[12px] text-white'>
                                                                        <p>$<span className='pr-1'>{item.sale}.00</span>Off</p>
                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                                {item.stock === 0
                                                                    ?
                                                                    <div className='OutOfStock absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[14px] max-xl:text-[12px] max-md:text-[14px] max-sm:text-[12px] transition-all duration-200 ease-in-out p-3 max-xl:p-2 max-md:p-3 max-sm:p-2 bg-[rgba(26,30,38,0.6)] rounded-full text-nowrap'>
                                                                        <p>Out Of Stock</p>
                                                                    </div>
                                                                    :
                                                                    null
                                                                }

                                                            </div>
                                                            <div className='InfoProduct flex flex-col items-center gap-5'>
                                                                <div className='w-full flex flex-col justify-center items-center gap-2'>
                                                                    <div className='Category uppercase text-[#9D9EA2] text-[14px] tracking-[1px] hover:text-light-300'>
                                                                        <a href="#">
                                                                            <span>{item.category.name}</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className='Name text-[18px] max-xl:text-[16px] font-medium text-center w-full'>
                                                                        <a href="#">
                                                                            <p className='transition-all group-hover:text-light-300 max-w-full truncate inline-block'>{item.name}</p>
                                                                        </a>
                                                                    </div>
                                                                    <div className='Review flex justify-center items-center transition-all duration-300 ease-in-out gap-3 max-xl:gap-[3%] max-xl:text-[12px]'>
                                                                        <div className='flex items-center justify-center gap-[6px]'>
                                                                            <div className='w-full'>
                                                                                <Star size={20} fill='yellow' />
                                                                            </div>
                                                                            <div className=''>
                                                                                <p><span>{item.rating}</span>/5</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex text-[#C8C9CB]'>|</div>
                                                                        <div className='flex justify-center items-center'>
                                                                            <div className='flex justify-center items-center gap-[6px]'>
                                                                                <p className='flex justify-center items-center gap-[6px]'>135k <span className='text-[#C8C9CB] '>Reviews</span></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {item.sale > 0 ?
                                                                        <div className='PriceProduct flex gap-4 max-lg:gap-2 justify-center items-center font-medium'>
                                                                            <div className='text-[14px] max-lg:text-[12px] text-[#9D9EA2] line-through'>
                                                                                <p>$<span>{item.price}.00</span></p>
                                                                            </div>
                                                                            <div className='text-[#EB2606] max-lg:text-[14px]'>
                                                                                <p>$<span>{(item.price - item.sale)}.00</span></p>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className='PriceProduct flex gap-4 max-lg:gap-2 justify-center items-center font-medium'>
                                                                            <div className='text-[18px] max-lg:text-[14px]'>
                                                                                <p>$<span>{item.price}.00</span></p>
                                                                            </div>
                                                                        </div>
                                                                    }

                                                                </div>
                                                                <div className={`flex justify-center items-center ${item.stock === 0 ? '*:cursor-not-allowed' : ''}`}>
                                                                    <div className='bg-background1 flex justify-center items-center py-2 px-6 border border-background1 text-background rounded-full cursor-pointer transition-all hover:bg-background hover:text-background1 select-none max-lg:text-[14px]'>
                                                                        <p className='text-nowrap'>Add to Cart</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                    {/* End Top Selling  */}

                    <div className='ShopList grid grid-cols-3 max-md:grid-cols-2 max-[390px]:grid-cols-1 gap-8 max-md:gap-x-6 max-md:gap-y-8 py-8'>
                        {/* Product  */}
                        {products.map((item, index) => (
                            <div key={index} className='flex flex-col gap-4 group w-full select-none'>
                                <div className='relative overflow-hidden'>
                                    <a href="#">
                                        <div className='ImgProduct  transition-all p-4 group-hover:p-6 bg-[#F4F4F4] rounded-2xl'>
                                            <img className='w-full h-full' src={ImgProduct} alt="" />
                                        </div>
                                    </a>
                                    <div className='Favorite p-2 rounded-full bg-background absolute z-10 top-[2%] -right-[100%] group-hover:right-[3%] transition-all duration-300 ease-in-out cursor-pointer select-none' onClick={() => like !== item.id ? setLike(item.id) : setLike(0)}>
                                        <Heart color='black' fill={like === item.id ? 'red' : 'white'} />
                                    </div>
                                    {item.sale > 0
                                        ?
                                        <div className='SaleOff absolute top-0 left-0 rounded-tl-2xl rounded-br-2xl flex justify-center items-center transition-all duration-200 ease-in-out p-3 max-xl:p-2 max-md:p-3 max-sm:p-2 bg-[#F2BC1B] text-[14px] max-xl:text-[12px] max-md:text-[14px] max-sm:text-[12px] text-white'>
                                            <p>$<span className='pr-1'>{item.sale}.00</span>Off</p>
                                        </div>
                                        :
                                        null
                                    }
                                    {item.stock === 0
                                        ?
                                        <div className='OutOfStock absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[14px] max-xl:text-[12px] max-md:text-[14px] max-sm:text-[12px] transition-all duration-200 ease-in-out p-3 max-xl:p-2 max-md:p-3 max-sm:p-2 bg-[rgba(26,30,38,0.6)] rounded-full text-nowrap'>
                                            <p>Out Of Stock</p>
                                        </div>
                                        :
                                        null
                                    }

                                </div>
                                <div className='InfoProduct flex flex-col items-center gap-5'>
                                    <div className='w-full flex flex-col justify-center items-center gap-2'>
                                        <div className='Category uppercase text-[#9D9EA2] text-[14px] tracking-[1px] hover:text-light-300'>
                                            <a href="#">
                                                <span>{item.category.name}</span>
                                            </a>
                                        </div>
                                        <div className='Name text-[18px] max-xl:text-[16px] font-medium text-center w-full'>
                                            <a href="#">
                                                <p className='transition-all group-hover:text-light-300'>{item.name}</p> {/* max-w-full truncate inline-block */}
                                            </a>
                                        </div>
                                        <div className='Review flex justify-center items-center transition-all duration-300 ease-in-out gap-3 max-xl:gap-[3%] max-xl:text-[12px]'>
                                            <div className='flex items-center justify-center gap-[6px]'>
                                                <div className='w-full'>
                                                    <Star size={20} fill='yellow' />
                                                </div>
                                                <div className=''>
                                                    <p><span>{item.rating}</span>/5</p>
                                                </div>
                                            </div>
                                            <div className='flex text-[#C8C9CB]'>|</div>
                                            <div className='flex justify-center items-center'>
                                                <div className='flex justify-center items-center gap-[6px]'>
                                                    <p className='flex justify-center items-center gap-[6px]'>135k <span className='text-[#C8C9CB] '>Reviews</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        {item.sale > 0 ?
                                            <div className='PriceProduct flex gap-4 max-lg:gap-2 justify-center items-center font-medium'>
                                                <div className='text-[14px] max-lg:text-[12px] text-[#9D9EA2] line-through'>
                                                    <p>$<span>{item.price}.00</span></p>
                                                </div>
                                                <div className='text-[#EB2606] max-lg:text-[14px]'>
                                                    <p>$<span>{(item.price - item.sale)}.00</span></p>
                                                </div>
                                            </div>
                                            :
                                            <div className='PriceProduct flex gap-4 max-lg:gap-2 justify-center items-center font-medium'>
                                                <div className='text-[18px] max-lg:text-[14px]'>
                                                    <p>$<span>{item.price}.00</span></p>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                    <div className={`flex justify-center items-center ${item.stock === 0 ? '*:cursor-not-allowed' : ''}`}>
                                        <div className='bg-background1 flex justify-center items-center py-2 px-6 border border-background1 text-background rounded-full cursor-pointer transition-all hover:bg-background hover:text-background1 select-none max-lg:text-[14px]'>
                                            <p className='text-nowrap'>Add to Cart</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* End Product  */}
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </section >
        </>
    )
}

export default ProductsAll
