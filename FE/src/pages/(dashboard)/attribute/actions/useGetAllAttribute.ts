import { useQuery } from "@tanstack/react-query";
import { getAllAttribute } from "./api";

export function useGetAtributes() {
  const {
    isLoading: isLoadingAtributes,
    data: atributes,
    error,
  } = useQuery({
    queryKey: ["Attributes"],
    queryFn: getAllAttribute,
  });

  return { isLoadingAtributes, atributes, error };
}
