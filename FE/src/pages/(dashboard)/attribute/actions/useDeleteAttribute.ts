import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAttribute, isPending: isDeleting } = useMutation({
    mutationFn: (id) => axios.delete(`${apiUrl}/attributes/${id}`),

    onSuccess: () => {
      toast({
        title: "Xóa thuộc tính thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["Attributes"],
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Xóa thuộc tính thất bại",
      });
    },
  });

  return { deleteAttribute, isDeleting };
};
