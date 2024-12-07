import { Category } from "@/common/types/Product";

import { ColumnDef } from "@tanstack/react-table";
import ActionCell from "./ActionCell";

export const columnCategories: ColumnDef<Category>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <span className="text-sm text-gray-500">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
