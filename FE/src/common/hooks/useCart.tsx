import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const BASE_URL = "http://localhost:8080/api";

interface Icart {
    userId?: string,
    productId?: string,
    variantId?: string,
    quantity?: number
    voucherId?: string
}

const CART_QUERY_KEY = 'CART';

const getCart = async (userId: string) => {
    const { data } = await axios.get(`${BASE_URL}/cart/${userId}`);
    return data
}

const putCart = async (actiton: string, item: Icart) => {
    const url = `${BASE_URL}/cart/${actiton}`;
    const { data } = await axios.put(url, item);
    console.log(data)
    // return data
}

const useCart = (userId: string) => {
    const queryClient = useQueryClient();

    const { data: cart, isLoading, isError } = useQuery({
        queryKey: [CART_QUERY_KEY, userId],
        queryFn: async () => await getCart(userId),
        enabled: !!userId
        // !!userId => chuyển đổi sang dạng boolean. Nếu userId ko rỗng -> trả về true, kích hoạt truy vấn. Nếu userId rỗng thì ngược lại
    })

    const addItem = () => {

    }

    const cartActiton = (action: string) => {
        return useMutation({
            mutationFn: async (item: Icart) => {
                const data = await putCart(action, item);
                // console.log(data)
                return data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, userId] })
            },
            onError: (error: any) => {
                // alert(error.response.data.message)
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: `${error.response.data.message}`,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        })
    }

    return {
        cart,
        isLoading,
        isError,
        addItem,
        updateQuantity: cartActiton('update'),
        removeItem: cartActiton('remove'),
        increaseItem: cartActiton('increase'),
        decreaseItem: cartActiton('decrease'),
        addVoucher: cartActiton('add-voucher'),
        changeVariant: cartActiton('change-variant')
    }
}

export default useCart