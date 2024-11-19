import useVoucher from '@/common/hooks/useVouher';
import { TicketPercent, Truck } from 'lucide-react';
import { useEffect, useRef } from 'react';

const VoucherStorage = () => {
    const { getVoucher, } = useVoucher()
    const { data, isLoading, isError } = getVoucher('get-all-countdown')

    // console.log(data)

    const intervals = useRef<{ [key: string]: NodeJS.Timeout }>({}); // Lưu trữ các interval

    useEffect(() => {
        if (data) {
            data.forEach((item: any) => {
                const present = item.countdown;
                if (item.voucher.status === 'active' && present > 0) {
                    startCountdown(present, item.voucher._id);
                }
            });
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            Object.values(intervals.current).forEach(clearInterval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [data]);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            // Dừng countdown khi tab không còn visible
            Object.values(intervals.current).forEach(clearInterval);
        } else {
            // Bắt đầu lại countdown khi tab visible
            if (data) {
                data.forEach((item: any) => {
                    const present = item.countdown;
                    if (item.status === 'active' && present > 0) {
                        startCountdown(present, item.voucher._id);
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
                // changeStatusVoucher.mutate({ status: 'inactive', id });
                return;
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
    return (
        <div className='max-w-[1000px] py-10 px-16 flex flex-col gap-8 mx-auto'>
            <div className='text-2xl font-bold border-b border-zinc-400 pb-3'>
                <h1>Kho Voucher</h1>
            </div>
            <div className='flex flex-col max-h-[400px] overflow-y-auto gap-4'>
                {data?.map((item: any) => {
                    // console.log(matchedVoucher)
                    if (item.voucher.status === 'active' && item.countdown > 0) {
                        return (
                            <div key={item.voucher._id} className={`voucher-item p-3 w-full grid grid-cols-[68px_auto] gap-x-3 transition-all duration-200 border rounded-md border-gray-300`}>
                                <div className='bg-slate-300 flex justify-center items-center p-1'>
                                    {item.voucher.category === 'product'
                                        ? <TicketPercent size={42} />
                                        : <Truck size={42} />
                                    }
                                </div>
                                <div className='flex justify-between text-[13px] sm:text-[16px]'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex'>
                                            <div className='border-2 p-1 rounded-md border-light-400 text-light-400 text-xs'>
                                                <p>{item.voucher.code}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Giảm {item.voucher.discount.toLocaleString()}{item.voucher.type === 'fixed' ? 'đ' : '%'}</p>
                                        </div>
                                    </div>
                                    <div className='text-gray-400 flex gap-2 items-center'>
                                        <div>HSD:</div>
                                        <div className='' id={`countdown-${item.voucher._id}`}></div>
                                    </div>
                                </div>
                                {/* <div className='flex items-center select-none'>

                                </div> */}
                            </div>
                        );
                    } else return null;
                })}
            </div>
        </div>
    );
}

export default VoucherStorage