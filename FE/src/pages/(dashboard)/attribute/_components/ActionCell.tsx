import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteAttribute } from "../actions/useDeleteAttribute";

interface ActionCellProps {
  id: string;
}

const ActionCell: React.FC<ActionCellProps> = ({ id }) => {
  const { deleteAttribute, isDeleting } = useDeleteAttribute();

  const handleDelete = async () => {
    if (confirm("Bạn có chắc muốn xóa thuộc tính này?")) {
      try {
        await deleteAttribute(id);
      } catch (error) {
        console.error("Lỗi khi xóa thuộc tính:", error);
        alert("Xóa thất bại, vui lòng thử lại.");
      }
    }
  };

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
          <Link to={`/admin/attributesValues/${id}`}>Xem thêm</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/admin/attributes/edit/${id}`}>Sửa</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          {isDeleting ? "Đang xóa..." : "Xóa"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
