import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "./api";

export function useGetAllProduct() {
  const {
    isLoading,
    data: listProduct,
    error,
  } = useQuery({
    queryKey: ["Product"],
    queryFn: getAllProduct,
  });

  return { isLoading, listProduct, error };
}
