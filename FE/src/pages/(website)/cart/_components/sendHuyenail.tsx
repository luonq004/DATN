import axios from "axios";

const sendOrderHuyConfirmationEmail = async (to: string, orderCode: string) => {
  try {
    // Gọi API để lấy thông tin đơn hàng dựa vào orderCode
    const response = await axios.get(
      `http://localhost:8080/api/get-ordersCode/${orderCode}`
    );
    const order = response.data; // Thông tin đơn hàng từ API

    // Kiểm tra xem thông tin đơn hàng có hợp lệ không
    if (!order) {
      console.error("Không tìm thấy đơn hàng.");
      throw new Error("Không tìm thấy đơn hàng.");
    }

    // Trích xuất danh sách sản phẩm
    const products = order?.products?.flatMap((orderProduct) =>
      orderProduct.products.map((item) => ({
        name: item.productItem.name,
        image: item.productItem.image, // Thêm URL ảnh
        // variant: item.variantItem.name,
        price: item.variantItem.price,
        quantity: item.quantity,
        total: item.quantity * item.variantItem.price,
      }))
    );

    // Nội dung email với bảng
    const emailContent = `
      <h1>Đơn hàng đã hủy!</h1>
      <p>Mã đơn hàng: <strong>${order.orderCode}</strong></p>
      <p>Trạng thái đơn hàng: <strong>${order.status}</strong></p>
      <p>Danh sách sản phẩm:</p>
      <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th>Giá tiền (VNĐ)</th>
            <th>Tổng tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          ${products
            ?.map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td><img src="${product.image}" alt="${
                product.name
              }" style="width: 100px; height: auto;" /></td>
              <td>${product.quantity}</td>
              <td>${product.price.toLocaleString()}</td>
              <td>${product.total.toLocaleString()}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p>Tổng cộng: <strong>${order.totalPrice.toLocaleString()} VNĐ</strong></p>
    `;

    // Gửi email
    await axios.post("http://localhost:8080/api/send-email", {
      to,
      subject: `mã đơn hàng ${order.orderCode}`,
      htmlContent: emailContent,
    });

    console.log("Email đã được gửi thành công.");
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    throw new Error("Lỗi khi gửi email.");
  }
};

export default sendOrderHuyConfirmationEmail;
