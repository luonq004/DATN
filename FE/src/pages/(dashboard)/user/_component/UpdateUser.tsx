import { User } from "@/common/types/User";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditUserFormProps {
  onClose: () => void;
  onSuccess: (updatedUser: User) => void;
  userData: User; // Thông tin người dùng
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  onClose,
  onSuccess,
  userData,
}) => {
  // const { clerkId } = useParams<{ clerkId: string }>();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
  } = useForm<any>({
    defaultValues: userData, // Đặt giá trị mặc định là dữ liệu người dùng hiện tại
  });

  const { toast } = useToast();
  const watchPassword = watch("password");

  useEffect(() => {
    if (userData) {
      reset(userData); // Cập nhật form khi userData thay đổi
    }
  }, [userData, reset]); // Phụ thuộc vào userData

  const onSubmit = async (updatedUser: any) => {
    // console.log("Dữ liệu gửi đi:", data);

    // Kiểm tra xem có thay đổi mật khẩu không
    if (!watchPassword) {
      // Nếu không thay đổi mật khẩu, loại bỏ trường mật khẩu khỏi dữ liệu gửi lên server
      delete updatedUser.password;
    }
    try {
      // Gửi yêu cầu cập nhật thông tin người dùng
      const response = await axios.put(
        `http://localhost:8080/api/users/${updatedUser.clerkId}`,
        updatedUser
      );
      //   console.log(response.data);

      if (response.status === 200) {
        toast({
          title: "Cập nhật thành công",
          description: "Thông tin người dùng đã được cập nhật!",
        });

        reset(); // Reset form
        onClose(); // Đóng form
        onSuccess(response.data);
      } else {
        throw new Error("Cập nhật thất bại"); // Xử lý lỗi nếu status không phải 200
      }
    } catch (error: any) {
      // Kiểm tra lỗi từ backend
      if (error.response && error.response.data) {
        const backendMessage = error.response.data.message;
        const backendErrors = error.response.data.errors;

        // Xử lý lỗi từ backend
        if (backendErrors) {
          backendErrors.forEach((err: any) => {
            // Kiểm tra mã lỗi và thông báo lỗi cụ thể
            if (err.code === "form_identifier_exists") {
              setError("email", {
                type: "manual",
                message: "Email đã được sử dụng. Vui lòng thử email khác.",
              });
            }

            if (err.code === "form_password_pwned") {
              setError("password", {
                type: "manual",
                message: "Mật khẩu yếu. Vui lòng chọn mật khẩu mạnh hơn.",
              });
            }

            // Hiển thị lỗi trong toast
            toast({
              variant: "destructive",
              title: "Lỗi cập nhật",
              description: err.message || "Có lỗi xảy ra. Vui lòng thử lại.",
            });
          });
        } else {
          // Hiển thị lỗi tổng quát nếu không có chi tiết
          toast({
            variant: "destructive",
            title: "Cập nhật thất bại",
            description: backendMessage || "Có lỗi xảy ra. Vui lòng thử lại.",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center">
      <Card className="w-full max-w-md my-3">
        <CardHeader>
          <CardTitle className="text-center">Chỉnh sửa thông tin</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Cập nhật thông tin cá nhân của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            id="edit-user-form"
          >
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
                placeholder="example@example.com"
                className="w-full border rounded px-4 py-2 "
                autoFocus
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            {/* Họ */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Họ</label>
              <input
                type="text"
                {...register("firstName", { required: "Họ là bắt buộc" })}
                placeholder="Nguyễn"
                className="w-full border rounded px-4 py-2 "
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.firstName.message)}
                </p>
              )}
            </div>

            {/* Tên */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tên
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Tên là bắt buộc" })}
                placeholder="Văn A"
                className="w-full border rounded px-4 py-2 "
              />
              {errors.lastName?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                placeholder="Mật khẩu"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {/* Vai trò */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vai trò
              </label>
              <select
                {...register("role")}
                className="w-full border rounded px-4 py-2 "
              >
                <option value="Admin">Quản trị</option>
                <option value="User">Người dùng</option>
              </select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            type="button"
            className="bg-slate-100"
            onClick={onClose}
            variant="outline"
          >
            Hủy
          </Button>
          <Button form="edit-user-form" type="submit">
            Cập nhật
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditUserForm;
