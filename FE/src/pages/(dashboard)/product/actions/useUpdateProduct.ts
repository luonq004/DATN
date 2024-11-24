import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateProduct = () => {
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: async ({ data, id }: { data: unknown; id: string }) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/products/${id}`,
          data
        );
        return response.data; // Trả về dữ liệu phản hồi
      } catch (error) {
        console.error("Error updating product:", error);
        throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
      }
    },

    // onSuccess: () => {
    //   console.log("Success");
    // },
  });

  return { updateProduct, isUpdating };
};
