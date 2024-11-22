import { useParams } from "react-router-dom";
import { useGetAtributes } from "./actions/useGetAllAttributeValues";
import Container from "../_components/Container";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/DataTable";
import { columnAttributeValues } from "./_components/Column";

const AttributeValuePage = () => {
  const { id } = useParams();

  // console.log("type", id);

  const { isLoading, atributeValues, error } = useGetAtributes(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="flex justify-between">
        <h2>Attribute value</h2>
        <Button className="bg-green-400">Add new</Button>
      </div>
      <div className="min-h-80 mt-5">
        <DataTable
          columns={columnAttributeValues}
          data={atributeValues[0].values}
        />
      </div>
    </Container>
  );
};

export default AttributeValuePage;
