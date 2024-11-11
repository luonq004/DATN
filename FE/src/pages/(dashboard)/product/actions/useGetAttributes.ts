import { useQuery } from "@tanstack/react-query";
import { getAtributes } from "./api";

export function useGetAtributes() {
  const {
    isLoading: isLoadingAtributes,
    data: atributes,
    error,
  } = useQuery({
    queryKey: ["Atributes"],
    queryFn: getAtributes,
  });

  return { isLoadingAtributes, atributes, error };
}
