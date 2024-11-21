import { useQuery } from "@tanstack/react-query";
import { getAllAttributeValue } from "./api";

export function useGetAtributes(id: string) {
  const {
    isLoading,
    data: atributeValues,
    error,
  } = useQuery({
    queryKey: ["AtributesValue", id],
    queryFn: () => getAllAttributeValue(id),
  });

  return { isLoading, atributeValues, error };
}
