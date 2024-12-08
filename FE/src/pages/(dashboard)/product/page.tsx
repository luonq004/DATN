import { columnProducts } from "@/components/Column";
import { DataTable } from "@/components/DataTable";
import Header from "./_components/Header";

import { useUserContext } from "@/common/context/UserProvider";
import { useGetAllProduct } from "./actions/useGetAllProduct";

const ProductPage = () => {
  const { _id } = useUserContext();

  const { isLoading, listProduct, error } = useGetAllProduct();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(listProduct);

  console.log(_id);

  return (
    // <Container>
    <div className="bg-white p-6">
      <Header />

      <div className="min-h-80 mt-5">
        <DataTable columns={columnProducts} data={listProduct?.data} />
      </div>
    </div>
    // </Container>
  );
};

export default ProductPage;
