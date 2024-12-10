import { Category } from "@/common/types/Product";

import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
// import ActionCell from "./ActionCell";

export const column: ColumnDef<Category>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <span className="text-sm text-gray-500">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Ảnh sản phẩm",
    cell: ({ row }) => {
      // console.log(row);
      return (
        <img
          src={row.original.image}
          alt="product"
          className="size-14 object-cover rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên người dùng",
    cell: ({ row }) => {
      // console.log(row);
      return <p>Hoàng Minh</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Nội dung",
    cell: ({ row }) => {
      // console.log(row);
      return <p>Tuyet voi</p>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
