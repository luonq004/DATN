import  { useState } from 'react'

//products
import ImgProduct from '@/assets/products/product-1.svg';

//icons
import minius from '@/assets/icons/transaction-minus.svg';
import boxtime from '@/assets/icons/box-time.svg';
import trucktime from '@/assets/icons/truck-time.svg';
import idk from '@/assets/icons/idk.svg';
import visa from '@/assets/icons/Visa.svg';
import bitcoin from '@/assets/icons/Bitcoin.svg';
import interac from '@/assets/icons/Interac.svg';
import SizeColorSelector from './SizeColorSelect';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const ShoppingCart = () => {
    const [attribute, setAttribute] = useState<number | 1>(1);

    const hanldeOnChangeAttribute = (number: number) => {
        // console.log(number)
        setAttribute(number);
    }

    return (
        <>
            {/* Cart  */}
            {/* <ModeToggle /> */}
            <section className="Status_Cart transition-all duration-500 space-y-8 px-4 py-8 max-w-[1408px] w-full max-[1408px]:w-[88%] mx-auto grid grid-cols-[57%_auto] max-lg:grid-cols-1 gap-x-16">
                {/* Cart__Left */}
                <div className="Your_Cart flex flex-col gap-6">
                    {/* Top  */}
                    <div className="Top flex justify-between pb-6 border-b border-[#C8C9CB]">
                        <p className="font-medium text-[24px] max-sm:text-[16px]">Your Cart</p>
                        <p className="text-[#9D9EA2] max-sm:text-[14px] transition-all duration-500">(3)</p>
                    </div>
                    {/* End Top  */}

                    {/* Mid  */}
                    <div className="Mid flex flex-col gap-6">
                        {/* Cart__Product */}
                        <div className="grid transition-all duration-500 grid-cols-[81px_auto] max-sm:grid-cols-[75px_auto] gap-x-4 border-[#F4F4F4] border-b pb-6">
                            {/* Image  */}
                            <div className="Image_Product">
                                <div className="border border-[#dddcdc] rounded-[6px] p-1">
                                    <img className="w-full h-full" src={ImgProduct} alt="img" />
                                </div>
                            </div>
                            {/* information */}
                            <div className="flex flex-col gap-3">
                                <div className="flex max-sm:grid max-sm:grid-cols-[50%_auto] justify-between items-center gap-4">
                                    <div className="text-[#9D9EA2] flex w-[45%] max-sm:w-full transition-all duration-500 max-sm:text-[14px]">
                                        <div className='hover:text-black'>
                                            <Link to={`#`}>Khalifa Kush (AAAA)</Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 max-sm:col-start-1">
                                        <div className="flex rounded-[6px] *:transition-all duration-500">
                                            <div className="px-[15px] py-[6px] flex justify-center items-center cursor-pointer select-none">
                                                -
                                            </div>
                                            <div className="border border-[#F4F4F4] rounded-[4px] bg-[#F4F4F4] px-[12.8px] py-[5px] text-black flex justify-center items-center">
                                                <p>2</p>
                                            </div>
                                            <div className="px-[15px] py-[6px] flex justify-center items-center cursor-pointer select-none">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p>$<span>120.00</span></p>
                                    </div>
                                    <div className="group transition-all pb-0 hover:pb-1 cursor-pointer max-sm:col-start-2 max-sm:row-start-1 max-sm:flex max-sm:justify-end" onClick={() => window.confirm('Bạn chắc chứ ?')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="stroke-gray-500 transition duration-300 group-hover:stroke-red-500">
                                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Attribute  */}
                                <div className="flex items-center gap-4 max-sm:justify-between">
                                    <p className="text-[#9D9EA2] w-[51%] max-[1408px]:w-[49%] max-xl:w-[47%] max-lg:w-[52%] transition-all duration-500 max-sm:text-[14px]">Size, Color</p>
                                    <div className="relative">
                                        {/* Attribute__Table  */}
                                        <SizeColorSelector attribute={attribute} onChangeAttribute={hanldeOnChangeAttribute} />
                                        {/* End Attribute__Table  */}
                                    </div>
                                </div>
                                {/* End Attribute  */}
                                <div>
                                    <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">Còn 120 sản phẩm</p>
                                </div>

                            </div>
                        </div>
                        {/* End Cart__Product */}
                        {/* Cart__Product */}
                        <div className="grid transition-all duration-500 grid-cols-[81px_auto] max-sm:grid-cols-[75px_auto] gap-x-4 border-[#F4F4F4] border-b pb-6">
                            {/* Image  */}
                            <div className="Image_Product">
                                <div className="border border-[#dddcdc] rounded-[6px] p-1">
                                    <img className="w-full h-full" src={ImgProduct} alt="img" />
                                </div>
                            </div>
                            {/* information */}
                            <div className="flex flex-col gap-3">
                                <div className="flex max-sm:grid max-sm:grid-cols-[50%_auto] justify-between items-center gap-4">
                                    <div className="text-[#9D9EA2] flex w-[45%] max-sm:w-full transition-all duration-500 max-sm:text-[14px]">
                                        <div className='hover:text-black'>
                                            <a href="#">Khalifa Kush (AAAA) Khalifa Kush</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 max-sm:col-start-1">
                                        <div className="flex rounded-[6px] *:transition-all duration-500">
                                            <div className="px-[15px] py-[6px] flex justify-center items-center">
                                                -
                                            </div>
                                            <div className="border border-[#F4F4F4] rounded-[4px] bg-[#F4F4F4] px-[12.8px] py-[5px] text-black">2</div>
                                            <div className="px-[15px] py-[6px] flex justify-center items-center">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p>$<span>120.00</span></p>
                                    </div>
                                    <div className="group transition-all pb-0 hover:pb-1 cursor-pointer max-sm:col-start-2 max-sm:row-start-1 max-sm:flex max-sm:justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="stroke-gray-500 transition duration-300 group-hover:stroke-red-500">
                                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Attribute  */}
                                <div className="flex items-center gap-4 max-sm:justify-between">
                                    <p className="text-[#9D9EA2] w-[51%] max-[1408px]:w-[49%] max-xl:w-[47%] max-lg:w-[52%] transition-all duration-500 max-sm:text-[14px]">Size, Color</p>
                                    <div className="relative">
                                        <div className="flex items-center gap-3 border rounded-md py-1 px-3 cursor-pointer max-sm:*:text-[14px]" onClick={() => setAttribute(attribute !== 3 ? 3 : 1)}>
                                            <div>
                                                <p>M</p>
                                            </div>
                                            <div className="bg-[#C3D2CC] px-1.5 max-sm:px-1 h-[2px]"></div>
                                            <div className="w-4 max-sm:w-3 h-4 max-sm:h-3 bg-red-500 rounded-full"></div>
                                            <div className={`transition-all duration-500 ${attribute === 3 ? 'rotate-180' : ''}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                    <path fill="black" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {/* Attribute__Table  */}
                                        <div className={`absolute bg-white py-3 px-4 left-1/2 max-sm:left-[5%] -translate-x-1/2 border rounded-md transition-all duration-500 ${attribute === 3 ? 'opacity-100 top-[130%] z-10' : 'opacity-0 top-[90%] z-[-1]'}`}>
                                            <div className="flex flex-col gap-2 mb-2">
                                                <h1 className="font-medium">Select size</h1>
                                                <div className="flex gap-2">
                                                    <div className="relative px-5 py-4 bg-black border-2 border-black hover:border-black rounded-md cursor-pointer transition-all">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-white font-medium">M</p>
                                                    </div>
                                                    <div className="relative px-5 py-4 bg-[#efefef] border-2 border-[#efefef] hover:border-black rounded-md cursor-pointer transition-all">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium">S</p>
                                                    </div>
                                                    <div className="relative px-5 py-4 bg-[#efefef] border-2 border-[#efefef] hover:border-black rounded-md cursor-pointer transition-all">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium">L</p>
                                                    </div>
                                                    <div className="relative px-5 py-4 bg-white border-2 border-[#efefef] rounded-md cursor-not-allowed">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-[#bbbbbb] font-medium">XXL</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 mb-6">
                                                <h1 className="font-medium">Select color</h1>
                                                <div className="flex gap-2">
                                                    <div className="p-1 border-2 border-black rounded-full hover:border-black cursor-pointer transition-all">
                                                        <div className="relative p-2.5 bg-[#ff1f1f] rounded-full"></div>
                                                    </div>
                                                    <div className="p-1 border-2 border-[#d1d0d0] rounded-full hover:border-black cursor-pointer transition-all">
                                                        <div className="relative p-2.5 bg-[#2ff11d] rounded-full"></div>
                                                    </div>
                                                    <div className="p-1 border-2 border-[#d1d0d0] rounded-full hover:border-black cursor-pointer transition-all">
                                                        <div className="relative p-2.5 bg-[#1d61f3] rounded-full"></div>
                                                    </div>
                                                    <div className="p-1 border-2 border-[#d1d0d0] rounded-full cursor-not-allowed">
                                                        <div className="relative p-2.5 bg-[#e0e0e0] rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <div className="p-1 hover:text-red-500 cursor-pointer" onClick={() => setAttribute(1)}>Cancel</div>
                                                <button className="py-1 px-3 bg-white border border-black text-black rounded-sm hover:bg-black hover:text-white transition-all duration-300">Save</button>
                                            </div>
                                        </div>
                                        {/* End Attribute__Table  */}
                                    </div>
                                </div>
                                {/* End Attribute  */}
                                <div>
                                    <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">Còn 120 sản phẩm</p>
                                </div>

                            </div>
                        </div>
                        {/* End Cart__Product */}

                        {/* Cart__Product */}
                        <div className="grid transition-all duration-500 grid-cols-[81px_auto] max-sm:grid-cols-[75px_auto] gap-x-4 border-[#F4F4F4] border-b pb-6">
                            {/* Image  */}
                            <div className="Image_Product">
                                <div className="border border-[#dddcdc] rounded-[6px] p-1">
                                    <img className="w-full h-full" src={ImgProduct} alt="img" />
                                </div>
                            </div>
                            {/* information */}
                            <div className="flex flex-col gap-3">
                                <div className="flex max-sm:grid max-sm:grid-cols-[50%_auto] justify-between items-center gap-4">
                                    <div className="text-[#9D9EA2] flex w-[45%] max-sm:w-full transition-all duration-500 max-sm:text-[14px]">
                                        <div className='hover:text-black'>
                                            <Link to={`#`}>Khalifa Kush (AAAA) Khalifa Kush (AAAA) Khalifa Kush</Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 max-sm:col-start-1">
                                        <div className="flex rounded-[6px] *:transition-all duration-500">
                                            <div className="px-[15px] py-[6px] flex justify-center items-center">
                                                -
                                            </div>
                                            <div className="border border-[#F4F4F4] rounded-[4px] bg-[#F4F4F4] px-[12.8px] py-[5px] text-black">2</div>
                                            <div className="px-[15px] py-[6px] flex justify-center items-center">
                                                +
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p>$<span>120.00</span></p>
                                    </div>
                                    <div className="group transition-all pb-0 hover:pb-1 cursor-pointer max-sm:col-start-2 max-sm:row-start-1 max-sm:flex max-sm:justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="stroke-gray-500 transition duration-300 group-hover:stroke-red-500">
                                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Attribute  */}
                                <div className="flex items-center gap-4 max-sm:justify-between">
                                    <p className="text-[#9D9EA2] w-[51%] max-[1408px]:w-[49%] max-xl:w-[47%] max-lg:w-[52%] transition-all duration-500 max-sm:text-[14px]">Size, Color</p>
                                    <div className="relative">
                                        <div className="flex items-center gap-3 border rounded-md py-1 px-3 cursor-pointer max-sm:*:text-[14px]" onClick={() => setAttribute(attribute !== 4 ? 4 : 1)}>
                                            <div>
                                                <p>M</p>
                                            </div>
                                            <div className="bg-[#C3D2CC] px-1.5 max-sm:px-1 h-[2px]"></div>
                                            <div className="w-4 max-sm:w-3 h-4 max-sm:h-3 bg-red-500 rounded-full"></div>
                                            <div className={`transition-all duration-500 ${attribute === 4 ? 'rotate-180' : ''}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                    <path fill="black" d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {/* Attribute__Table  */}
                                        <div className={`absolute bg-white py-3 px-4 left-1/2 max-sm:left-[5%] -translate-x-1/2 border rounded-md transition-all duration-500 ${attribute === 4 ? 'opacity-100 top-[130%] z-10' : 'opacity-0 top-[90%] z-[-1]'}`}>
                                            <div className="flex flex-col gap-2 mb-2">
                                                <h1 className="font-medium">Select size</h1>
                                                <div className="flex gap-2">
                                                    <div className="relative px-5 py-4 bg-black border-2 border-black hover:border-black rounded-md cursor-pointer transition-all">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-white font-medium">M</p>
                                                    </div>
                                                    <div className="relative px-5 py-4 bg-[#efefef] border-2 border-[#efefef] hover:border-black rounded-md cursor-pointer transition-all">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium">S</p>
                                                    </div>
                                                    <div className="relative px-5 py-4 bg-[#efefef] border-2 border-[#efefef] hover:border-black rounded-md cursor-pointer transition-all">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium">L</p>
                                                    </div>
                                                    <div className="relative px-5 py-4 bg-white border-2 border-[#efefef] rounded-md cursor-not-allowed">
                                                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-[#bbbbbb] font-medium">XXL</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 mb-6">
                                                <h1 className="font-medium">Select color</h1>
                                                <div className="flex gap-2">
                                                    <div className="p-1 border-2 border-black rounded-full hover:border-black cursor-pointer transition-all">
                                                        <div className="relative p-2.5 bg-[#ff1f1f] rounded-full"></div>
                                                    </div>
                                                    <div className="p-1 border-2 border-[#d1d0d0] rounded-full hover:border-black cursor-pointer transition-all">
                                                        <div className="relative p-2.5 bg-[#2ff11d] rounded-full"></div>
                                                    </div>
                                                    <div className="p-1 border-2 border-[#d1d0d0] rounded-full hover:border-black cursor-pointer transition-all">
                                                        <div className="relative p-2.5 bg-[#1d61f3] rounded-full"></div>
                                                    </div>
                                                    <div className="p-1 border-2 border-[#d1d0d0] rounded-full cursor-not-allowed">
                                                        <div className="relative p-2.5 bg-[#e0e0e0] rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <div className="p-1 hover:text-red-500 cursor-pointer" onClick={() => setAttribute(1)}>Cancel</div>
                                                <button className="py-1 px-3 bg-white border border-black text-black rounded-sm hover:bg-black hover:text-white transition-all duration-300">Save</button>
                                            </div>
                                        </div>
                                        {/* End Attribute__Table  */}
                                    </div>
                                </div>
                                {/* End Attribute  */}
                                <div>
                                    <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">Còn 120 sản phẩm</p>
                                </div>

                            </div>
                        </div>
                        {/* End Cart__Product */}

                    </div>
                    {/* End Mid  */}

                    {/* Bottom  */}
                    <div className="Bottom border-t border-[#F4F4F4] pt-6 grid grid-cols-3 gap-6 max-sm:gap-4">
                        <div className='flex gap-4 flex-col'>
                            <p className='text-[16px] max-sm:text-[14px]'>Delivery</p>
                            <div className='flex flex-col border border-[#F4F4F4] rounded-[12px] p-4 gap-4'>
                                <div className='Icon flex justify-center items-center w-1 h-1 bg-light-50 p-6 rounded-full'>
                                    <img className='max-w-max' src={minius} alt="" />
                                </div>
                                <p className='text-[18px] max-sm:text-[14px]'>
                                    Order by 10pm for free next day delivery on Orders overs $100
                                </p>
                                <p className='text-[#717378] max-sm:text-[12px]'>
                                    We deliver Monday to Saturday - excluding Holidays
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col'>
                            <p className='text-[16px] max-sm:text-[14px]'>Time</p>
                            <div className='flex flex-col border border-[#F4F4F4] rounded-[12px] p-4 gap-4'>
                                <div className='Icon flex justify-center items-center w-1 h-1 bg-light-50 p-6 rounded-full'>
                                    <img className='max-w-max' src={boxtime} alt="" />
                                </div>
                                <p className='text-[18px] max-sm:text-[14px]'>
                                    Free next day delivery to stores.
                                </p>
                                <p className='text-[#717378] max-sm:text-[12px]'>
                                    Home delivery is $4.99 for orders under $100 and is FREE for all orders over $100
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-4 flex-col'>
                            <p className='text-[16px] max-sm:text-[14px]'>Free Returns</p>
                            <div className='flex flex-col border border-[#F4F4F4] rounded-[12px] p-4 gap-4'>
                                <div className='Icon flex justify-center items-center w-1 h-1 bg-light-50 p-6 rounded-full'>
                                    <img className='max-w-max' src={trucktime} alt="" />
                                </div>
                                <p className='text-[18px] max-sm:text-[14px]'>
                                    30 days to return it to us for a refund
                                </p>
                                <p className='text-[#717378] max-sm:text-[12px]'>
                                    We have made returns SO EASY - you can now return your order to a store or send it with FedEx FOR FREE
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* End Bottom  */}
                </div >
                {/* End Cart__Left  */}

                {/* Cart__Right */}
                <div className='Cart__Right'>
                    <div className='flex flex-col gap-6 border border-[#F4F4F4] rounded-[16px] p-6'>
                        <div className='Subtotal flex flex-col gap-4'>
                            <div className='flex justify-between'>
                                <p className='text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]'>Subtotal</p>
                                <p className=''>$<span>360.00</span></p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]'>Discount</p>
                                <p className=''>$<span>0</span></p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]'>Shipping Costs</p>
                                <p className=''>$<span>50.00</span></p>
                            </div>
                        </div>
                        <div className='Code-Sale flex items-center justify-between gap-4'>
                            {/* <input type="text" placeholder='Coupon code' className='border border-[#F4F4F4] rounded-[8px] py-3 px-6 w-full' /> */}
                            <Input placeholder="Coupon code"  style={{margin: 0}}/>
                            <div className='py-3 px-5 rounded-full text-light-400 text-[14px] bg-light-50 whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-light-100 select-none'>
                                Apply Coupon
                            </div>
                        </div>
                        <div className='Free-Ship flex flex-col pt-4 gap-4 border-t border-[#F4F4F4]'>
                            <div className='relative'>
                                <div className='bg-[#F4F4F4] w-full h-[6px] rounded-full'></div>
                                <div className={`absolute bottom-0 bg-light-400 w-1/2 h-[6px] rounded-full `}></div>
                            </div>
                            <div className='flex flex-col gap-[6px] max-sm:*:text-[14px]'>
                                <p>Get Free <b className='font-medium text-[#17AF26]'>Shipping</b> for orders over <span className='text-red-500 font-medium'>$<span>100.00</span></span></p>
                                <div className='font-medium flex'>
                                    <div className='underline transition-all hover:text-light-400 hover:no-underline'>
                                        <a href="#">Continue Shopping</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to={`checkout`}>
                            <div className='bg-[#C8C9CB] hover:bg-light-400 transition-all duration-300 flex justify-center items-center w-full py-4 gap-4 rounded-full text-white font-medium cursor-pointer select-none'>
                                <div>Checkout</div>
                                <div className=''>|</div>
                                <div>$<span>547.00</span></div>
                            </div>
                        </Link>
                        <hr />
                        <div className='Payments flex flex-col gap-4'>
                            <p className='text-[#717378] uppercase text-[14px] tracking-[2px] max-sm:tracking-[1px]'>SECURE PAYMENTS PROVIDED BY</p>
                            <div className='flex gap-3'>
                                <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                                    <img src={idk} alt="" />
                                </div>
                                <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                                    <img src={visa} alt="" />
                                </div>
                                <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                                    <img src={bitcoin} alt="" />
                                </div>
                                <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                                    <img src={interac} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Cart__Right  */}
            </section >
            {/* End Cart  */}
        </>
    )
}

export default ShoppingCart
