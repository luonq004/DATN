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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8080/api/users/create-user", data);
      toast({
        title: "Đăng ký thành công",
        description: "Tài khoản đã được tạo thành công!",
      });
      navigate("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        variant: "destructive",
        title: "Đăng ký thất bại",
        description: "Có lỗi xảy ra khi tạo tài khoản.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Đăng ký tài khoản</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Điền thông tin bên dưới để tạo tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            id="register-form"
          >
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("emailAddress", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
                placeholder="example@example.com"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.emailAddress?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {String(errors.emailAddress.message)}
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
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
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
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
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
                Role (Mặc định: User)
              </label>
              <select
                {...register("role")}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </form>
        </CardContent>
        <CardFooter >
          <Button className="px-[173px]" form="register-form" type="submit">
            Đăng ký
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;