import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const apiUrl = import.meta.env.VITE_API_URL;

const CART_QUERY_KEY = "WishList";

const getWishList = async (userId: string) => {
  const { data } = await axios.get(`${apiUrl}/wishlist/${userId}`);
  return data;
};

const puttWishList = async (actiton: string, item) => {
  const url = `${apiUrl}/wishlist/${actiton}`;
  const { data } = await axios.put(url, item);
  return data;
};

const useWishList = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: wishList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [CART_QUERY_KEY, userId],
    queryFn: async () => await getWishList(userId),
    enabled: !!userId,
    // !!userId => chuyển đổi sang dạng boolean. Nếu userId ko rỗng -> trả về true, kích hoạt truy vấn. Nếu userId rỗng thì ngược lại
  });

  const wishListActiton = (action: string) => {
    return useMutation({
      mutationFn: async (item) => {
        const data = await puttWishList(action, item);
        // console.log(data)
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, userId] });
      },
      onError: (error: any) => {
        // console.log(error.response.data.message)
        toast({
          variant: "destructive",
          title: "Error",
          description: `${error.response.data.message}`,
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      },
    });
  };

  return {
    wishList,
    isLoading,
    isError,
    updateQuantity: wishListActiton("update"),
    removeItem: wishListActiton("remove"),
    increaseItem: wishListActiton("increase"),
    decreaseItem: wishListActiton("decrease"),
    changeVariant: wishListActiton("change-variant"),
  };
};

export default useWishList;
