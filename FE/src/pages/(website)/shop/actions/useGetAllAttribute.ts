import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "./api";

export function useGetAllAttribute() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Category"],
    queryFn: getAllCategory,
  });

  return { isLoading, data, error };
}