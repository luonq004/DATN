import useVoucher from '@/common/hooks/useVouher';
import { CircleCheck, CirclePlus, CircleX, TicketPercent, Truck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'

const CountdownVoucher = ({ onApplyVoucher, onRemoveVoucher, cart }: any) => {
    const [isHover, setIsHover] = useState(false);
    const { getVoucher, changeStatusVoucher } = useVoucher()
    const { data, isLoading, isError } = getVoucher('get-all-countdown')

    // console.log(data)

    const intervals = useRef<{ [key: string]: NodeJS.Timeout }>({}); // Lưu trữ các interval

    useEffect(() => {
        if (data) {
            data.forEach((item: any) => {
                if (item.countdown && item.countdown > 0) {
                    startCountdown(item.countdown, item.voucher._id);
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
                    if (item.countdown && item.countdown > 0) {
                        startCountdown(item.countdown, item.voucher._id);
                    }
                });
            }
        }
    };

    function startCountdown(timeRemaining: number, id: string) {
        const countdownElement = document.getElementById(`countdown-${id}`);
        const parentDiv = countdownElement?.closest('.voucher-item');

        if (!countdownElement) return;

        intervals.current[id] = setInterval(() => {
            if (timeRemaining <= 60000) {
                countdownElement.classList.add('text-red-500');
            }
            if (timeRemaining <= 0) {
                clearInterval(intervals.current[id]);
                countdownElement.innerText = "Voucher đã hết hạn";
                if (parentDiv) {
                    parentDiv.classList.add('pointer-events-none');
                }
                changeStatusVoucher.mutate({ status: 'inactive', id });
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            timeRemaining -= 1000;
        }, 1000);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='text-'>
                <h1>Voucher</h1>
            </div>
            <div className='flex flex-col max-h-[400px] overflow-y-auto gap-4'>
                {data?.map((item: any) => {
                    const matchedVoucher = cart?.voucher.find((voucher: any) => voucher._id === item.voucher._id);
                    // console.log(matchedVoucher)
                    return (
                        <div key={item.voucher._id} className={`voucher-item p-3 w-full grid grid-cols-[15%_auto_5.5%] gap-x-3 transition-all duration-200 border rounded-md ${matchedVoucher ? 'border-black' : 'border-gray-300'}`}>
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
                            <div className='flex items-center select-none'>
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CountdownVoucher;
