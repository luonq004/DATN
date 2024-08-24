import { useState } from 'react'

//icons
import minius from '@/assets/icons/transaction-minus.svg';
import boxtime from '@/assets/icons/box-time.svg';
import trucktime from '@/assets/icons/truck-time.svg';
import idk from '@/assets/icons/idk.svg';
import visa from '@/assets/icons/Visa.svg';
import bitcoin from '@/assets/icons/Bitcoin.svg';
import interac from '@/assets/icons/Interac.svg';
import SizeColorSelector from './SizeColorSelect';

//other
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import useCart from '@/common/hooks/useCart';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
    voucherCode: z.string().min(2, {
        message: "Không hợp lệ",
    }),
})

const ShopCart = () => {
    const [attribute, setAttribute] = useState<string | 1>(1);

    const hanldeOnChangeAttribute = (idCart: string) => {
        // console.log(number)
        setAttribute(idCart);
    }

    const userId = '66a105b8ad18a6e2447d5afb' // USER ID
    const { cart, isLoading, isError, updateQuantity, increaseItem, decreaseItem, removeItem, addVoucher, changeVariant } = useCart(userId);
    // console.log(cart)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            voucherCode: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        userAction({ type: 'applyVoucher' }, values)
    }

    function userAction(action: any, value: any) {
        const item = {
            userId: userId,
            ...value
        }
        switch (action.type) {
            case 'changeQuality':
                if (value.quantity < 0) {
                    return
                }
                if (isNaN(value.quantity)) {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: `Vui lòng nhập số!`,
                    })
                    return
                }
                updateQuantity.mutate(item)
                break;

            case 'decreaseItem':
                if (value.quantity === 1) {
                    const confirm = window.confirm('Sản phẩm sẽ bị xóa, bạn chắc chứ?')
                    if (!confirm) return
                    decreaseItem.mutate(item)
                }
                decreaseItem.mutate(item)
                break;

            case 'increaseItem':
                increaseItem.mutate(item)
                break;

            case 'removeItem':
                const confirm = window.confirm('Bạn chắc chứ?')
                if (!confirm) return
                removeItem.mutate(item)
                break;

            case 'applyVoucher':
                addVoucher.mutate(item, {
                    onSuccess: () => {
                        // console.log(`Thêm mã giảm giá ${value.voucherCode} thành công`)
                        toast({
                            title: "Sucsess",
                            description: `Thêm mã giảm giá ${value.voucherCode} thành công`,
                        })
                    }
                })
                break;

            case 'changeVariant':
                changeVariant.mutate(item, {
                    onSuccess: () => {
                        toast({
                            title: "Sucsess",
                            description: "Đổi thành công!",
                        })
                    }
                })
                break;
        }
    }


    if (isLoading) return (
        <div className="Status_Cart transition-all duration-500 space-y-8 px-4 py-8 max-w-[1408px] w-full max-[1408px]:w-[88%] mx-auto grid grid-cols-[57%_auto] max-lg:grid-cols-1 gap-x-16">
            <div className="Your_Cart flex flex-col gap-6">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
            <div className='Cart__Right'>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        </div>
    )
    if (isError) return <div>Is Error</div>

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
                        <p className="text-[#9D9EA2] max-sm:text-[14px] transition-all duration-500">({cart?.products.length})</p>
                    </div>
                    {/* End Top  */}

                    {/* Mid  */}
                    <div className="Mid flex flex-col gap-6">
                        {/* Cart__Product */}
                        {cart?.products.map((item: any, index: number) => (
                            <div key={index} className="grid transition-all duration-500 grid-cols-[81px_auto] max-sm:grid-cols-[75px_auto] gap-x-4 border-[#F4F4F4] border-b pb-6">
                                {/* Image  */}
                                <div className="Image_Product">
                                    <div className="border border-[#dddcdc] rounded-[6px] p-1">
                                        <img className="w-full h-full" src={item.productItem.avatarMain} alt="img" />
                                    </div>
                                </div>
                                {/* information */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex max-sm:grid max-sm:grid-cols-[50%_auto] justify-between items-center gap-4">
                                        <div className="text-[#9D9EA2] flex w-[45%] max-sm:w-full transition-all duration-500 max-sm:text-[14px]">
                                            <div className='hover:text-black'>
                                                <Link to={`#`}>{item.productItem.name}</Link>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 max-sm:col-start-1">
                                            <div className="flex rounded-[6px] *:transition-all duration-500 max-w-[8rem]">
                                                <div onClick={() => userAction({ type: 'decreaseItem' }, { productId: item.productItem._id, variantId: item.variantItem._id, quantity: item.quantity })} className="px-[15px] py-[6px] flex justify-center items-center cursor-pointer select-none">
                                                    -
                                                </div>
                                                <div className="border border-[#F4F4F4] rounded-[4px] bg-[#F4F4F4] px-[12.8px] py-[5px] text-black flex justify-center items-center">
                                                    <input
                                                        onChange={(value) => userAction({ type: 'changeQuality' }, { productId: item.productItem._id, variantId: item.variantItem._id, quantity: Number(value.target.value) })}
                                                        className="p-0 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                                                        style={{ MozAppearance: 'textfield' }}
                                                        type="text"
                                                        min={1}
                                                        value={item.quantity}
                                                        title="Quantity"
                                                        placeholder="Enter quantity"
                                                    />
                                                </div>
                                                <div onClick={() => userAction({ type: 'increaseItem' }, { productId: item.productItem._id, variantId: item.variantItem._id })} className="px-[15px] py-[6px] flex justify-center items-center cursor-pointer select-none">
                                                    +
                                                </div>
                                            </div>
                                        </div>

                                        <div className=''>
                                            <p>$<span>{item.variantItem.price}.00</span></p>
                                        </div>
                                        <div className="group transition-all pb-0 hover:pb-1 cursor-pointer max-sm:col-start-2 max-sm:row-start-1 max-sm:flex max-sm:justify-end" onClick={() => userAction({ type: 'removeItem' }, { productId: item.productItem._id, variantId: item.variantItem._id })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="stroke-gray-500 transition duration-300 group-hover:stroke-red-500">
                                                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Attribute  */}
                                    <div className="flex items-center gap-4 max-sm:justify-between">
                                        <p className="text-[#9D9EA2] w-[52%] max-[1408px]:w-[49%] max-xl:w-[47%] max-lg:w-[52%] transition-all duration-500 max-sm:text-[14px]">Phân loại</p>
                                        <div className="relative">
                                            {/* Attribute__Table  */}
                                            <SizeColorSelector idProduct={item.productItem._id} idVariant={item.variantItem._id} attribute={attribute} idCart={item._id} onChangeAttribute={hanldeOnChangeAttribute} onChangeVariant={(value: any) => userAction({ type: 'changeVariant' }, value)} />
                                            {/* End Attribute__Table  */}
                                        </div>
                                    </div>
                                    {/* End Attribute  */}
                                    <div>
                                        <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">Còn {item.variantItem.countOnStock} sản phẩm</p>
                                    </div>

                                </div>
                            </div>
                        ))}
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
                                <p className=''>$<span>{cart?.subTotal}.00</span></p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]'>Discount</p>
                                <p className=''>$<span>{cart?.discount}.00</span></p>
                            </div>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="Code-Sale flex items-start justify-between gap-4">
                                <div className='w-full'>
                                    <FormField
                                        control={form.control}
                                        name="voucherCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder='ABCEFGH' className='w-full' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <button className='py-3 px-5 rounded-full text-light-400 text-[14px] bg-light-50 whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-light-100 select-none' type="submit">
                                    Apply Coupon
                                </button>

                                <FormMessage />
                            </form>
                        </Form>
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
                                <div>$<span>{cart?.total}.00</span></div>
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

export default ShopCart