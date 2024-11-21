import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUser from "./ImageUser";

const ProfilePageModern: React.FC = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [editField, setEditField] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const { register, setValue, getValues } = useForm();
  const imageUserRef = useRef<any>();
  const { toast } = useToast();

  const fetchUserData = async () => {
    if (user) {
      try {
        const clerkId = user.id;
        const response = await axios.get(
          `http://localhost:8080/api/users/${clerkId}`
        );
        const userData = response.data;

        const formatBirthdate = (dateString: string) => {
          const date = new Date(dateString);
          return !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
        };

        setPhone(userData.phone);
        setGender(userData.gender);
        setBirthdate(formatBirthdate(userData.birthdate));
      } catch (error) {
        console.error("Error fetching user data from backend:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
      fetchUserData();
    }
  }, [user]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      editField === "email" &&
      emailInputRef.current &&
      !emailInputRef.current.contains(event.target as Node)
    ) {
      setEditField(null);
    }
    if (
      editField === "phone" &&
      phoneInputRef.current &&
      !phoneInputRef.current.contains(event.target as Node)
    ) {
      setEditField(null);
    }
  };

  useEffect(() => {
    if (editField) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editField]);

  const handleSaveChanges = async () => {
    try {
      // Gọi hàm updateProfileImage từ ref trước khi lưu các thay đổi khác
      if (imageUserRef.current) {
        await imageUserRef.current.updateProfileImage();
      }

      const updateData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        gender: string;
        birthdate: string;
      } = {
        firstName,
        lastName,
        email,
        phone,
        gender,
        birthdate,
      };

      const formData = new FormData();
      (Object.keys(updateData) as Array<keyof typeof updateData>).forEach(
        (key) => {
          formData.append(key, updateData[key]);
        }
      );
      const clerkId = user?.id;
      const response = await axios.put(
        `http://localhost:8080/api/users/${clerkId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Thành công",
          description: "Thông tin người dùng đã được cập nhật thành công!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: "Có lỗi sảy ra khi cập nhật thông tin người dùng!",
        });
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="p-5 lg:px-16 rounded-xl mx-auto mb-32">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3 border-zinc-400 mt-5">
        Hồ sơ của tôi
      </h1>
      <p className="text-green-500 mb-10">
        Cập nhật thông tin hồ sơ để bảo mật tài khoản!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          {/* First Name and Last Name Fields */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:space-x-4 ">
              <div className="mb-3">
                <label className="block font-semibold text-gray-700 mb-2">
                  Họ
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Họ"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tên"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center">
              <input
                ref={emailInputRef}
                type="text"
                value={email}
                readOnly={editField !== "email"}
                onChange={(e) => setEmail(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 w-full ${
                  editField === "email" ? "bg-white" : "bg-gray-100"
                }`}
              />
              {editField !== "email" && (
                <button
                  onClick={() => setEditField("email")}
                  className="ml-2 w-48 text-center text-blue-500 hover:text-blue-700 transition duration-150"
                >
                  Thay đổi
                </button>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center">
              <input
                ref={phoneInputRef}
                type="text"
                value={phone}
                readOnly={editField !== "phone"}
                onChange={(e) => setPhone(e.target.value)}
                className={`border border-gray-300 rounded-lg px-3 py-2 w-full ${
                  editField === "phone" ? "bg-white" : "bg-gray-100"
                }`}
              />
              {editField !== "phone" && (
                <button
                  onClick={() => setEditField("phone")}
                  className="ml-2 w-48 text-center text-blue-500 hover:text-blue-700 transition duration-150"
                >
                  Thay đổi
                </button>
              )}
            </div>
          </div>

          {/* Gender Selection */}
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Giới tính
            </label>
            <div className="flex items-center space-x-4">
              {["Nam", "Nữ", "Khác"].map((genderOption) => (
                <label className="cursor-pointer" key={genderOption}>
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={gender === genderOption}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  {genderOption}
                </label>
              ))}
            </div>
          </div>

          {/* Birthdate Field */}
          <div className="mb-5">
            <label className="block font-semibold text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Profile Image Section */}

        <div className="md:px-10 mt-6 ">
          <ImageUser
            ref={imageUserRef}
            form={{ register, setValue, getValues }}
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default ProfilePageModern;
