import { useUserContext } from "@/common/context/UserProvider";
import useOrder from "@/common/hooks/order/UseOrder";
import { useState } from "react";
import StatusMenu from "./StatusMenu";

const formatCurrencyVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const OrderHistory = () => {
  const { _id } = useUserContext() ?? {}; // Lấy _id từ UserContext
  const { data, isLoading, isError } = useOrder(_id); // Destructure loading and error status
  const [selectedStatus, setSelectedStatus] = useState<string>("đang chờ");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center text-gray-500">
        <div className="spinner"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" min-h-[50vh] flex justify-center items-center text-red-500">
        Có lỗi xảy ra khi tải đơn hàng. Vui lòng thử lại sau.
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="text-center text-red-500">
        Dữ liệu đơn hàng không hợp lệ.
      </div>
    );
  }

  // Lọc đơn hàng theo trạng thái và mã đơn hàng
  const filteredOrders = data
    .filter((order) => order.status === selectedStatus)
    .filter((order) => order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container p-6">
      {/* Status Menu */}
      <StatusMenu selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      
      {/* Tìm kiếm mã đơn hàng */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm mã đơn hàng..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Danh sách đơn hàng */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">
                    Mã đơn hàng: {order.orderCode}
                  </div>
                  <div className="text-sm">
                    Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-green-500 font-semibold text-lg">
                  <span className="text-black">Trạng thái:</span> ( {order.status} )
                </div>
              </div>

              {/* Hiển thị sản phẩm trong đơn hàng */}
              <div className="mt-2">
                {order.products && order.products.length > 0 ? (
                  order.products.map((itemProducts) =>
                    itemProducts.products.map((item) => (
                      <div key={item._id}>
                        <div className="flex justify-between items-center">
                          {/* sản phẩm */}
                          <div className="flex items-center space-x-4 space-y-4">
                            <img
                              src={item.productItem?.image || "/default-image.jpg"}
                              alt={item.productItem?.name || "Sản phẩm không có tên"}
                              className="w-16 h-16 object-cover"
                            />
                            <div>
                              <div className="font-medium">
                                {item.productItem?.name || "Sản phẩm không có tên"}
                              </div>
                              <div className="text-sm">Số lượng: {item.quantity}</div>
                              <div className="text-sm">
                                {item.variantItem.values.map((value: any, index: number) => (
                                  <div key={value._id}>
                                    {value.type}: {value.name}
                                    {index < item.variantItem.values.length - 1 ? "," : ""}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="text-[#81cd06]">
                              Giá : {formatCurrencyVND(item.variantItem?.price ?? 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="text-center text-gray-500">Không có sản phẩm trong đơn hàng này.</div>
                )}
              </div>

              <div className="mt-4 font-semibold text-lg text-right">
                Tổng tiền: {formatCurrencyVND(order.totalPrice)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            Không có đơn hàng nào với trạng thái "{selectedStatus}" {searchQuery && ` và mã đơn hàng "${searchQuery}`}.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
