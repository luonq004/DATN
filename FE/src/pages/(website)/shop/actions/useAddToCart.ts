import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

import axios from "axios";

export const useAddToCart = () => {
  const { mutate: addCart, isPending: isAdding } = useMutation({
    mutationFn: (data: unknown) => axios.post(`${apiUrl}/cart/add`, data),

    onSuccess: () => {
      toast({
        className: "bg-green-400 text-white h-auto",
        title: "Thêm vào giỏ hàng thành công",
      });
    },

    onError: (error: Error) => {
      console.log(error);

      toast({
        className: "h-20",
        variant: "destructive",
        title: error?.response?.data?.message,
      });
    },
  });

  return { addCart, isAdding };
};
