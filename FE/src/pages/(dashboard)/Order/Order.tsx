import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useOrder from "@/common/hooks/order/UseOrder";
import { Link } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export type Order = {
  id: string;
  orderCode: string;
  amount: number;
  payment: string;
  status: string;
  createdAt: string;
};

interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
}

const apiUrl = import.meta.env.VITE_API_URL;

const AdminOrder = () => {
  const userId = "67370b2bba67ac60aea58be8";
  const queryClient = useQueryClient(); // Đặt useQueryClient ở trên đầu

  const { data, isLoading, isError } = useOrder(userId);

  const orders: Order[] = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((order: any) => ({
      id: order._id,
      orderCode: order.orderCode || "N/A",
      amount: order.totalPrice || 0,
      payment: order.payment || "N/A",
      status: order.status || "unknown",
      createdAt: order.createdAt || "",
    }));
  }, [data]);
// Hàm cập nhật trạng thái được truyền queryClient từ component
const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await axios.put(`${apiUrl}/update-order/${orderId}`, {
      newStatus,
    });

    if (response.status === 200) {
      // Invalidating the cache for "ADDRESS_" query when the status is updated
      queryClient.invalidateQueries(["ORDER_HISTORY", userId]);
      toast({
        title: "Thành công!",
        description: "Cập nhật trạng thái thành công!",
        variant: "default",
      });
    }
  } catch (error) {
    console.error(error);
    const err = error as ErrorResponse;
    if (err.response && err.response.data) {
      toast({
        title: "Lỗi",
        description:
          err.response.data.message || "Cập nhật trạng thái thất bại!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Lỗi kết nối",
        description: "Lỗi kết nối server!",
        variant: "destructive",
      });
    }
  }
};

  const columns: ColumnDef<Order>[] = React.useMemo(
    () => [
      {
        header: "Mã đơn hàng",
        accessorKey: "orderCode",
      },
      {
        header: "Số tiền",
        accessorKey: "amount",
      },
      {
        header: "Phương thức thanh toán",
        accessorKey: "payment",
      },
      {
        header: "Trạng thái",
        accessorKey: "status",
      },
      {
        header: "Ngày tạo",
        accessorKey: "createdAt",
      },
      {
        header: "Thao tác",
        accessorKey: "id",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {/* Nút xem chi tiết */}
            <Link to={`/admin/orders/orderdetails/${row.original.id}`}>
              <Button variant="secondary" size="sm">
                Xem chi tiết
              </Button>
            </Link>

            {/* Dropdown để thay đổi trạng thái */}
            <div className="*:m-0">
              <Select
                value={row.original.status}
                onValueChange={async (newStatus) => {
                  if (newStatus !== row.original.status) {
                    await updateOrderStatus(row.original.id, newStatus);
                    row.original.status = newStatus; // Cập nhật trạng thái mới cho dòng
                  }
                }}
                disabled={
                  row.original.status === "đã hoàn thành" ||
                  row.original.status === "đã hủy"
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["đang chờ", "đang xử lý", "đã hoàn thành", "đã hủy"].map(
                      (status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center text-gray-500">
        <div className="spinner"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Có lỗi xảy ra khi tải dữ liệu!
      </div>
    );
  }

  
  return (
    <div className="w-full p-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-selected={row.getIsSelected()}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrder;
