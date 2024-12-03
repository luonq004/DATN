import { useQuery } from "@tanstack/react-query";
import { getAllCategory, getAllProductWithCategory } from "./api";
import { useSearchParams } from "react-router-dom";

export function useGettAllProductWithCategory(id: string) {
  const {
    isLoading: isGetting,
    data: countProduct,
    error: errorGetting,
  } = useQuery({
    queryKey: ["Categories", id],
    queryFn: () => getAllProductWithCategory(id),
  });

  return { isGetting, countProduct, errorGetting };
}
