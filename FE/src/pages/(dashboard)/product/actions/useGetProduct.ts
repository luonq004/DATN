import { useQuery } from "@tanstack/react-query";
import { getProduct } from "./api";

export function useGetProduct(id: string) {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => getProduct(id),
  });

  return { isLoading, product, error };
}
