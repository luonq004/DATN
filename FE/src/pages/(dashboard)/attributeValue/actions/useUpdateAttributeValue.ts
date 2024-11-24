import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttributeValueByID } from "./api";

export const useUpdateAttributeValue = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate: updateAttributeValue, isPending: isUpdating } = useMutation({
    mutationFn: (data: { name: string }) => updateAttributeValueByID(id, data),

    onSuccess: () => {
      toast({
        title: "Cập nhật giá trị thuộc tính thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["AttributeValue"],
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Cập nhật giá trị thuộc tính thất bại",
      });
    },
  });

  return { updateAttributeValue, isUpdating };
};
