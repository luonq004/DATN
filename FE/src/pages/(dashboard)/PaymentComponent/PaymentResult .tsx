import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button"; // Shadcn UI button component
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/common/context/UserProvider";
import { useUser } from "@clerk/clerk-react";
import sendOrderConfirmationEmail from "@/pages/(website)/cart/_components/sendEmail";
import useCart from "@/common/hooks/useCart";
import { Cart } from "@/common/types/formCheckOut";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
// import sendOrderHuyConfirmationEmail from "@/pages/(website)/cart/_components/sendHuyenail";
type PaymentResult = {
  code: string;
};
const apiUrl = import.meta.env.VITE_API_URL;

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient(); // Đặt useQueryClient ở trên đầu
  const [result, setResult] = useState<PaymentResult | null>(null);
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderCart, setOrderCart] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const Gmail = user?.primaryEmailAddress?.emailAddress;
  const { _id } = useUserContext() ?? {}; // Lấy _id từ UserContext
  const { cart: carts } = useCart(_id ?? "");
  // Lấy mã đơn hàng từ URL

  const orderId = searchParams.get("vnp_TxnRef");
  const notificationSentRef = useRef(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<PaymentResult>(
          "http://localhost:8080/api/vnpay_return",
          {
            params: Object.fromEntries(searchParams),
          }
        );

        setResult(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message: string }>;
          setError(
            axiosError.response?.data?.message ||
              "Có lỗi xảy ra khi xử lý kết quả giao dịch."
          );
        } else {
          setError("Có lỗi xảy ra khi xử lý kết quả giao dịch.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [searchParams]);

  //   tra cứu đơn hàng
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const orderResponse = await axios.get(
            `${apiUrl}/get-ordersCode/${orderId}`
          );
          setOrderDetails(orderResponse.data);
          // Lưu thông tin đơn hàng vào state hoặc thực hiện hành động cần thiết
        }
      } catch (err) {
        console.error("Lỗi khi tra cứu đơn hàng:", err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const selectedProducts =
      carts?.products?.filter((product: Cart) => product.selected) || [];
    setOrderCart(selectedProducts);
  }, [carts]);

  console.log("orderCart", orderCart);
  useEffect(() => {
    const cancelOrder = async () => {
      const clearCart = async () => {
        try {
          // Gọi API để xóa giỏ hàng
          if (result?.code === "00" && !notificationSentRef.current) {
            await axios.post(`${apiUrl}/delete-cart`, {
              products: orderCart, // Các sản phẩm trong giỏ hàng
              userId: _id, // ID người dùng
            });

            // Lấy ảnh của sản phẩm đầu tiên trong danh sách sản phẩm đã chọn
            const firstProductImage = orderCart?.[0]?.productItem?.image;
            const orderCode = orderDetails?.orderCode;

            // Gửi sự kiện 'orderPlaced' đến server khi đơn hàng được tạo thành công
            socket.emit("orderPlaced", {
              orderCode,
              userId: _id,
              status: "success",
              message: "Đặt hàng thành công!",
              productImage: firstProductImage,
            });

            // Đánh dấu là đã gửi thông báo
            notificationSentRef.current = true;

            console.log("Cart đã được xóa hoàn toàn.");
          }
        } catch (error) {
          console.error("Lỗi khi xóa giỏ hàng:", error);
        }
      };
      if (orderCart.length > 0 && !notificationSentRef.current && orderCart.length > 0) {
        // Khi orderCart có dữ liệu, thực hiện xử lý hoặc API
        clearCart();
        // Đánh dấu là đã gửi thông báo
            notificationSentRef.current = true;
      }
      // Chạy lại khi orderCart thay đổi

      try {
        if (result?.code === "00") {
          await clearCart();
          const response = await axios.put(
            `${apiUrl}/update-status/${orderDetails._id}`,
            {
              isPaid: true,
            }
          );
          if (Gmail) {
            await sendOrderConfirmationEmail(Gmail, orderId);
          }
          if (response.status === 200) {
            queryClient.invalidateQueries(["ORDER_HISTORY", _id]);
            clearCart();
            // Hiển thị thông báo thành công
          }
        }
        if (result?.code === "24") {
          const response = await axios.put(
            `${apiUrl}/delete-order/${orderDetails._id}`
          );
          if (response.status === 200) {
            queryClient.invalidateQueries(["ORDER_HISTORY", _id]);
            // Hiển thị thông báo thành công
            toast({
              title: "Thanh toán thất bại!",
              description: "Đơn hàng đã bị hủy.",
              variant: "default",
            });
          }
        }
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
      }
    };
    if ((result?.code === "00" || result?.code !== "00") && Gmail) {
      cancelOrder(); // Chỉ gọi hàm khi có giá trị `result` và `Gmail`.
    }
  }, [result, orderDetails, _id, apiUrl, Gmail, orderCart]); // Đảm bảo có các phụ thuộc đúng

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">
            Đang xử lý kết quả giao dịch, vui lòng chờ...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50">
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">Lỗi giao dịch</h1>
          <p className="text-gray-700 mt-4">{error}</p>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      {result?.code === "00" ? (
        <div className="space-y-8 2xl:w-[1408px] xl:w-[1200px] p-10 lg:w-[900px]  mx-auto flex justify-between items-center">
          <div className="bg-white p-6 shadow-[0_1px_2px_1px_rgba(0,0,0,0.1)] rounded-lg w-full text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-800">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600 mt-2">
              Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn
              đang được xử lý!
            </p>

            <div className="mt-6 space-x-4">
              <Button
                variant="default"
                onClick={() => navigate("/")}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Về trang chủ
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/users/order-history")}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Xem lịch sử đơn hàng
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 2xl:w-[1408px] xl:w-[1200px] p-10 lg:w-[900px]  mx-auto flex justify-between items-center">
          <div className="bg-white p-6 shadow-[0_1px_2px_1px_rgba(0,0,0,0.1)] rounded-lg w-full text-center">
            <CircleX className="text-red-500 w-16 h-16 mb-4 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-800">
              Giao dịch không thành công!
            </h1>
            <p className="text-gray-600 mt-2">
              Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ để được trợ giúp.
            </p>

            <div className="mt-6 space-x-4">
              <Button
                variant="default"
                onClick={() => navigate("/")}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Về trang chủ
              </Button>
              {/* <Button
                variant="default"
                onClick={() => navigate("/users/order-history")}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Xem lịch sử đơn hàng
              </Button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
