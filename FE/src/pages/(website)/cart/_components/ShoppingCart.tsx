import { useState } from 'react'
//other
import useCart from '@/common/hooks/useCart';
import { toast } from '@/components/ui/use-toast';
import SkeletonCart from './SkeletonCart';
import CartRight from './CartRight';
import CartLeft from './CartLeft';

const ShopCart = () => {
    const [attribute, setAttribute] = useState<string | 1>('1');

    const userId = '66a105b8ad18a6e2447d5afb' // USER ID
    const { cart, isLoading, isError, updateQuantity, increaseItem, decreaseItem, removeItem, addVoucher, removeVoucher, changeVariant } = useCart(userId);
    // console.log(cart)

    function userAction(action: any, value: any) {
        const item = {
            userId: userId,
            ...value
        }
        // console.log(item)
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

            case 'removeVoucher':
                removeVoucher.mutate(item)
                break;

            case 'changeVariant':
                changeVariant.mutate(item, {
                    onSuccess: () => {
                        toast({
                            title: "Sucsess",
                            description: "Đổi thành công!",
                        })
                        setAttribute('1')
                    }
                })
                break;
        }
    }


    if (isLoading) return (
        <SkeletonCart />
    )
    if (isError) return <div>Is Error</div>

    return (
        <>
            {/* Cart  */}
            {/* <ModeToggle /> */}
            <section className="Status_Cart transition-all duration-500 space-y-8 px-4 py-8 max-w-[1408px] w-full max-[1408px]:w-[88%] mx-auto grid grid-cols-[57%_auto] max-lg:grid-cols-1 gap-x-16">
                {/* Cart__Left */}
                <CartLeft cart={cart} attribute={attribute} setAttribute={setAttribute} userAction={userAction} />
                {/* End Cart__Left  */}

                {/* Cart__Right */}
                <CartRight cart={cart} userAction={userAction} />
                {/* End Cart__Right  */}
            </section >
            {/* End Cart  */}
        </>
    )
}

export default ShopCart