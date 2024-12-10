import { useQuery } from "@tanstack/react-query";
import { getAllComment } from "./api";
import { useSearchParams } from "react-router-dom";

export function useGetAllComment() {
  // const [searchParams] = useSearchParams();

  // // Filter
  // const statusDisplay = searchParams.get("status");

  // const filterStatus =
  //   !statusDisplay || statusDisplay === "" ? "status" : statusDisplay;

  const {
    isLoading,
    data: listComment,
    error,
  } = useQuery({
    queryKey: ["Comments"],
    queryFn: getAllComment,
  });

  return { isLoading, listComment, error };
}
