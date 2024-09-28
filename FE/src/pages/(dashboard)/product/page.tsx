import { DataTable } from "@/components/DataTable";
import Header from "./_components/Header";
import { columnProducts } from "@/components/Column";
import { useSearchParams } from "react-router-dom";
import DataGrid from "./_components/DataGrid";

const data = [
  {
    _id: "bbb9224e-226a-4072-bb50-0f4c151fee5f",
    name: "Modern",
    category: ["sports", "fitness"],
    price: 84.14,
    description: "Arrive executive staff large research cause environment.",
    image: "https://placekitten.com/721/175",
  },
  {
    _id: "03348a3b-406e-4735-8e77-2e4763e9666e",
    name: "Win",
    category: ["clothing", "fashion"],
    price: 318.72,
    description: "Wind week try.",
    image: "https://placekitten.com/108/816",
  },
  {
    _id: "528f92af-78bf-4843-ba94-3e50f5472a13",
    name: "Unit",
    category: ["sports", "fitness"],
    price: 356.0,
    description: "Inside fact budget situation system according important.",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    _id: "137889d5-cec3-48f1-9c80-d5919b63d7ea",
    name: "Senior",
    category: ["beauty", "skincare"],
    price: 393.29,
    description: "Mean sound real thought interesting college.",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    _id: "061b6a5c-2ba2-46c6-a51e-53d946fb6e45",
    name: "Under",
    category: ["beauty", "skincare"],
    price: 226.79,
    description: "Interesting situation garden small police everybody.",
    image: "https://dummyimage.com/272x294",
  },
  {
    _id: "e35922ca-d99c-48bb-aca8-94da7511852a",
    name: "Mind",
    category: ["books", "stationery"],
    price: 35.05,
    description: "Government center rich fish.",
    image: "https://www.lorempixel.com/198/317",
  },
  {
    _id: "30254dd8-6609-45a6-bc2a-3c17c0ef8f6e",
    name: "Someone",
    category: ["books", "stationery"],
    price: 434.58,
    description: "Truth peace throughout by look consumer find.",
    image: "https://dummyimage.com/540x97",
  },
  {
    _id: "025a909d-3f10-4f5c-a6e7-f488e99bda71",
    name: "Parent",
    category: ["home", "furniture"],
    price: 346.36,
    description: "To goal fly loss mind card skill computer.",
    image: "https://dummyimage.com/473x720",
  },
  {
    _id: "0ff3e7c7-9199-448d-bce9-6e96286945d8",
    name: "Book",
    category: ["home", "furniture"],
    price: 447.6,
    description: "Executive our region model.",
    image: "https://placekitten.com/487/317",
  },
  {
    _id: "7b1d8586-a47a-41ed-989a-4f90aa66383f",
    name: "Operation",
    category: ["books", "stationery"],
    price: 157.91,
    description: "City prove beyond hope season remember.",
    image: "https://placekitten.com/410/719",
  },
  {
    _id: "ee768e02-ef0b-4412-a999-27c626acb5db",
    name: "Training",
    category: ["beauty", "skincare"],
    price: 182.69,
    description: "Health worker individual such fight goal by.",
    image: "https://www.lorempixel.com/349/619",
  },
  {
    _id: "f825c245-2dcf-4dd2-aa6f-534f804394e3",
    name: "Interview",
    category: ["clothing", "fashion"],
    price: 438.19,
    description: "Section reach smile sport mission.",
    image: "https://placekitten.com/1007/521",
  },
  {
    _id: "baeb0e6c-5d84-483f-8301-3a60e3945633",
    name: "Place",
    category: ["sports", "fitness"],
    price: 286.94,
    description: "Within return type one.",
    image: "https://placeimg.com/729/956/any",
  },
  {
    _id: "d2cf9f72-4810-4f11-a22a-797632dcbfc0",
    name: "Employee",
    category: ["electronics", "gadgets"],
    price: 415.01,
    description: "Question right what left my.",
    image: "https://placekitten.com/932/1016",
  },
  {
    _id: "0b570508-3343-4eca-a269-30dd7dabd04b",
    name: "Onto",
    category: ["clothing", "fashion"],
    price: 425.44,
    description: "Consumer forget enjoy everyone agreement mind.",
    image: "https://dummyimage.com/595x266",
  },
  {
    _id: "0a3ea5b1-4378-43fe-849b-2487f54ba230",
    name: "Listen",
    category: ["home", "furniture"],
    price: 371.22,
    description: "Manage thought computer.",
    image: "https://placekitten.com/489/951",
  },
  {
    _id: "1e6c3d91-2af0-4875-b42a-e00f40374192",
    name: "Realize",
    category: ["sports", "fitness"],
    price: 353.68,
    description: "Before home company some.",
    image: "https://www.lorempixel.com/799/32",
  },
  {
    _id: "d3c4a906-d63b-4eaf-98a4-635e0afbbe69",
    name: "Book",
    category: ["beauty", "skincare"],
    price: 10.96,
    description: "Term song here father old name catch.",
    image: "https://dummyimage.com/351x419",
  },
];

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const currentLayout = searchParams.get("layout") ?? "table";

  return (
    <div className="p-7 mx-auto">
      <Header />

      <div className="min-h-80 mt-5">
        {currentLayout === "table" ? (
          <DataTable columns={columnProducts} data={data} />
        ) : (
          <DataGrid data={data} />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
