import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  _id: string;
  name: string;
  category: string[];
  price: number;
  description: string;
  image: string;
  // status: "pending" | "processing" | "success" | "failed";
};

export const columnProducts: ColumnDef<Product>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    header: "Actions",
  },
];
