import { Button } from "@/components/ui/button";
import Container from "../_components/Container";

import { columnAttribute } from "./_components/Column";
import { DataTable } from "./_components/DataTable";
import { useGetAtributes } from "./actions/useGetAllAttribute";

const data = [
  {
    _id: "1",
    name: "Size",
    values: ["S", "M", "L", "XL"],
  },
  {
    _id: "2",
    name: "Color",
    values: ["Red", "Green", "Blue", "Yellow"],
  },
  {
    _id: "3",
    name: "Material",
    values: ["Cotton", "Polyester", "Wool", "Silk"],
  },
  {
    _id: "4",
    name: "Brand",
    values: ["Adidas", "Nike", "Puma", "Reebok"],
  },
  {
    _id: "5",
    name: "dsadasd",
    values: ["Electronics", "Gadgets"],
  },
];

const AttributesPage = () => {
  const { isLoadingAtributes, atributes } = useGetAtributes();

  if (isLoadingAtributes) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div className="flex justify-between">
        <h2>Attribute</h2>
        <Button className="bg-green-400">Add new</Button>
      </div>
      <div className="min-h-80 mt-5">
        <DataTable columns={columnAttribute} data={atributes} />
      </div>
    </Container>
  );
};

export default AttributesPage;
