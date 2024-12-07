import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "./api";
import { useSearchParams } from "react-router-dom";

export function useGetAllProduct() {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValueCategory = searchParams.get("category");
  const filterValuePriceJson = searchParams.get("price");
  const filterValuePrice = filterValuePriceJson
    ? JSON.parse(filterValuePriceJson)
    : null;
  const valueLimit = searchParams.get("limit");

  const filterCategory =
    !filterValueCategory || filterValueCategory === "all"
      ? ""
      : filterValueCategory;

  const filterPrice =
    !filterValuePrice || filterValuePrice === "" ? "" : filterValuePrice;

  // Pagination
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;
  const limit = valueLimit ? +valueLimit : 9;

  // Sort

  const {
    isLoading,
    data: listProduct,
    error,
  } = useQuery({
    queryKey: ["Products", page, limit, filterCategory, filterPrice],
    queryFn: () =>
      getAllProduct({
        page,
        limit,
        category: filterCategory,
        price: filterPrice,
      }),
  });

  return { isLoading, listProduct, error };
}
