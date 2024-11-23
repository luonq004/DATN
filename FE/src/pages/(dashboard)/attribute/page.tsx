import { Button } from "@/components/ui/button";
import Container from "../_components/Container";

import { columnAttribute } from "./_components/Column";
import { DataTable } from "./_components/DataTable";
import { useGetAtributes } from "./actions/useGetAllAttribute";
import Test from "./_components/Test";
import { Link } from "react-router-dom";

const AttributesPage = () => {
  const { isLoadingAtributes, atributes } = useGetAtributes();

  if (isLoadingAtributes) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container>
        <div className="flex justify-between">
          <h2>Attribute</h2>
          <Link to={"add"}>
            <Button className="bg-green-400">Add new</Button>
          </Link>
        </div>
        <div className="min-h-80 mt-5">
          <DataTable columns={columnAttribute} data={atributes} />
        </div>
      </Container>
      {/* <Test /> */}
    </>
  );
};

export default AttributesPage;
