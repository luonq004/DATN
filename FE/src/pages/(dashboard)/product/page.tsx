import { DataTable } from "@/components/DataTable";
import Header from "./_components/Header";
import { columnProducts } from "@/components/Column";
import { useSearchParams } from "react-router-dom";

import Container from "./_components/Container";
import { useGetAllProduct } from "./actions/useGetAllProduct";
import { useUserContext } from "@/common/context/UserProvider";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { _id } = useUserContext();
  // const currentLayout = searchParams.get("layout") ?? "table";

  const { isLoading, listProduct, error } = useGetAllProduct();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(listProduct);

  console.log(_id);

  return (
    // <Container>
    <>
      <Header />

      <div className="min-h-80 mt-5">
        <DataTable columns={columnProducts} data={listProduct?.data} />
      </div>
    </>
    // </Container>
  );
};

export default ProductPage;
