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
import useAllOrders from "@/common/hooks/order/useAllOrders";
import { useUser } from "@clerk/clerk-react";
import { formatCurrency } from "@/lib/utils";

export type Order = {
  id: string;
  orderCode: string;
  amount: number;
  isPaid: boolean;  
  payment: string;
  email?:string
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
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};


const AdminOrder = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useAllOrders();
  const [search, setSearch] = React.useState<string>("");
  const { user: dataUser } = useUser();
  const Gmail = dataUser?.primaryEmailAddress?.emailAddress;
  const [isOpen, setIsOpen] = React.useState(false); // Điều khiển hiển thị của modal
  const [reason, setReason] = React.useState(""); // Lý do hủy đơn hàng
  const [orderIdToCancel, setOrderIdToCancel] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string>(""); 
  // Mở modal
  
  const openModal = () => setIsOpen(true);

  // Đóng modal
  const closeModal = () => setIsOpen(false);
  // Xử lý hủy đơn hàng
  const handleCancelOrder = async() => {
    if(!orderIdToCancel){
      alert("Không lấy được OrderId");
      return;
    }
    const newStatus = "đã hủy"
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do hủy.");
      return;
    }
    // Gửi lý do hủy đơn hàng ở đây
    await updateOrderStatus(
      orderIdToCancel,
      newStatus,reason
    );
    setReason("");
    setIsOpen(false); // Đóng modal sau khi hủy
  };
  const orders: Order[] = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data
      .map((order: OrderProduct) => ({
        id: order._id,
        orderCode: order.orderCode || "N/A",
        amount: order.totalPrice || 0,
        payment: order.payment || "N/A",
        status: order.status || "unknown",
        createdAt: order.createdAt || "",
        email: order.email || "",
        isPaid: order.isPaid,
      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [data]);
  const user = Gmail;
  const updateOrderStatus = async (orderId: string, newStatus: string, reason:string) => {
    try {
      const response = await axios.put(`${apiUrl}/update-order/${orderId}`, {
        newStatus,
        user,
        reason
      });

      if (response.status === 200) {
        queryClient.invalidateQueries(["ORDER_HISTORY"]);
        toast({
          title: "Thành công!",
          description: "Cập nhật trạng thái thành công!",
          variant: "default",
        });
        return true;
      }
      return false;
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
  // hủy
  const cancelOrder = async (orderId: string) => {
    const newStatus = "đã hủy";
    try {
      const reason = "quá thời gian thanh toán!";
      const response = await axios.put(`${apiUrl}/update-order/${orderId}`, {
        newStatus,
        reason
      }); // Đường dẫn API hủy đơn hàng
      if (response.status === 200) {
        queryClient.invalidateQueries(["ORDER_HISTORY", orderId]);
        toast({
          title: "Thành công",
          description: "Đơn hàng đã được hủy thành công.",
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

  // Kiểm tra nếu đơn hàng cần hủy sau 5 phút từ thời điểm tạo đơn hàng
  React.useEffect(() => {
    // Lưu trữ các ID của timeout để clear sau
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Lặp qua các đơn hàng để kiểm tra
    orders.forEach((order) => {
      // Chỉ xử lý các đơn hàng có trạng thái "chờ xác nhận" và payment là "Vnpay"
      if (order.isPaid === false && order.payment === "Vnpay") {
        // sendOrderErrorConfirmationEmail("hai31569@gmail.com",order.orderCode)
        const createdAt = new Date(order.createdAt);
        const currentTime = new Date();
        const timeElapsed = currentTime.getTime() - createdAt.getTime();

        // Kiểm tra nếu đơn hàng đã được tạo hơn 5 phút
        if (timeElapsed >= 300000) {
          // Nếu quá 5 phút, hủy đơn hàng ngay lập tức
          cancelOrder(order.id);
        } else {
          // Nếu chưa đến 5 phút, cài đặt hủy sau khoảng thời gian còn lại
          const remainingTime = 300000 - timeElapsed;

          // Cài đặt một timeout để hủy đơn hàng sau khoảng thời gian còn lại
          const timerId = setTimeout(() => {
            // Kiểm tra lại trạng thái của đơn hàng trước khi hủy
            if (order.isPaid === false) {
              cancelOrder(order.id);
            }
          }, remainingTime);

          // Lưu timerId để có thể clear sau nếu trạng thái thay đổi
          timers.push(timerId);
        }
      }
    });

    // Cleanup function để hủy các timeout cũ khi component unmount hoặc orders thay đổi
    return () => {
      // Hủy tất cả các timeout nếu component bị unmount hoặc orders thay đổi
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, [orders]);

  const columns: ColumnDef<Order>[] = React.useMemo(
    () => [
      {
        header: "Mã đơn hàng",
        accessorKey: "orderCode",
      },
      {
        header: "Số tiền",
        accessorKey: "amount",
        cell: ({ row }) => {
          const amount = formatCurrency(row.original.amount);
          return <span>{amount} VNĐ</span>;
        },
      },
      {
        header: "Phương thức thanh toán",
        accessorKey: "payment",
        cell: ({ row }) => (
          <span className={getPaymentClassName(row.original.payment)}>
            {row.original.payment}
          </span>
        ),
      
      },
      {
        header: "Trạng thái",
        accessorKey: "status",
        cell: ({ row }) => (
          <span className={getStatusClassName(row.original.status)}>
            {row.original.status}
          </span>
        ),
      },
      {
        header: "Khách hàng",
        accessorKey: "email",
        cell: ({ row }) => (
          <span className={row.original.email}>
            {row.original.email}
          </span>
        ),
      },
      {
        header: "Trạng thái thanh toán",
        accessorKey: "isPaid", 
        cell: ({ row }) => (
          <span className={row.original.isPaid ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
            {row.original.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </span>
        ),
      },
      {
        header: "Ngày tạo",
        accessorKey: "createdAt",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        header: "Thao tác",
        accessorKey: "id",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Link to={`/admin/orders/orderdetails/${row.original.id}`}>
              <Button variant="default"  size="sm">
                Xem chi tiết
              </Button>
            </Link>

            <div className="*:m-0">
              <Select
                value={row.original.status}
                onValueChange={async (newStatus) => {
                  if(newStatus === 'đã hủy'){
                    setOrderIdToCancel(row.original.id);
                    openModal();
                    return;
                  }
                  if (newStatus !== row.original.status) {
                    const isUpdated = await updateOrderStatus(
                      row.original.id,
                      newStatus
                    );
                    if (isUpdated) {
                      row.original.status = newStatus; // Cập nhật trạng thái mới cho dòng
                    }
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
                    {[
                      "chờ xác nhận",
                      "đã xác nhận",
                      "đang giao hàng",
                      "đã hoàn thành",
                      "đã hủy",
                    ].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
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

   // Lọc kết quả dựa trên Search và Status
   const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderCode.toLowerCase().includes(search.toLowerCase()) ||
        (order?.email && order.email.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus =
        selectedStatus === "" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, selectedStatus]);
  

  const [paginationState, setPaginationState] = React.useState({
    pageIndex: 0, // Trang đầu tiên
    pageSize: 8, // Số hàng mỗi trang
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
    <div className="w-full p-4 bg-white rounded-sm">
      <div className="mb-4 w-[18%]">
        <input
          type="text"
          className="border w-full border-gray-300 p-2 rounded"
          placeholder="Tìm kiếm theo khách hàng,mã đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Lọc trạng thái */}
        <Select value={selectedStatus} onValueChange={(value) => {
  // Nếu giá trị là 'all', chuyển thành ''
  setSelectedStatus(value === "all" ? "" : value);
}}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="chờ xác nhận">Chờ xác nhận</SelectItem>
            <SelectItem value="đã xác nhận">đã xác nhận</SelectItem>
            <SelectItem value="đang giao hàng">đang giao hàng</SelectItem>
            <SelectItem value="đã hoàn thành">Đã hoàn thành</SelectItem>
            <SelectItem value="đã hủy">Đã hủy</SelectItem>
          </SelectContent>
        </Select>
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
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
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
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-4">Xác Nhận Hủy Đơn Hàng</h2>
            <p className="text-gray-700 mb-4">Bạn có chắc chắn muốn hủy đơn hàng không?</p>
            
            {/* Ô nhập lý do hủy */}
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do hủy..."
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xác Nhận Hủy
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const getStatusClassName = (status: string) => {
  switch (status) {
    case "chờ xác nhận":
      return "px-2 py-1 text-xs font-semibold rounded-full capitalize bg-yellow-100 text-yellow-800";
    case "đã xác nhận":
      return "px-2 py-1 text-xs font-semibold rounded-full capitalize bg-blue-100 text-blue-800";
    case "đang giao hàng":
      return "px-2 py-1 text-xs font-semibold rounded-full capitalize bg-green-100 text-green-800";
    case "đã hoàn thành":
      return "px-2 py-1 text-xs font-semibold rounded-full capitalize bg-gray-100 text-gray-800";
    case "đã hủy":
      return "px-2 py-1 text-xs font-semibold rounded-full capitalize bg-red-100 text-red-800";
    default:
      return "";
  }
};
const getPaymentClassName = (payment: string) => {
  switch (payment.toLowerCase()) {
    case "vnpay":
      return "text-blue-700 font-bold"; // Màu xanh đậm, chữ đậm
    case "cod":
      return "text-orange-600 font-bold"; // Màu xanh lá đậm, chữ đậm
    default:
      return "text-gray-600 font-semibold"; // Màu xám trung bình, chữ vừa
  }
};



export default AdminOrder;
