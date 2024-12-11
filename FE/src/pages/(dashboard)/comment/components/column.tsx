import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";
// import ActionCell from "./ActionCell";

interface IComment {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  productId: {
    _id: string;
    name: string;
    image: string;
  };
  infoProductBuy: string;
  content: string;
  rating: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const column: ColumnDef<IComment>[] = [
  {
    header: "STT",
    cell: ({ row }) => {
      return <span className="text-sm text-gray-500">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "image",
    header: "Ảnh sản phẩm",
    cell: ({ row }) => {
      console.log(row);
      return (
        <>
          {row.original.productId ? (
            <img
              src={row.original.productId.image}
              alt="product"
              className="size-14 object-cover rounded-full"
            />
          ) : (
            <img alt="sản phẩm" className="size-14 object-cover rounded-full" />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên người dùng",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.userId.firstName} {row.original.userId.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Nội dung",
    cell: ({ row }) => {
      // console.log(row);
      return <p>{row.original.content}</p>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
