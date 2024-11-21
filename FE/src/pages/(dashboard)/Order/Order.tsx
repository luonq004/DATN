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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export type Order = {
  id: string;
  orderCode: string;
  amount: number;
  payment: string;
  status: string;
  createdAt: string;
};

// Hàm gửi API cập nhật trạng thái
const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error("Failed to update status");
    // toast.success("Cập nhật trạng thái thành công!");
  } catch (error) {
    console.error(error);
    // toast.error("Cập nhật trạng thái thất bại!");
  }
};

// Định nghĩa các cột
const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderCode",
    header: "Mã đơn hàng",
    cell: ({ row }) => <div>{row.getValue("orderCode")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Tổng tiền",
    cell: ({ row }) => (
      <div className="">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.getValue("amount"))}
      </div>
    ),
  },
  {
    accessorKey: "payment",
    header: "Phương thức thanh toán",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("payment")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày mua",
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Chức năng",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Link to={`/admin/orders/orderdetails/${row.original.id}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewDetails(row.original.id)}
          >
            Xem chi tiết
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="primary" size="sm">
              Cập nhật trạng thái
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Đang chờ", "Đang xử lý", "Đã hoàn thành", "Đã hủy"].map(
              (status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => updateOrderStatus(row.original.id, status)}
                  className="cursor-pointer"
                >
                  {status}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const handleViewDetails = (orderId: string) => {
  console.log("Xem chi tiết đơn hàng:", orderId);
  // Thêm logic hiển thị chi tiết đơn hàng
};

const AdminOrder = () => {
  const userId = "67370b2bba67ac60aea58be8";
  // const { _id } = useUserContext() ?? {};
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
