import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isCreatting } = useMutation({
    mutationFn: (data: unknown) => axios.post(`${apiUrl}/category`, data),

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Tạo danh mục thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["Categories"],
      });
    },

    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    },
  });

  return { createCategory, isCreatting };
};
