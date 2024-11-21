import { getAllOrders, getOrderById } from "@/pages/(website)/services/OrderHistory/Order";
import { useQuery } from "@tanstack/react-query";

// Hàm UseCountry nhận cả userId và addressId
const useOrder = (userId?: string , orderId?: string) => {
  // Sử dụng React Query để lấy dữ liệu
  const { data, ...rest } = useQuery({
    queryKey: ["ORDER_HISTORY", userId, orderId, status], // Cập nhật key để gồm cả userId và addressId
    queryFn: async () => {
      if (userId) {
        return await getAllOrders(userId);  // Nếu có userId, lấy dữ liệu theo userId
      } else if (orderId) {
        return await getOrderById(orderId);  // Nếu không có userId, lấy dữ liệu theo addressId
      }
      throw new Error("Cả userId và addressId đều không hợp lệ.");  // Xử lý trường hợp không có tham số hợp lệ
    },
  });

  return { data, ...rest };
};

export default useOrder;
