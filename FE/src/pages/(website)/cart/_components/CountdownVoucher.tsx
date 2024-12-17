import { useUserContext } from '@/common/context/UserProvider';
import useVoucher from '@/common/hooks/useVouher';
import { CircleCheck, CirclePlus, CircleX, TicketPercent, Truck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'

const CountdownVoucher = ({ onApplyVoucher, onRemoveVoucher, cart }: any) => {
    const { _id }: any = useUserContext();
    const [isHover, setIsHover] = useState(false);
    const { getVoucher, changeStatusVoucher } = useVoucher()
    const { data, isLoading, isError } = getVoucher('get-all-countdown')
    const { data: voucherUsage, isLoading: isLoading2, isError: isError2 } = getVoucher('get-all-usage', _id)

    // console.log(voucherUsage?.length)

    const intervals = useRef<{ [key: string]: NodeJS.Timeout }>({}); // Lưu trữ các interval

    useEffect(() => {
        if (data) {
            data.forEach((item: any) => {
                const present = item.countdown;
                if (item.voucher.status === 'active' && present > 0) {
                    startCountdown(present, item.voucher);
                }
            });
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            Object.values(intervals.current).forEach(clearInterval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [data, cart]);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            // Dừng countdown khi tab không còn visible
            Object.values(intervals.current).forEach(clearInterval);
        } else {
            // Bắt đầu lại countdown khi tab visible
            if (data) {
                data.forEach((item: any) => {
                    const present = item.countdown;
                    // if (item.status === 'active' && present > 0) {
                    startCountdown(present, item.voucher);
                    // }
                });
            }
        }
    };

    function startCountdown(timeRemaining: number, voucher: any) {
        const countdownElement = document.getElementById(`countdown-${voucher._id}`);
        const parentDiv = countdownElement?.closest('.voucher-item');

        if (!countdownElement) return;

        intervals.current[voucher._id] = setInterval(() => {
            if (timeRemaining <= 60000) {
                countdownElement.classList.add('text-red-500');
            }
            if (timeRemaining <= 0) {
                clearInterval(intervals.current[voucher._id]);
                countdownElement.innerText = "Voucher đã hết hạn";
                if (parentDiv) {
                    parentDiv.classList.add('pointer-events-none');
                }
                changeStatusVoucher.mutate({ status: 'inactive', id: voucher._id });
                // onRemoveVoucher(voucher.code);
            }

            const hours = Math.floor((timeRemaining / (1000 * 60 * 60)));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownElement.innerText = `${hours}h ${minutes}m ${seconds}s`;

            timeRemaining -= 1000;
        }, 1000);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    if (isLoading2) return <div>Loading2...</div>;
    if (isError2) return <div>Error2</div>;
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='text-'>
                <h1>Voucher</h1>
            </div>
            <div className='flex flex-col max-h-[400px] overflow-y-auto gap-4'>
                {data?.map((item: any) => {
                    //kiểm tra voucher được sử dụng trong giỏ hàng
                    const matchedVoucher = cart?.voucher.find((voucher: any) => voucher._id === item.voucher._id);
                    //kiểm tra voucher được sử dụng trong danh sách voucher đã sử dụng
                    const matchedVoucherUsage = voucherUsage?.find((voucher: any) => voucher.voucherId === item.voucher._id);
                    // console.log(matchedVoucherUsage)
                    if (item.voucher.status === 'active' && item.countdown > 0 && item.voucher.countOnStock > 0) {
                        return (
                            <div key={item.voucher._id} className={`voucher-item p-3 w-full grid grid-cols-[15%_auto_5.5%] gap-x-3 transition-all duration-200 border rounded-md ${matchedVoucher ? 'border-black' : 'border-gray-300'} ${matchedVoucherUsage ? 'pointer-events-none relative' : ''}`}>
                                <div className='bg-slate-300 flex justify-center items-center p-1'>
                                    {item.voucher.category === 'product'
                                        ? <TicketPercent size={42} />
                                        : <Truck size={42} />
                                    }
                                </div>
                                <div className='flex flex-col justify-between gap-5 text-[13px] sm:text-[16px]'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='border-2 p-1 rounded-md border-light-400 text-light-400 text-xs'>
                                            <p>{item.voucher.code}</p>
                                        </div>
                                        <div>
                                            <p>Giảm {item.voucher.discount.toLocaleString()}{item.voucher.type === 'fixed' ? 'đ' : '%'}</p>
                                        </div>
                                    </div>
                                    <div className='text-gray-400 flex gap-2'>
                                        <div>HSD:</div>
                                        <div className='' id={`countdown-${item.voucher._id}`}></div>
                                    </div>
                                </div>
                                <div className={`${matchedVoucherUsage ? 'hidden' : 'flex'} items-center select-none`}>
                                    {matchedVoucher
                                        ? (
                                            <div
                                                onMouseEnter={() => setIsHover(matchedVoucher._id)}
                                                onMouseLeave={() => setIsHover(false)}
                                                className='cursor-pointer'
                                                onClick={() => onRemoveVoucher(matchedVoucher.code)}
                                            >
                                                {isHover === matchedVoucher._id ? <CircleX color='red' /> : <CircleCheck />}
                                            </div>
                                        )
                                        : <CirclePlus onClick={() => onApplyVoucher(item.voucher.code)} className='text-gray-300 hover:text-black cursor-pointer' />
                                    }
                                </div>

                                {/* //kiểm tra voucher đã sử dụng */}
                                <div className={`${matchedVoucherUsage ? 'absolute' : 'hidden'} w-full h-full bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold`}>
                                    <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Voucher đã được sử dụng</span>
                                </div>
                            </div>
                        );
                    }
                    else if (item.voucher.status !== 'active') {
                        return (
                            <div key={item.voucher._id} className={`voucher-item p-3 w-full z-0 relative grid grid-cols-[15%_auto_5.5%] gap-x-3 transition-all duration-200 border rounded-md ${matchedVoucher ? 'border-black' : 'border-gray-300'}`}>
                                <div className='bg-slate-300 flex justify-center items-center p-1'>
                                    {item.voucher.category === 'product'
                                        ? <TicketPercent size={42} />
                                        : <Truck size={42} />
                                    }
                                </div>
                                <div className='flex flex-col justify-between gap-5 text-[13px] sm:text-[16px]'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='border-2 p-1 rounded-md border-light-400 text-light-400 text-xs'>
                                            <p>{item.voucher.code}</p>
                                        </div>
                                        <div>
                                            <p>Giảm {item.voucher.discount.toLocaleString()}{item.voucher.type === 'fixed' ? 'đ' : '%'}</p>
                                        </div>
                                    </div>
                                    <div className='text-gray-400 flex gap-2'>
                                        <div>HSD:</div>
                                        {/* <div className='' id={`countdown-${item.voucher._id}`}></div> */}
                                    </div>
                                </div>

                                {cart?.voucher?.find((voucher: any) => voucher._id === item.voucher._id)
                                    ?
                                    <div
                                        onClick={() => onRemoveVoucher(item.voucher.code)}
                                        className='absolute w-full h-full cursor-pointer z-20 bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold'>
                                        <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Voucher ngưng hoạt động, chạm vào để xóa</span>
                                    </div>
                                    :
                                    <div className='absolute w-full h-full bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold'>
                                        <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Voucher ngừng hoạt động</span>
                                    </div>
                                }
                            </div>
                        );
                    } else if (item.countdown < 0) {
                        return (
                            <div key={item.voucher._id} className={`voucher-item p-3 w-full z-0 relative grid grid-cols-[15%_auto_5.5%] gap-x-3 transition-all duration-200 border rounded-md ${matchedVoucher ? 'border-black' : 'border-gray-300'}`}>
                                <div className='bg-slate-300 flex justify-center items-center p-1'>
                                    {item.voucher.category === 'product'
                                        ? <TicketPercent size={42} />
                                        : <Truck size={42} />
                                    }
                                </div>
                                <div className='flex flex-col justify-between gap-5 text-[13px] sm:text-[16px]'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='border-2 p-1 rounded-md border-light-400 text-light-400 text-xs'>
                                            <p>{item.voucher.code}</p>
                                        </div>
                                        <div>
                                            <p>Giảm {item.voucher.discount.toLocaleString()}{item.voucher.type === 'fixed' ? 'đ' : '%'}</p>
                                        </div>
                                    </div>
                                    <div className='text-gray-400 flex gap-2'>
                                        <div>HSD:</div>
                                        <div className='text-red-500'>Hết hạn sử dụng</div>
                                    </div>
                                </div>
                                {cart?.voucher?.find((voucher: any) => voucher._id === item.voucher._id)
                                    ?
                                    <div
                                        onClick={() => onRemoveVoucher(item.voucher.code)}
                                        className='absolute w-full h-full cursor-pointer z-20 bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold'>
                                        <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Voucher hết hạn, chạm vào để xóa</span>
                                    </div>
                                    :
                                    <div className='absolute w-full h-full bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold'>
                                        <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Voucher hết hạn</span>
                                    </div>
                                }
                            </div>
                        );
                    } else if (item.voucher.countOnStock <= 0) {
                        return (
                            <div key={item.voucher._id} className={`voucher-item p-3 w-full z-0 relative grid grid-cols-[15%_auto_5.5%] gap-x-3 transition-all duration-200 border rounded-md ${matchedVoucher ? 'border-black' : 'border-gray-300'}`}>
                                <div className='bg-slate-300 flex justify-center items-center p-1'>
                                    {item.voucher.category === 'product'
                                        ? <TicketPercent size={42} />
                                        : <Truck size={42} />
                                    }
                                </div>
                                <div className='flex flex-col justify-between gap-5 text-[13px] sm:text-[16px]'>
                                    <div className='flex gap-3 items-center'>
                                        <div className='border-2 p-1 rounded-md border-light-400 text-light-400 text-xs'>
                                            <p>{item.voucher.code}</p>
                                        </div>
                                        <div>
                                            <p>Giảm {item.voucher.discount.toLocaleString()}{item.voucher.type === 'fixed' ? 'đ' : '%'}</p>
                                        </div>
                                    </div>
                                    <div className='text-gray-400 flex gap-2'>
                                        <div>HSD:</div>
                                        {/* <div className='text-red-500'>Hết hạn sử dụng</div> */}
                                    </div>
                                </div>
                                {cart?.voucher?.find((voucher: any) => voucher._id === item.voucher._id)
                                    ?
                                    <div
                                        onClick={() => onRemoveVoucher(item.voucher.code)}
                                        className='absolute w-full h-full cursor-pointer z-20 bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold'>
                                        <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Số lượng voucher đã hết, chạm vào để xóa</span>
                                    </div>
                                    :
                                    <div className='absolute w-full h-full bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold'>
                                        <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Số lượng voucher đã hết</span>
                                    </div>
                                }
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default CountdownVoucher;
