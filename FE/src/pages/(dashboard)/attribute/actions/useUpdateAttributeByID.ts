import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttributeByID } from "./api";
// const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateAttributeByID = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate: updateAttribute, isPending: isUpdating } = useMutation({
    mutationFn: (data: { name: string }) => updateAttributeByID(id, data),

    onSuccess: () => {
      toast({
        title: "Cập nhât thuộc tính thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["Attributes"],
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Cập nhât thuộc tính thất bại",
      });
    },
  });

  return { updateAttribute, isUpdating };
};