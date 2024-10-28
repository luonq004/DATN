import Confirm from "@/components/Confirm/Confirm";
import { User } from "@/types/User";
import {
  SignedIn,
  SignedOut,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ListUser() {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmBanOpen, setConfirmBanOpen] = useState(false);
  const [userToBan, setUserToBan] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    setIsLoading(true); 
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const result = parts.pop();
      return result ? result.split(";").shift() : null;
    }

    return null;
  };

  const deleteUser = async (clerkId: string) => {
    const token = getCookie("__session") || localStorage.getItem("token");

    if (!token) {
      console.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
      alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/users/${clerkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      alert("Đã xảy ra lỗi khi xóa người dùng. Vui lòng thử lại.");
    }
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.clerkId);
      setModalOpen(false);
    }
  };

  const toggleActivation = async (clerkId: string, isBanned: boolean) => {
    try {
      if (isBanned) {
        await axios.post(`http://localhost:8080/api/users/unban/${clerkId}`);
        toast.success("Mở khóa tài khoản thành công!");
      } else {
        await axios.post(`http://localhost:8080/api/users/ban/${clerkId}`);
        toast.success("Khóa tài khoản thành công!");
      }
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleBanClick = (user: User) => {
    setUserToBan(user);
    setConfirmBanOpen(true);
  };

  const handleConfirmBan = async () => {
    if (userToBan) {
      await toggleActivation(userToBan.clerkId, userToBan.isBanned);
      setConfirmBanOpen(false);
    }
  };

  return (
    <div className="mx-auto p-8">
      <SignedIn>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900">
            Danh Sách Người Dùng
          </h1>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table
            className={`min-w-full leading-normal ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tên đầy đủ
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.clerkId}>
                  <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                    <img
                      src={user.imageUrl}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/users/detail/${user.clerkId}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {user.firstName} {user.lastName}
                    </button>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm  max-w-xs break-words">
                    {user.email}
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm  max-w-xs break-words">
                    {user.role}
                  </td>
                  <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.isBanned ? (
                      <span className="text-red-600 font-semibold">
                        Đã khóa
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Hoạt động
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm items-center flex mt-3">
                    <button
                      onClick={() => handleBanClick(user)}
                      className={`mr-4 ${
                        user.isBanned ? "bg-green-500" : "bg-amber-500"
                      } hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}
                    >
                      {user.isBanned ? "Mở khóa" : "Khóa"}
                    </button>

                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex justify-center items-center h-full">
          <SignIn />
        </div>
      </SignedOut>

      <Confirm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa người dùng"
        message={`Bạn có chắc chắn muốn xóa user "<strong>${selectedUser?.firstName} ${selectedUser?.lastName}</strong>" ? Hành động này không thể hoàn tác.`}
      />

      {isConfirmBanOpen && (
        <Confirm
          isOpen={isConfirmBanOpen}
          title={`Xác nhận ${
            userToBan?.isBanned ? "mở khóa" : "khóa"
          } tài khoản`}
          message={`Bạn có chắc chắn muốn ${
            userToBan?.isBanned ? "mở khóa" : "khóa"
          } tài khoản của "<strong>${userToBan?.firstName} ${
            userToBan?.lastName
          }</strong>" ?`}
          onClose={() => setConfirmBanOpen(false)}
          onConfirm={handleConfirmBan}
        />
      )}

    </div>
  );
}

export default ListUser;
