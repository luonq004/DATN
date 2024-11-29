import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttributeValues } from "./api";

export const useCreateAttributeValue = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate: createAttributeValue, isPending: isCreating } = useMutation({
    mutationFn: (data: { name: string; type: string; value: string }) =>
      createAttributeValues(id, data),

    onSuccess: () => {
      toast({
        title: "Tạo mới giá trị thuộc tính thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["AttributeValue"],
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Tạo mới giá trị thuộc tính thất bại",
      });
    },
  });

  return { createAttributeValue, isCreating };
};
