import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateProduct = () => {
  const { mutate: createProduct, isPending: isCreatting } = useMutation({
    mutationFn: (data: unknown) =>
      axios.post("http://localhost:8080/api/v1/products", data),

    onSuccess: () => {
      console.log("Success");
    },
  });

  return { createProduct, isCreatting };
};
