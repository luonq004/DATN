import { IProduct } from "@/common/types/Product";
import { ColumnDef } from "@tanstack/react-table";

export const columnProducts: ColumnDef<IProduct>[] = [
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
