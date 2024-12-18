import { useQuery } from "@tanstack/react-query";
import { getProductEdit } from "./api";

export function useGetProduct(id: string) {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => getProductEdit(id),
  });

  return { isLoading, product, error };
}
