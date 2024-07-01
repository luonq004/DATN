import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';

const CartPage = () => {
    const [cartStatus, setCartStatus] = useState<number | 1>(1);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.match(/\/cart(\/)?$/)) {
            setCartStatus(1);
        } else if (location.pathname.match(/\/cart\/check-out(\/)?$/)) {
            setCartStatus(2);
        } else if (location.pathname.match(/\/cart\/order(\/)?$/)) {
            setCartStatus(3);
        } else {
            setCartStatus(1);
        }
    }, [location]);

    return <>
        {/* Status  */}
        <div className="Status w-full py-7 bg-[#F4F4F4] overflow-hidden">
            <div className={`flex justify-center items-center gap-x-4 mx-auto max-[1408px]:w-[88%]`}>
                <div className={`flex gap-2 items-center font-medium transition-all duration-700 ${cartStatus > 1 ? 'max-sm:w-8' : 'max-sm:w-[143px]'} `}>
                    <div className={`py-2 px-2 rounded-full ${cartStatus === 1 ? 'bg-light-400 transition duration-500' : cartStatus === 2 ? 'bg-light-200 transition duration-500' : cartStatus === 3 ? 'bg-light-200' : 'bg-light-200'}`}>
                        <div className="w-5 max-sm:w-4 h-5 max-sm:h-4 flex items-center justify-center">
                            {cartStatus === 1 ?
                                <img className="w-full" src="../src/assets/icons/bag-1.svg" alt="" />
                                :
                                <img className="w-full" src="../src/assets/icons/Tick.svg" alt="" />
                            }
                        </div>
                    </div>
                    <p className={`whitespace-nowrap max-sm:text-[14px] ${cartStatus === 1 ? 'transition-all duration-200 max-sm:opacity-100' : cartStatus === 2 ? 'transition-all duration-200 max-sm:opacity-0' : cartStatus === 3 ? 'max-sm:opacity-0' : 'max-sm:opacity-0'} `}>Shopping cart</p>
                </div>

                <div className="relative transition-all duration-500 w-[165px] max-[1408px]:w-[10%]">
                    <div className={`bg-[#C3D2CC] w-full ${cartStatus === 1 ? 'transition-all duration-700 h-[1px]' : cartStatus === 2 ? 'transition-all duration-700 h-[2px]' : cartStatus === 3 ? 'h-[2px]' : 'h-[2px]'} `}></div>
                    <div className={`bg-light-400 h-[2px] absolute top-0 left-0  ${cartStatus === 1 ? 'transition-all duration-700 w-[0%]' : cartStatus === 2 ? 'transition-all duration-700 w-[100%]' : cartStatus === 3 ? 'w-[100%]' : 'w-[100%]'} `}></div>
                </div>

                <div className={`flex gap-2 items-center font-medium transition-all duration-700 ${cartStatus === 2 ? 'max-sm:w-[108px]' : cartStatus > 2 ? 'max-sm:w-8' : 'max-sm:w-8'} `}>
                    <div className={`py-2 px-2 rounded-full transition-all duration-500 ${cartStatus === 2 ? 'bg-light-400' : cartStatus > 2 ? 'bg-light-200' : 'bg-white'} `}>
                        <div className="w-5 max-sm:w-4 h-5 max-sm:h-4 flex items-center justify-center">
                            {cartStatus === 2 ?
                                <img className="w-full h-full" src="../src/assets/icons/wallet-1.svg" alt="" />
                                :
                                cartStatus > 2 ?
                                    <img className="w-full h-full" src="../src/assets/icons/Tick.svg" alt="" />
                                    :
                                    <img className="w-full h-full" src="../src/assets/icons/wallet-2.svg" alt="" />
                            }

                        </div>
                    </div>
                    <p className={`whitespace-nowrap max-sm:text-[14px] transition-all duration-200 ${cartStatus === 2 ? 'max-sm:block' : 'max-sm:hidden'} `}>Checkout</p>
                </div>

                <div className="relative transition-all duration-500 w-[165px] max-[1408px]:w-[10%]">
                    <div className={`bg-[#C3D2CC] w-full transition-all duration-700 ${cartStatus > 2 ? 'h-[2px]' : 'h-[1px]'} `}></div>
                    <div className={`bg-light-400 h-[2px] absolute top-0 left-0  transition-all duration-700 ${cartStatus > 2 ? 'w-[100%]' : 'w-[0%]'}`}></div>
                </div>

                <div className={`flex gap-2 items-center font-medium transition-all duration-700 ${cartStatus === 3 ? 'max-sm:w-[154px]' : cartStatus > 3 ? 'max-sm:w-8' : 'max-sm:w-8'} `}>
                    <div className={`py-2 px-2 rounded-full transition-all duration-500 ${cartStatus === 3 ? 'bg-light-400' : cartStatus > 3 ? 'bg-light-200' : 'bg-white'} `}>
                        <div className="w-5 max-sm:w-4 h-5 max-sm:h-4 flex items-center justify-center">
                            {cartStatus === 3 ?
                                <img className="w-full h-full" src="../src/assets/icons/ticket-1.svg" alt="" />
                                :
                                cartStatus > 3 ?
                                    <img className="w-full h-full" src="../src/assets/icons/Tick.svg" alt="" />
                                    :
                                    <img className="w-full h-full" src="../src/assets/icons/ticket-2.svg" alt="" />
                            }
                        </div>
                    </div>
                    <p className={`whitespace-nowrap max-sm:text-[14px] transition-all duration-200 ${cartStatus === 3 ? 'max-sm:block' : 'max-sm:hidden'} `}>Order Complete</p>
                </div>
            </div >
        </div >
        {/* End Status  */}
        < Outlet />


    </>;
}

export default CartPage
