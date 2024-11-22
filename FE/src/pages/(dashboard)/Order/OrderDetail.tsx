import useOrder from "@/common/hooks/order/UseOrder";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OrderDetail = () => {
  const { id } = useParams();
  const { data } = useOrder(undefined, id);

  if (!data) return <div className="min-h-[50vh] flex justify-center items-center text-gray-500">
  <div className="spinner"></div>
</div>;

  const { addressId, note, products, payment, status, totalPrice, orderCode, createdAt } = data;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Chi tiết đơn hàng</h2>

      {/* Thông tin tổng quan */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Mã đơn hàng:</strong> {orderCode}</p>
          <p><strong>Ngày đặt hàng:</strong> {new Date(createdAt).toLocaleDateString()}</p>
          <p><strong>Trạng thái:</strong> <span className={`px-2 py-1 rounded ${statusColor(status)}`}>{status}</span></p>
          <p><strong>Hình thức thanh toán:</strong> {payment}</p>
          <p><strong>Tổng giá trị:</strong> <span className="px-2 py-1 rounded  font-semibold bg-[#cfd716]">{totalPrice.toLocaleString()} VND</span></p>
          <p><strong>Ghi chú:</strong> {note || "Không có ghi chú"}</p>
        </div>
      </div>

      {/* Thông tin giao hàng */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>
        <p><strong>Người nhận:</strong> {addressId.name}</p>
        <p><strong>Số điện thoại:</strong> {addressId.phone}</p>
        <p><strong>Địa chỉ:</strong> {`${addressId.addressDetail}, ${addressId.wardId}, ${addressId.districtId}, ${addressId.cityId}, ${addressId.country}`}</p>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h3>
        <Table className="w-full border border-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="py-3 px-4">Hình ảnh</TableHead>
              <TableHead className="py-3 px-4">Sản phẩm</TableHead>
              <TableHead className="py-3 px-4">Biến thể</TableHead>
              <TableHead className="py-3 px-4 text-center">Số lượng</TableHead>
              <TableHead className="py-3 px-4 text-right">Đơn giá</TableHead>
              <TableHead className="py-3 px-4 text-right">Thành tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((order: any) =>
              order.products.map((item: any) => (
                <TableRow key={item._id} className="hover:bg-gray-50">
                  <TableCell className="py-3 px-4">
                    <img
                      src={item.productItem.image}
                      alt={item.productItem.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </TableCell>
                  <TableCell className="py-3 px-4 font-medium">{item.productItem.name}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">
                    {item.variantItem.values.map((v: any) => v.name).join(", ")}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">{item.quantity}</TableCell>
                  <TableCell className="py-3 px-4 text-right text-green-500 font-semibold">
                    {item.variantItem.price.toLocaleString()} VND
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right font-semibold">
                    {(item.variantItem.price * item.quantity).toLocaleString()} VND
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Hàm xác định màu cho trạng thái
const statusColor = (status: string) => {
  switch (status) {
    case "đang chờ":
      return "bg-yellow-100 text-yellow-800";
    case "đang xử lý":
      return "bg-blue-100 text-blue-800";
    case "đã hoàn thành":
      return "bg-green-100 text-green-800";
    case "đã hủy":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default OrderDetail;
