import { useEffect, useState } from "react";
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
import sendOrderHuyConfirmationEmail from "@/pages/(website)/cart/_components/sendHuyenail";
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const Gmail = user?.primaryEmailAddress?.emailAddress;
  const { _id } = useUserContext() ?? {}; // Lấy _id từ UserContext
 // Lấy mã đơn hàng từ URL

 const orderId = searchParams.get("vnp_TxnRef");

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
          const orderResponse = await axios.get(`${apiUrl}/get-ordersCode/${orderId}`);
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
    const cancelOrder = async () => {
      try {
        if (result?.code === "00") {
          const newStatus = "chờ lấy hàng"; // Trạng thái mới của đơn hàng khi giao dịch thành công
          const response = await axios.put(`${apiUrl}/update-order/${orderDetails._id}`, {
            newStatus,
          });
          if(Gmail){
            await sendOrderConfirmationEmail(Gmail, orderId);
          }
          if (response.status === 200) {
            queryClient.invalidateQueries(["ORDER_HISTORY", _id]);
  
            // Hiển thị thông báo thành công
          } 
        } 
      else {
          const newStatus = "đã hủy"; // Trạng thái mới của đơn hàng khi giao dịch thất bại
          const response = await axios.put(`${apiUrl}/update-order/${orderDetails._id}`, {
            newStatus,
          });
          if(Gmail){
            await sendOrderHuyConfirmationEmail(Gmail, orderId);
          }
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
  }, [result, orderDetails, _id, apiUrl, Gmail]); // Đảm bảo có các phụ thuộc đúng
  
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
