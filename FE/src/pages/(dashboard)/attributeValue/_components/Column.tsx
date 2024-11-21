import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface IAttributeValues {
  _id: string;
  name: string;
  values: string;
  type: string;
}

export const columnAttributeValues: ColumnDef<IAttributeValues>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      return <span>{row.original._id}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
  },

  {
    accessorKey: "value",
    header: "Giá trị",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              {/* <Link to={`/dashboard/attributesValues/${row.original.name}`}> */}
              Xem thêm
              {/* </Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
