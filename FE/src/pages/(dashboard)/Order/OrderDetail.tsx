import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import html2pdf from "html2pdf.js"; // Import html2pdf.js
import useOrder from "@/common/hooks/order/UseOrder";

const OrderDetail = () => {
  const { id } = useParams();
  const { data } = useOrder(undefined, id);

  // State để theo dõi việc xuất PDF
  const [isExported, setIsExported] = useState(false);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  };

  if (!data)
    return (
      <div className="min-h-[50vh] flex justify-center items-center text-gray-500">
        <div className="spinner"></div>
      </div>
    );

  const {
    addressId,
    note,
    products,
    payment,
    status,
    statusHistory,
    totalPrice,
    orderCode,
    createdAt,
    cancellationReason,
  } = data;

  // Hàm xử lý xuất PDF
  const handleExportPDF = () => {
    setIsExported(true); // Cập nhật state khi đã xuất PDF
    const element = document.getElementById("order-detail"); // Lấy phần tử cần xuất ra PDF

    if (element) {
      const options = {
        margin: 10,
        filename: `order_${orderCode}.pdf`, // Tên file PDF
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true, // Cho phép tải ảnh từ nguồn ngoài
          logging: true, // Hiển thị log để kiểm tra việc tải ảnh
          allowTaint: true, // Cho phép vẽ ảnh từ các nguồn không phải cùng domain
          letterRendering: true, // Hiển thị các ký tự chính xác hơn
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf(element, options).then(() => {
        // Sau khi xuất PDF xong, cập nhật lại trạng thái
        setIsExported(false); // Đặt lại thành false khi xuất PDF xong
      }); // Sử dụng html2pdf.js để xuất PDF
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <button
        onClick={handleExportPDF}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Xuất PDF
      </button>

      <div id="order-detail">
        {" "}
        {/* Phần tử bao bọc nội dung cần xuất */}
        <h2 className="text-2xl font-bold mb-6">Chi tiết đơn hàng</h2>
        {/* Thông tin tổng quan */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Mã đơn hàng:</strong> {orderCode}
            </p>
            <p>
              <strong>Ngày đặt hàng:</strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span className={`px-2 py-1 rounded ${statusColor(status)}`}>
                {status}
              </span>
            </p>
            {cancellationReason ? (
              <p>
                <strong>Lý do hủy hàng:</strong> {cancellationReason}
              </p>
            ) : null}

            <p>
              <strong>Hình thức thanh toán:</strong> {payment}
            </p>
            <p>
              <strong>Tổng giá trị:</strong>{" "}
              <span className="px-2 py-1 rounded  font-semibold">
                {totalPrice.toLocaleString()} VND
              </span>
            </p>
            <p>
              <strong>Ghi chú:</strong> {note || "Không có ghi chú"}
            </p>
          </div>
        </div>
        {/* Thông tin giao hàng */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>
          <p>
            <strong>Người nhận:</strong> {addressId.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {addressId.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {`${addressId.addressDetail}, ${addressId.wardId}, ${addressId.districtId}, ${addressId.cityId}, ${addressId.country}`}
          </p>
        </div>
        {/* Lịch sử trạng thái */}
        {isExported == false && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Lịch sử trạng thái</h3>
            <Table className="w-full border border-gray-200">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="py-3 px-4">Trạng thái</TableHead>
                  <TableHead className="py-3 px-4">Thời gian</TableHead>
                  <TableHead className="py-3 px-4">Người cập nhật</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusHistory?.map((history: any, index: number) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="py-3 px-4">
                      {history.status}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {formatDate(history.timestamp)}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {history.updatedBy}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {/* Danh sách sản phẩm */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h3>
          <Table className="w-full border border-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="py-3 px-4">Hình ảnh</TableHead>
                <TableHead className="py-3 px-4">Sản phẩm</TableHead>
                <TableHead className="py-3 px-4">Biến thể</TableHead>
                <TableHead className="py-3 px-4 text-center">
                  Số lượng
                </TableHead>
                <TableHead className="py-3 px-4 text-right">Đơn giá</TableHead>
                <TableHead className="py-3 px-4 text-right">
                  Thành tiền
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((item: any) => (
                <TableRow key={item._id} className="hover:bg-gray-50">
                  <TableCell className="py-3 px-4">
                    <img
                      src={item.productItem.image}
                      alt={item.productItem.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </TableCell>
                  <TableCell className="py-3 px-4 font-medium">
                    {item.productItem.name}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-600">
                    {item.variantItem.values.map((v: any) => v.name).join(", ")}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right text-green-500 font-semibold">
                    {item.variantItem.price.toLocaleString()} VND
                  </TableCell>
                  <TableCell className="py-3  px-4 text-right font-semibold">
                    {(item.variantItem.price * item.quantity).toLocaleString()}{" "}
                    VND
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

// Hàm xác định màu cho trạng thái
const statusColor = (status: string) => {
  switch (status) {
    case "chờ xác nhận":
      return "bg-yellow-100 text-yellow-800";
    case "chờ lấy hàng":
      return "font-bold text-blue-800";
    case "chờ giao hàng":
      return "font-bold text-green-800";
    case "đã hoàn thành":
      return "text-[#26aa99] font-bold";
    case "đã hủy":
      return "text-[red] font-bold";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default OrderDetail;
