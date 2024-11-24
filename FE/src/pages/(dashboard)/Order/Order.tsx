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
import { OrderProduct } from "@/common/types/Product";

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
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useOrder();
  const [search, setSearch] = React.useState<string>("");

  const orders: Order[] = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((order: OrderProduct) => ({
      id: order._id,
      orderCode: order.orderCode || "N/A",
      amount: order.totalPrice || 0,
      payment: order.payment || "N/A",
      status: order.status || "unknown",
      createdAt: order.createdAt || "",
    }));
  }, [data]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await axios.put(`${apiUrl}/update-order/${orderId}`, {
        newStatus,
      });

      if (response.status === 200) {
        queryClient.invalidateQueries(["ORDER_HISTORY"]);
        toast({
          title: "Thành công!",
          description: "Cập nhật trạng thái thành công!",
          variant: "default",
        });
      }
    } catch (error) {
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
            <Link to={`/admin/orders/orderdetails/${row.original.id}`}>
              <Button variant="secondary" size="sm">
                Xem chi tiết
              </Button>
            </Link>

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
                    {["chờ xác nhận", "chờ lấy hàng", "chờ giao hàng", "đã hoàn thành", "đã hủy"].map(
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

  const filteredOrders = React.useMemo(() => {
    return orders.filter(order =>
      order.orderCode.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const [paginationState, setPaginationState] = React.useState({
    pageIndex: 0,  // Trang đầu tiên
    pageSize: 10,   // Số hàng mỗi trang
  });

  const table = useReactTable({
    data: filteredOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: paginationState,
    },
    onPaginationChange: setPaginationState, // Cập nhật trạng thái phân trang khi chuyển trang
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
      <div className="mb-4 w-[15%]">
        <input
          type="text"
          className="border w-full border-gray-300 p-2 rounded"
          placeholder="Tìm kiếm theo mã đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>
            {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
