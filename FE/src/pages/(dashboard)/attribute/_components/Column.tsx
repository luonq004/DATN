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
  value: string;
  type: string;
}

interface IAttribute {
  _id: string;
  name: string;
  values: IAttributeValues[];
}

export const columnAttribute: ColumnDef<IAttribute>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên",
  },

  {
    accessorKey: "values",
    header: "Giá trị",
    cell: ({ row }) => {
      const attribute = row.original;

      return (
        <div className="flex space-x-2">
          {Array.isArray(attribute.values) && attribute.values.length > 0 ? (
            attribute.values.map((value, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded"
                title={value.name}
              >
                {value.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Không có giá trị</span>
          )}
        </div>
      );
    },
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
              <Link to={`/dashboard/attributesValues/${row.original._id}`}>
                Xem thêm
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
