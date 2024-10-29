import minius from '@/assets/icons/transaction-minus.svg';
import boxtime from '@/assets/icons/box-time.svg';
import trucktime from '@/assets/icons/truck-time.svg';

const PolicyCart = () => {
    return (
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
    )
}

export default PolicyCart