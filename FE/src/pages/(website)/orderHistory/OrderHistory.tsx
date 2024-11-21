import { useUserContext } from "@/common/context/UserProvider";
import useOrder from "@/common/hooks/order/UseOrder";
import { useState } from "react";

const OrderHistory = () => {
  const { _id } = useUserContext() ?? {}; // Lấy _id từ UserContext
  const { data, isLoading, isError } = useOrder(_id); // Destructure loading and error status
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Lọc danh sách đơn hàng theo trạng thái
  const filteredOrders = selectedStatus === "all" 
    ? data 
    : data?.filter(order => order.status === selectedStatus);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">
        Đang tải đơn hàng...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Có lỗi xảy ra khi tải đơn hàng. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Thanh trạng thái */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setSelectedStatus("all")}
          className={`py-2 px-4 rounded-lg ${selectedStatus === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setSelectedStatus("pending")}
          className={`py-2 px-4 rounded-lg ${selectedStatus === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Chờ xác nhận
        </button>
        <button
          onClick={() => setSelectedStatus("waiting_pickup")}
          className={`py-2 px-4 rounded-lg ${selectedStatus === "waiting_pickup" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Chờ lấy hàng
        </button>
        <button
          onClick={() => setSelectedStatus("completed")}
          className={`py-2 px-4 rounded-lg ${selectedStatus === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Đã hoàn thành
        </button>
        <button
          onClick={() => setSelectedStatus("canceled")}
          className={`py-2 px-4 rounded-lg ${selectedStatus === "canceled" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Đã hủy
        </button>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="space-y-4">
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg shadow-md">
              <div className="font-semibold text-lg">
                Mã đơn hàng: {order.orderCode}
              </div>
              <div className="text-sm">
                Trạng thái:
                <span
                  className={`text-${order.status === "completed" ? "green" : order.status === "canceled" ? "red" : "yellow"}-500`}
                >
                  {order.status === "pending" && "Chờ xác nhận"}
                  {order.status === "waiting_pickup" && "Chờ lấy hàng"}
                  {order.status === "completed" && "Đã hoàn thành"}
                  {order.status === "canceled" && "Đã hủy"}
                </span>
              </div>
              <div className="text-sm">
                Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="mt-2">
                {order.products?.map((product) => (
                  <div key={product._id} className="flex items-center space-x-4">
                    {/* In ra thông tin sản phẩm */}
                    <img
                      src={product.productItem?.image || "path/to/default-image.jpg"}
                      alt={product.productItem?.name || "Tên sản phẩm không có"}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        {product.productItem?.name || "Tên sản phẩm không có"}
                      </div>
                      <div className="text-sm">
                        Số lượng: {product.quantity}
                      </div>
                      <div className="text-sm">
                        Giá: {product.variantItem?.price || "Chưa có giá"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            Không có đơn hàng trong trạng thái này
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
