import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/common/types/User";

const UserDetailPage = () => {
  const { clerkId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (clerkId) {
      fetchUserDetail();
    }
  }, [clerkId]);

  const fetchUserDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${clerkId}`);
      setUser(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      setError("Không thể lấy thông tin người dùng.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center text-gray-600">Đang tải...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!user)
    return (
      <div className="text-center text-gray-600">
        Không tìm thấy người dùng.
      </div>
    );

  return (
    <div className=" mx-auto p-8 min-h-screen">
      {/* Phần thông tin người dùng */}
      <div className=" shadow rounded-xl p-8 flex flex-col items-center">
        <h1 className="sm:text-4xl text-xl mb-20 font-semibold">Hồ Sơ Người Dùng</h1>
        {/* Ảnh người dùng */}
        <div className="w-32 h-32 mb-6">
          <img
            src={user.imageUrl || "https://via.placeholder.com/150"}
            alt="Ảnh người dùng"
            className="rounded-full shadow-lg border-4 border-teal-500"
          />
        </div>

        {/* Thông tin cơ bản */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <p className="text-gray-600 font-medium mb-8">Vai trò: {user.role}</p>

        {/* Chi tiết người dùng */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Địa chỉ giao hàng */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-teal-600 mb-3">
              Địa chỉ giao hàng
            </h3>
            <p className="text-gray-700">
              {user.Address || "Chưa cung cấp địa chỉ"}
            </p>
          </div>

          {/* Trạng thái tài khoản */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-teal-600 mb-3">
              Trạng thái tài khoản
            </h3>
            <p className="text-gray-700">
              <span className={`text-${user.isBanned ? "red" : "green"}-600`}>
                {user.isBanned ? "Đã bị khóa" : "Đang hoạt động"}
              </span>
            </p>
          </div>
        </div>

        {/* Lịch sử đơn hàng */}
        <div className="w-full mt-10 bg-white rounded-lg  p-8 border border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Lịch sử đơn hàng
          </h3>
          <div className=" overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 text-nowrap border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-5 py-3 text-nowrap border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày đặt hàng
                  </th>
                  <th className="px-5 py-3 text-nowrap border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-5 py-3 text-nowrap border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    #123
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    9 Tháng 9, 2023
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    250.000 VNĐ
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-600 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
                      ></span>
                      <span className="relative text-nowrap">Hoàn thành</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
